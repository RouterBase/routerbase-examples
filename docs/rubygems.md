# RubyGems Package

The Ruby client starter lives in:

```text
packages/ruby-routerbase
```

Gem name:

```text
routerbase-client
```

The gem metadata points to [RouterBase](https://routerbase.com), the RouterBase docs, and the GitHub source directory.

## Local Checks

```bash
cd packages/ruby-routerbase
ruby -Ilib test/client_test.rb
gem build routerbase-client.gemspec
```

## Publish

Add `RUBYGEMS_API_KEY` to GitHub repository secrets, then run:

```text
Publish RubyGems
```

from GitHub Actions.
