export const ROUTERBASE_BASE_URL = "https://routerbase.com/v1";
export const DEFAULT_MODEL = "google/gemini-2.5-flash";

export type RouterBaseMessage = {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
};

export type ChatCompletionOptions = {
  model?: string;
  messages: RouterBaseMessage[];
  temperature?: number;
  max_tokens?: number;
  [key: string]: unknown;
};

export type RouterBaseOptions = {
  apiKey: string;
  baseURL?: string;
  fetch?: typeof fetch;
};

export class RouterBase {
  #apiKey: string;
  #baseURL: string;
  #fetch: typeof fetch;

  constructor(options: RouterBaseOptions) {
    if (!options.apiKey) {
      throw new Error("RouterBase API key is required.");
    }

    this.#apiKey = options.apiKey;
    this.#baseURL = (options.baseURL ?? ROUTERBASE_BASE_URL).replace(/\/+$/, "");
    this.#fetch = options.fetch ?? fetch;
  }

  async chatCompletion(options: ChatCompletionOptions): Promise<unknown> {
    if (!Array.isArray(options.messages) || options.messages.length === 0) {
      throw new Error("messages must be a non-empty array.");
    }

    const response = await this.#fetch(`${this.#baseURL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.#apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: options.model ?? DEFAULT_MODEL,
        ...options,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`RouterBase request failed (${response.status}): ${JSON.stringify(data)}`);
    }

    return data;
  }

  async listModels(): Promise<unknown> {
    const response = await this.#fetch(`${this.#baseURL}/models`, {
      headers: {
        Authorization: `Bearer ${this.#apiKey}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`RouterBase models request failed (${response.status}): ${JSON.stringify(data)}`);
    }

    return data;
  }
}
