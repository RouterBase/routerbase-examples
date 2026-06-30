# NuGet Package

The .NET package is maintained as a standalone repository:

```text
https://github.com/RouterBase/routerbase-dotnet
```

NuGet package ID:

```text
RouterBase.Client
```

The repository README starts with [RouterBase](https://routerbase.com), and NuGet metadata uses `https://routerbase.com` as the package project URL.

## Current Status

- GitHub repository: created.
- CI: passing for restore, build, tests, and pack.
- Release: `v0.1.0`.
- NuGet lookup before publishing: 404 for `RouterBase.Client`.

## Publish

Add a NuGet API key to GitHub repository secrets as:

```text
NUGET_API_KEY
```

Then run the manual workflow:

```text
Publish NuGet
```

from GitHub Actions.
