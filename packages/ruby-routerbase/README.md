# RouterBase Ruby Client

[RouterBase](https://routerbase.com) provides an OpenAI-compatible API at `https://routerbase.com/v1`. This gem starter adds a small dependency-free Ruby client for chat completions and model listing.

## Install From Source

```bash
gem build routerbase-client.gemspec
gem install routerbase-client-0.1.0.gem
```

## Usage

```ruby
require "routerbase"

client = RouterBase::Client.new(api_key: ENV.fetch("ROUTERBASE_API_KEY"))
response = client.chat_completion(
  messages: [
    { role: "user", content: "Explain RouterBase in one sentence." }
  ]
)

puts response.fetch("choices").first.fetch("message").fetch("content")
```

## CLI

```bash
export ROUTERBASE_API_KEY="sk-rb-..."
routerbase-chat "Write a short RouterBase tagline"
```

## Links

- [RouterBase](https://routerbase.com)
- [RouterBase docs](https://docs.routerbase.com/)
- [Chat completions docs](https://docs.routerbase.com/api-reference/chat-completions)
