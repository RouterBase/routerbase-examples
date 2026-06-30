# Contributing

Thanks for improving the RouterBase examples.

## Local Checks

Run the full verification suite:

```bash
npm run verify
```

This covers:

- Node.js tests.
- Python tests.
- README link checks.

## Example Guidelines

- Keep examples small and runnable.
- Avoid live API calls in tests.
- Use `ROUTERBASE_API_KEY` for examples that call RouterBase.
- Put the first product link in public READMEs as `[RouterBase](https://routerbase.com)`.
- Prefer one clear workflow per example over broad demo apps.

## Adding Packages

Before adding another package, make sure it has:

- A real use case.
- A README with a working quick start.
- Tests that run without a live API key.
- Public metadata pointing to `https://routerbase.com`.
