require "json"
require "minitest/autorun"
require "routerbase"

class FakeTransport
  Response = Struct.new(:code, :body, keyword_init: true)

  attr_reader :requests

  def initialize(response)
    @response = response
    @requests = []
  end

  def request(method:, uri:, headers:, body: nil)
    requests << {
      method: method,
      uri: uri,
      headers: headers,
      body: body
    }
    @response
  end
end

class RouterBaseClientTest < Minitest::Test
  def test_chat_completion
    transport = FakeTransport.new(
      FakeTransport::Response.new(
        code: "200",
        body: JSON.generate(
          "choices" => [
            {
              "message" => {
                "role" => "assistant",
                "content" => "Hello"
              }
            }
          ]
        )
      )
    )
    client = RouterBase::Client.new(api_key: "sk-rb-test", transport: transport)
    response = client.chat_completion(messages: [{ role: "user", content: "Hi" }])
    request = transport.requests.first

    assert_equal "Hello", response.fetch("choices").first.fetch("message").fetch("content")
    assert_equal :post, request.fetch(:method)
    assert_equal "https://routerbase.com/v1/chat/completions", request.fetch(:uri).to_s
    assert_equal "Bearer sk-rb-test", request.fetch(:headers).fetch("Authorization")
    assert_equal RouterBase::DEFAULT_MODEL, JSON.parse(request.fetch(:body)).fetch("model")
  end

  def test_list_models
    transport = FakeTransport.new(
      FakeTransport::Response.new(
        code: "200",
        body: JSON.generate("data" => [{ "id" => "google/gemini-2.5-flash" }])
      )
    )
    client = RouterBase::Client.new(api_key: "sk-rb-test", transport: transport)
    response = client.list_models

    assert_equal "google/gemini-2.5-flash", response.fetch("data").first.fetch("id")
    assert_equal :get, transport.requests.first.fetch(:method)
    assert_equal "https://routerbase.com/v1/models", transport.requests.first.fetch(:uri).to_s
  end

  def test_requires_api_key
    assert_raises(ArgumentError) do
      RouterBase::Client.new(api_key: "")
    end
  end

  def test_api_error
    transport = FakeTransport.new(
      FakeTransport::Response.new(
        code: "400",
        body: JSON.generate("error" => { "message" => "bad request" })
      )
    )
    client = RouterBase::Client.new(api_key: "sk-rb-test", transport: transport)

    error = assert_raises(RouterBase::Error) do
      client.list_models
    end
    assert_match(/bad request/, error.message)
  end
end
