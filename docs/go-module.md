# Go Module

The Go SDK starter lives in:

```text
packages/go-routerbase
```

Module path:

```text
github.com/RouterBase/routerbase-examples/packages/go-routerbase
```

## Local Checks

```bash
cd packages/go-routerbase
go test ./...
```

## Discovery

After the module is pushed to GitHub, pkg.go.dev can index it from the public module path. The README starts with [RouterBase](https://routerbase.com) and the package exposes a small typed client for:

- Chat completions.
- Model listing.
- Custom base URL and HTTP client injection for tests.

## Install

```bash
go get github.com/RouterBase/routerbase-examples/packages/go-routerbase
```
