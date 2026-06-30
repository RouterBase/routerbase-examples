# RouterBase Go Client

[RouterBase](https://routerbase.com) provides an OpenAI-compatible API at `https://routerbase.com/v1`. This Go module is a small starter client for chat completions and model listing.

## Install

```bash
go get github.com/RouterBase/routerbase-examples/packages/go-routerbase
```

## Usage

```go
package main

import (
	"context"
	"fmt"
	"os"

	routerbase "github.com/RouterBase/routerbase-examples/packages/go-routerbase"
)

func main() {
	client := routerbase.NewClient(os.Getenv("ROUTERBASE_API_KEY"))

	resp, err := client.ChatCompletion(context.Background(), routerbase.ChatCompletionRequest{
		Messages: []routerbase.Message{
			{Role: "user", Content: "Explain RouterBase in one sentence."},
		},
	})
	if err != nil {
		panic(err)
	}

	fmt.Println(resp.Choices[0].Message.Content)
}
```

## Links

- [RouterBase](https://routerbase.com)
- [RouterBase docs](https://docs.routerbase.com/)
- [Chat completions docs](https://docs.routerbase.com/api-reference/chat-completions)
