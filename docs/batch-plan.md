# RouterBase Publishing Plan

This plan keeps each public asset useful on its own. The goal is to build a small, believable ecosystem around real examples and SDK entry points.

## Batch 1 - GitHub Center

Create a central examples repository with:

- Working Node.js examples.
- Python SDK starter and tests.
- JSR-ready TypeScript package draft.
- Docker example.
- CI and maintenance docs.

Primary link target: [RouterBase](https://routerbase.com).

## Batch 2 - JSR

Publish the TypeScript package from `packages/jsr-routerbase` after the `@routerbase` JSR scope is available.

Target package:

- `@routerbase/client`

Content goals:

- Typed chat completion client.
- Model listing helper.
- Deno and modern TypeScript usage examples.

Status:

- Local dry run passes.
- Manual GitHub Actions workflow added: `.github/workflows/publish-jsr.yml`.

## Batch 3 - PyPI

Publish the Python package from `packages/python-routerbase`.

Candidate name:

- `routerbase-client`

Content goals:

- Minimal `RouterBase` client.
- CLI entry point.
- Project URLs that point to RouterBase docs and GitHub.

Status:

- Wheel and sdist build locally.
- `twine check` passes.
- Manual GitHub Actions workflow added: `.github/workflows/publish-pypi.yml`.

## Batch 4 - Docker

Publish a small prompt runner image to Docker Hub or GitHub Container Registry.

Candidate image names:

- `routerbase/prompt-runner`
- `ghcr.io/routerbase/prompt-runner`

Content goals:

- Environment-variable based configuration.
- One command prompt execution.
- Link back to RouterBase docs.

Status:

- Dockerfile added.
- Manual GitHub Actions workflow added: `.github/workflows/publish-ghcr.yml`.
- GHCR publish workflow completed successfully on 2026-06-30.

## Batch 5 - Language SDKs

Add one SDK at a time only when it has real tests and examples:

- Go module.
- PHP package for Packagist.
- Ruby gem.
- .NET package for NuGet.
- Java package for Maven Central.

Status:

- Go module added at `packages/go-routerbase`.
- Go tests added and wired into CI.
- Module path prepared for pkg.go.dev discovery:
  `github.com/RouterBase/routerbase-examples/packages/go-routerbase`.
- Ruby gem starter added at `packages/ruby-routerbase`.
- Ruby tests and gem build added to CI.
- Manual RubyGems publish workflow added: `.github/workflows/publish-rubygems.yml`.

## Batch 6 - PHP / Packagist

Create a standalone Composer package repository instead of burying PHP under the examples monorepo.

Repository:

- `https://github.com/RouterBase/routerbase-php`

Package:

- `routerbase/client`

Status:

- GitHub repository created.
- Composer metadata added at repository root.
- PHP client, CLI, tests, and CI added.
- GitHub release `v0.1.0` created.
- Packagist package name check returned 404 before publishing.

## Batch 7 - .NET / NuGet

Create a standalone NuGet package repository with a real .NET client and no external runtime dependencies.

Repository:

- `https://github.com/RouterBase/routerbase-dotnet`

Package:

- `RouterBase.Client`

Status:

- GitHub repository created.
- NuGet metadata added in `src/RouterBase.Client/RouterBase.Client.csproj`.
- .NET client, console test project, CI, topics, and publish workflow added.
- GitHub release `v0.1.0` created.
- NuGet flat container package name check returned 404 before publishing.

## Batch 8 - Java / Maven Central

Create a standalone Maven package repository with a typed Java client and standard Maven metadata.

Repository:

- `https://github.com/RouterBase/routerbase-java`

Package:

- `com.routerbase:routerbase-client`

Status:

- GitHub repository created.
- Maven metadata added in `pom.xml`.
- Java client, Jackson mapping, JUnit tests, CI, topics, and release added.
- GitHub release `v0.1.0` created.
- Maven Central search returned 0 results before publishing.
