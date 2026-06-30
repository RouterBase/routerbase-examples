# RouterBase Examples

[RouterBase](https://routerbase.com) is an OpenAI-compatible API gateway for calling many AI models from one base URL: `https://routerbase.com/v1`.

This repository is a practical starter kit for developers who want to test RouterBase in Node.js, Python, Docker, and modern TypeScript runtimes.

## What Is Inside

- `examples/node`: dependency-free Node.js examples using `fetch`.
- `packages/python-routerbase`: a small Python SDK starter with tests and a CLI.
- `packages/jsr-routerbase`: a JSR-ready TypeScript package draft.
- `packages/go-routerbase`: a Go SDK starter with tests and a runnable example.
- `packages/ruby-routerbase`: a RubyGems-ready client gem starter with tests and a CLI.
- `examples/docker`: a tiny containerized prompt runner example.
- API collections repository: [RouterBase/routerbase-api-collections](https://github.com/RouterBase/routerbase-api-collections).
- Cookbook repository: [RouterBase/routerbase-cookbook](https://github.com/RouterBase/routerbase-cookbook).
- `.github/workflows/ci.yml`: CI for Node and Python tests.
- `docs`: rollout plan, publishing checklist, and maintenance notes.

## Container Image

The Docker prompt runner is published through GitHub Container Registry:

```bash
docker run --rm \
  -e ROUTERBASE_API_KEY="sk-rb-..." \
  -e ROUTERBASE_PROMPT="Explain RouterBase in one concise sentence." \
  ghcr.io/routerbase/routerbase-prompt-runner:latest
```

## Quick Start

```bash
export ROUTERBASE_API_KEY="sk-rb-..."
npm run demo:node
```

Run local checks:

```bash
npm run verify
```

## Node.js Fetch Example

```js
import { chatCompletion } from "./examples/node/src/routerbase-client.js";

const response = await chatCompletion({
  apiKey: process.env.ROUTERBASE_API_KEY,
  messages: [{ role: "user", content: "Explain RouterBase in one sentence." }]
});

console.log(response.choices[0].message.content);
```

## Python Example

```python
from routerbase import RouterBase

client = RouterBase()
response = client.chat_completion(
    messages=[{"role": "user", "content": "Explain RouterBase in one sentence."}]
)
print(response["choices"][0]["message"]["content"])
```

## Go Example

```go
client := routerbase.NewClient(os.Getenv("ROUTERBASE_API_KEY"))
response, err := client.ChatCompletion(context.Background(), routerbase.ChatCompletionRequest{
    Messages: []routerbase.Message{
        {Role: "user", Content: "Explain RouterBase in one sentence."},
    },
})
```

## Ruby Example

```ruby
require "routerbase"

client = RouterBase::Client.new(api_key: ENV.fetch("ROUTERBASE_API_KEY"))
response = client.chat_completion(
  messages: [
    { role: "user", content: "Explain RouterBase in one sentence." }
  ]
)
```

## Published npm Packages

These companion packages are already published:

- [routerbase-quickstart](https://www.npmjs.com/package/routerbase-quickstart)
- [create-routerbase-app](https://www.npmjs.com/package/create-routerbase-app)
- [routerbase-openai-config](https://www.npmjs.com/package/routerbase-openai-config)
- [routerbase-models-cli](https://www.npmjs.com/package/routerbase-models-cli)
- [routerbase-prompt-runner](https://www.npmjs.com/package/routerbase-prompt-runner)

## SDK Starters

- Go module: `github.com/RouterBase/routerbase-examples/packages/go-routerbase`
- PyPI package draft: `routerbase-client`
- JSR package draft: `@routerbase/client`
- RubyGems package draft: `routerbase-client`
- Composer package repository: [RouterBase/routerbase-php](https://github.com/RouterBase/routerbase-php)
- NuGet package repository: [RouterBase/routerbase-dotnet](https://github.com/RouterBase/routerbase-dotnet)
- Maven package repository: [RouterBase/routerbase-java](https://github.com/RouterBase/routerbase-java)
- CLI repository: [RouterBase/routerbase-cli](https://github.com/RouterBase/routerbase-cli)
- Homebrew tap: [RouterBase/homebrew-tap](https://github.com/RouterBase/homebrew-tap)
- API collections: [RouterBase/routerbase-api-collections](https://github.com/RouterBase/routerbase-api-collections)
- Cookbook and article drafts: [RouterBase/routerbase-cookbook](https://github.com/RouterBase/routerbase-cookbook)

## Homebrew

```bash
brew tap RouterBase/tap
brew install routerbase
```

## Links

- [RouterBase](https://routerbase.com)
- [RouterBase docs](https://docs.routerbase.com/)
- [Chat completions docs](https://docs.routerbase.com/api-reference/chat-completions)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for local checks and example guidelines.

## License

MIT
