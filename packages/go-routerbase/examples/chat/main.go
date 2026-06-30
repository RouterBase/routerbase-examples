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
			{Role: "user", Content: "Explain RouterBase in one concise sentence."},
		},
	})
	if err != nil {
		panic(err)
	}

	fmt.Println(resp.Choices[0].Message.Content)
}
