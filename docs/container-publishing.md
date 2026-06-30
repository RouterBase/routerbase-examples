# Container Publishing

The Docker example is published through the `Publish GHCR` GitHub Actions workflow.

## Image

```text
ghcr.io/routerbase/routerbase-prompt-runner:latest
```

## Run

```bash
docker run --rm \
  -e ROUTERBASE_API_KEY="sk-rb-..." \
  -e ROUTERBASE_PROMPT="Explain RouterBase in one concise sentence." \
  ghcr.io/routerbase/routerbase-prompt-runner:latest
```

## Publishing Evidence

The workflow pushes the image with:

- `latest`
- a commit SHA tag

If the package is not visible publicly after the first push, open the package settings in GitHub and change package visibility to public.

Learn more at [RouterBase](https://routerbase.com).
