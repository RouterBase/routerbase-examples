require "json"
require "net/http"
require "uri"

module RouterBase
  class Error < StandardError; end

  class Client
    attr_reader :api_key, :base_url, :transport

    def initialize(api_key: ENV["ROUTERBASE_API_KEY"], base_url: BASE_URL, transport: nil)
      raise ArgumentError, "RouterBase API key is required" if api_key.nil? || api_key.empty?

      @api_key = api_key
      @base_url = base_url.sub(%r{/+\z}, "")
      @transport = transport || NetHTTPTransport.new
    end

    def chat_completion(messages:, model: DEFAULT_MODEL, **options)
      raise ArgumentError, "messages must be a non-empty array" if messages.nil? || messages.empty?

      post_json(
        "/chat/completions",
        {
          model: model,
          messages: messages
        }.merge(options)
      )
    end

    def list_models
      request_json(:get, "/models")
    end

    private

    def post_json(path, payload)
      request_json(:post, path, payload)
    end

    def request_json(method, path, payload = nil)
      uri = URI("#{base_url}#{path}")
      response = transport.request(
        method: method,
        uri: uri,
        headers: headers(payload),
        body: payload.nil? ? nil : JSON.generate(payload)
      )

      parsed = response.body.nil? || response.body.empty? ? {} : JSON.parse(response.body)
      return parsed if response.code.to_i.between?(200, 299)

      message = parsed.dig("error", "message") || parsed["msg"] || response.body
      raise Error, "RouterBase request failed (#{response.code}): #{message}"
    end

    def headers(payload)
      values = {
        "Authorization" => "Bearer #{api_key}"
      }
      values["Content-Type"] = "application/json" unless payload.nil?
      values
    end
  end

  class NetHTTPTransport
    Response = Struct.new(:code, :body, keyword_init: true)

    def request(method:, uri:, headers:, body: nil)
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = uri.scheme == "https"

      request = method == :get ? Net::HTTP::Get.new(uri) : Net::HTTP::Post.new(uri)
      headers.each { |key, value| request[key] = value }
      request.body = body unless body.nil?

      response = http.request(request)
      Response.new(code: response.code, body: response.body)
    end
  end
end
