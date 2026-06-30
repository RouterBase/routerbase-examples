# Homebrew Tap

The Homebrew tap is maintained as a standalone repository:

```text
https://github.com/RouterBase/homebrew-tap
```

The CLI source repository is:

```text
https://github.com/RouterBase/routerbase-cli
```

The tap README starts with [RouterBase](https://routerbase.com), and the formula uses `https://routerbase.com` as the homepage.

## Install

```bash
brew tap RouterBase/tap
brew install routerbase
```

## Current Status

- CLI repository: created.
- CLI release: `v0.1.0`.
- Homebrew tap repository: created.
- Formula: `Formula/routerbase.rb`.
- Tap CI: passing with `brew audit`, `brew install`, and `brew test`.
- Tap release: `v0.1.0`.

## Formula Source

The formula is pinned to:

```text
https://github.com/RouterBase/routerbase-cli/archive/refs/tags/v0.1.0.tar.gz
```

with a fixed sha256.
