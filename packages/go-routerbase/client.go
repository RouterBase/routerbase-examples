package routerbase

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
)

const (
	BaseURL      = "https://routerbase.com/v1"
	DefaultModel = "google/gemini-2.5-flash"
)

type Client struct {
	apiKey     string
	baseURL    string
	httpClient *http.Client
}

type Option func(*Client)

func WithBaseURL(baseURL string) Option {
	return func(client *Client) {
		client.baseURL = strings.TrimRight(baseURL, "/")
	}
}

func WithHTTPClient(httpClient *http.Client) Option {
	return func(client *Client) {
		if httpClient != nil {
			client.httpClient = httpClient
		}
	}
}

func NewClient(apiKey string, options ...Option) *Client {
	client := &Client{
		apiKey:  apiKey,
		baseURL: BaseURL,
		httpClient: &http.Client{
			Timeout: 60 * time.Second,
		},
	}

	for _, option := range options {
		option(client)
	}

	return client
}

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type ChatCompletionRequest struct {
	Model       string    `json:"model,omitempty"`
	Messages    []Message `json:"messages"`
	Temperature *float64  `json:"temperature,omitempty"`
	MaxTokens   *int      `json:"max_tokens,omitempty"`
}

type ChatCompletionResponse struct {
	ID      string `json:"id,omitempty"`
	Object  string `json:"object,omitempty"`
	Choices []struct {
		Index   int     `json:"index,omitempty"`
		Message Message `json:"message"`
	} `json:"choices"`
}

type Model struct {
	ID      string `json:"id"`
	Object  string `json:"object,omitempty"`
	Created int64  `json:"created,omitempty"`
	OwnedBy string `json:"owned_by,omitempty"`
}

type ModelsResponse struct {
	Data []Model `json:"data"`
}

type apiError struct {
	Error struct {
		Message string `json:"message"`
	} `json:"error"`
	Msg string `json:"msg"`
}

func (client *Client) ChatCompletion(ctx context.Context, request ChatCompletionRequest) (*ChatCompletionResponse, error) {
	if len(request.Messages) == 0 {
		return nil, errors.New("messages must be a non-empty slice")
	}

	if request.Model == "" {
		request.Model = DefaultModel
	}

	var response ChatCompletionResponse
	if err := client.post(ctx, "/chat/completions", request, &response); err != nil {
		return nil, err
	}

	return &response, nil
}

func (client *Client) ListModels(ctx context.Context) (*ModelsResponse, error) {
	var response ModelsResponse
	if err := client.do(ctx, http.MethodGet, "/models", nil, &response); err != nil {
		return nil, err
	}

	return &response, nil
}

func (client *Client) post(ctx context.Context, path string, payload any, output any) error {
	body, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	return client.do(ctx, http.MethodPost, path, bytes.NewReader(body), output)
}

func (client *Client) do(ctx context.Context, method string, path string, body io.Reader, output any) error {
	if client.apiKey == "" {
		return errors.New("RouterBase API key is required")
	}

	req, err := http.NewRequestWithContext(ctx, method, client.baseURL+path, body)
	if err != nil {
		return err
	}

	req.Header.Set("Authorization", "Bearer "+client.apiKey)
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}

	resp, err := client.httpClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return formatAPIError(resp.StatusCode, respBody)
	}

	if len(respBody) == 0 {
		return nil
	}

	return json.Unmarshal(respBody, output)
}

func formatAPIError(statusCode int, body []byte) error {
	var parsed apiError
	if err := json.Unmarshal(body, &parsed); err == nil {
		switch {
		case parsed.Error.Message != "":
			return fmt.Errorf("routerbase request failed (%d): %s", statusCode, parsed.Error.Message)
		case parsed.Msg != "":
			return fmt.Errorf("routerbase request failed (%d): %s", statusCode, parsed.Msg)
		}
	}

	return fmt.Errorf("routerbase request failed (%d): %s", statusCode, strings.TrimSpace(string(body)))
}
