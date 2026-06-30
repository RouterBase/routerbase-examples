package routerbase

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestChatCompletion(t *testing.T) {
	var captured struct {
		Authorization string
		ContentType   string
		Body          ChatCompletionRequest
	}

	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/chat/completions" {
			t.Fatalf("unexpected path: %s", r.URL.Path)
		}

		captured.Authorization = r.Header.Get("Authorization")
		captured.ContentType = r.Header.Get("Content-Type")
		if err := json.NewDecoder(r.Body).Decode(&captured.Body); err != nil {
			t.Fatal(err)
		}

		_, _ = w.Write([]byte(`{"choices":[{"message":{"role":"assistant","content":"Hello"}}]}`))
	}))
	defer server.Close()

	client := NewClient("sk-rb-test", WithBaseURL(server.URL), WithHTTPClient(server.Client()))
	resp, err := client.ChatCompletion(context.Background(), ChatCompletionRequest{
		Messages: []Message{{Role: "user", Content: "Hi"}},
	})
	if err != nil {
		t.Fatal(err)
	}

	if captured.Authorization != "Bearer sk-rb-test" {
		t.Fatalf("unexpected auth header: %s", captured.Authorization)
	}
	if captured.ContentType != "application/json" {
		t.Fatalf("unexpected content type: %s", captured.ContentType)
	}
	if captured.Body.Model != DefaultModel {
		t.Fatalf("unexpected model: %s", captured.Body.Model)
	}
	if got := resp.Choices[0].Message.Content; got != "Hello" {
		t.Fatalf("unexpected response text: %s", got)
	}
}

func TestListModels(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/models" {
			t.Fatalf("unexpected path: %s", r.URL.Path)
		}

		_, _ = w.Write([]byte(`{"data":[{"id":"google/gemini-2.5-flash"}]}`))
	}))
	defer server.Close()

	client := NewClient("sk-rb-test", WithBaseURL(server.URL), WithHTTPClient(server.Client()))
	resp, err := client.ListModels(context.Background())
	if err != nil {
		t.Fatal(err)
	}

	if got := resp.Data[0].ID; got != "google/gemini-2.5-flash" {
		t.Fatalf("unexpected model id: %s", got)
	}
}

func TestChatCompletionRequiresMessages(t *testing.T) {
	client := NewClient("sk-rb-test")
	_, err := client.ChatCompletion(context.Background(), ChatCompletionRequest{})
	if err == nil {
		t.Fatal("expected error")
	}
}

func TestAPIError(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusBadRequest)
		_, _ = w.Write([]byte(`{"error":{"message":"bad request"}}`))
	}))
	defer server.Close()

	client := NewClient("sk-rb-test", WithBaseURL(server.URL), WithHTTPClient(server.Client()))
	_, err := client.ListModels(context.Background())
	if err == nil {
		t.Fatal("expected error")
	}
}
