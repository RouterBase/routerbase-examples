# RouterBase Python Client

[RouterBase](https://routerbase.com) provides an OpenAI-compatible API for calling many AI models through `https://routerbase.com/v1`.

This package is a small Python SDK starter that can be published to PyPI after the package name and account are confirmed.

## Install From Source

```bash
python3 -m pip install -e .
```

## Usage

```python
from routerbase import RouterBase

client = RouterBase()
response = client.chat_completion(
    messages=[{"role": "user", "content": "Write a short RouterBase tagline."}]
)
print(response["choices"][0]["message"]["content"])
```

## CLI

```bash
export ROUTERBASE_API_KEY="sk-rb-..."
routerbase-chat "Write a five-word launch tagline"
```

## Links

- [RouterBase](https://routerbase.com)
- [RouterBase docs](https://docs.routerbase.com/)
