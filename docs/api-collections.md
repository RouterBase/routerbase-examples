# RouterBase API Collections

The API collections repository provides importable request examples for developers who want to try [RouterBase](https://routerbase.com) before installing a language SDK.

Repository:

- `https://github.com/RouterBase/routerbase-api-collections`

Included formats:

- OpenAPI 3.1: `openapi/routerbase.openapi.json`
- Postman: `postman/routerbase.postman_collection.json`
- Bruno: `bruno/RouterBase`
- Insomnia: `insomnia/routerbase.insomnia.json`

Covered requests:

- `GET https://routerbase.com/v1/models`
- `POST https://routerbase.com/v1/chat/completions`

Validation:

- The repository has `npm run verify`.
- GitHub Actions runs validation on every push and pull request.
- The first release is `v0.1.0`.

Publishing follow-up:

- Import the Postman collection into a RouterBase workspace and submit it to the Postman Public API Network when the account is ready.
- Share the Bruno collection through the repository and any Bruno community listing that accepts public collections.
- Import the Insomnia export into an Insomnia workspace and publish through the account-level sharing flow if desired.
- Keep the OpenAPI file aligned with the public API docs at `https://docs.routerbase.com/`.
