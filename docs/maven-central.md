# Maven Central Package

The Java package is maintained as a standalone repository:

```text
https://github.com/RouterBase/routerbase-java
```

Maven coordinates:

```text
com.routerbase:routerbase-client
```

The repository README starts with [RouterBase](https://routerbase.com), and Maven metadata uses `https://routerbase.com` as the project URL.

## Current Status

- GitHub repository: created.
- CI: passing with `mvn -B verify`.
- Release: `v0.1.0`.
- Maven Central search before publishing: 0 results for `com.routerbase:routerbase-client`.

## Publish

Maven Central publishing requires namespace ownership for `com.routerbase`, signing credentials, and a Central Portal token.

Recommended next setup:

- Verify the `com.routerbase` namespace in Central Portal.
- Add GPG signing configuration.
- Add a release profile for Central Portal publishing.
- Add GitHub secrets for the Central token and signing key.

Keep the package unpublished until those credentials are configured; the current repository is ready for source, tests, and release review.
