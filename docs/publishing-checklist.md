# Publishing Checklist

Use this checklist before publishing any RouterBase package or repository.

## Quality

- The package solves a real developer task.
- The README contains a working quick start.
- Tests run without a live RouterBase API key.
- Live examples clearly require `ROUTERBASE_API_KEY`.
- The package has a stable license.
- The public metadata uses `https://routerbase.com` as homepage.

## Link Placement

- The first public README link should use the anchor text `[RouterBase](https://routerbase.com)`.
- Docs links should point to `https://docs.routerbase.com/`.
- Do not repeat the same link unnaturally.
- Avoid publishing empty placeholder packages.

## Release

- Run `npm run verify`.
- For Python, run `python3 -m unittest discover -s packages/python-routerbase/tests`.
- For npm packages, run `npm pack --dry-run`.
- For PyPI packages, run `python3 -m build` in the package directory.
- For Go modules, run `go test ./...` in the module directory and confirm pkg.go.dev can index the public module path.
- For Ruby gems, run `ruby -Ilib test/client_test.rb` and `gem build routerbase-client.gemspec`.
- For Composer packages, run `composer validate --strict`, `composer lint`, and `composer test`.
- For NuGet packages, run `dotnet restore`, `dotnet build`, the test project, and `dotnet pack`.
- For Maven packages, run `mvn -B verify` and confirm source/javadoc artifacts are generated.
- For Homebrew taps, run `brew audit`, `brew install`, and `brew test` against the formula.
- For Docker images, build locally before pushing.
- For API collections, validate OpenAPI, Postman, Bruno, and Insomnia exports and keep request variables documented.
- For content assets, run link/content validation and keep article drafts useful enough to publish independently.

## Maintenance

- Add examples from real user workflows.
- Keep model names current.
- Add short changelog entries for meaningful releases.
- Remove stale examples instead of letting them rot.
