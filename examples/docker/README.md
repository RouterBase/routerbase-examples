# RouterBase Docker Example

This example shows how to run a minimal RouterBase prompt runner in a container.

## Build

```bash
docker build -t routerbase-prompt-runner -f examples/docker/Dockerfile .
```

## Run

```bash
docker run --rm \
  -e ROUTERBASE_API_KEY="sk-rb-..." \
  -e ROUTERBASE_PROMPT="Write a six-word RouterBase tagline." \
  routerbase-prompt-runner
```

Learn more at [RouterBase](https://routerbase.com).
