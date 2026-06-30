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

## Batch 9 - CLI / Homebrew

Create a real command-line install path through Homebrew.

Repositories:

- `https://github.com/RouterBase/routerbase-cli`
- `https://github.com/RouterBase/homebrew-tap`

Packages:

- CLI command: `routerbase`
- Homebrew formula: `routerbase`

Status:

- CLI repository created with Ruby standard-library implementation.
- CLI tests and release `v0.1.0` created.
- Homebrew tap repository created.
- Formula pins the CLI `v0.1.0` source tarball and sha256.
- Tap CI passes `brew audit`, `brew install`, and `brew test`.
- Homebrew tap release `v0.1.0` created.

## Batch 10 - API Collections

Create importable request collections for developers who want to test RouterBase without writing code first.

Repository:

- `https://github.com/RouterBase/routerbase-api-collections`

Formats:

- OpenAPI 3.1
- Postman
- Bruno
- Insomnia

Status:

- GitHub repository created.
- Collection files added for `GET /models` and `POST /chat/completions`.
- Validation script added with CI.
- GitHub release `v0.1.0` created.
- Manual submission to Postman Public API Network, Bruno sharing channels, and Insomnia community listings can follow after account setup.

## Batch 11 - Cookbook / Content Assets

Create a standalone tutorial repository that can support natural content-platform links without relying on thin package pages.

Repository:

- `https://github.com/RouterBase/routerbase-cookbook`

Content:

- Practical tutorials for OpenAI-compatible RouterBase usage.
- Node.js and Python examples with local tests.
- Dev.to and Hashnode article drafts.
- Content calendar and review checklist.

Status:

- GitHub repository created.
- Content validation script and CI added.
- Topics added for cookbook, tutorials, API, and OpenAI-compatible discovery.
- GitHub release `v0.1.0` created.
- Manual article publication to Dev.to and Hashnode can follow after account login.
