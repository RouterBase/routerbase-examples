# Trusted Publishing Setup

The repository includes manual workflows for JSR, PyPI, and GitHub Container Registry. They are designed to publish real packages without storing long-lived platform tokens in GitHub secrets.

## JSR

Workflow:

```text
.github/workflows/publish-jsr.yml
```

Package:

```text
packages/jsr-routerbase
```

Before running:

- Create or claim the `@routerbase` scope on JSR.
- Configure trusted publishing for `RouterBase/routerbase-examples`.
- Set the package path to `packages/jsr-routerbase`.
- Run the workflow manually from GitHub Actions.

Local verification:

```bash
cd packages/jsr-routerbase
npx jsr publish --dry-run
```

## PyPI

Workflow:

```text
.github/workflows/publish-pypi.yml
```

Package:

```text
packages/python-routerbase
```

Before running:

- Create the `routerbase-client` project on PyPI through the first trusted publish.
- Configure PyPI trusted publishing for `RouterBase/routerbase-examples`.
- Use workflow name `Publish PyPI`.
- Use package directory `packages/python-routerbase`.

Local verification:

```bash
cd packages/python-routerbase
python -m build
python -m twine check dist/*
```

## GitHub Container Registry

Workflow:

```text
.github/workflows/publish-ghcr.yml
```

Image:

```text
ghcr.io/routerbase/routerbase-prompt-runner
```

Before running:

- Confirm the repository has package write permission.
- Run the workflow manually from GitHub Actions.
- After the first push, make the package public in GitHub Packages if needed.

## Link Policy

Keep links natural and developer-focused. The first README link uses `[RouterBase](https://routerbase.com)`, and package metadata points to the RouterBase homepage.
