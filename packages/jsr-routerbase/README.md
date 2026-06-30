# @routerbase/client

[RouterBase](https://routerbase.com) client helpers for JSR and modern TypeScript runtimes.

This package draft is prepared for JSR publishing after the `@routerbase` scope is available.

## Usage

```ts
import { RouterBase } from "@routerbase/client";

const client = new RouterBase({
  apiKey: Deno.env.get("ROUTERBASE_API_KEY")!,
});

const response = await client.chatCompletion({
  messages: [{ role: "user", content: "Explain RouterBase in one sentence." }],
});

console.log(response.choices[0].message.content);
```

## Links

- [RouterBase](https://routerbase.com)
- [RouterBase docs](https://docs.routerbase.com/)
