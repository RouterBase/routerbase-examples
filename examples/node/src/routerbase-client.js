export const ROUTERBASE_BASE_URL = "https://routerbase.com/v1";
export const DEFAULT_MODEL = "google/gemini-2.5-flash";

function normalizeBaseURL(baseURL = ROUTERBASE_BASE_URL) {
  if (typeof baseURL !== "string" || baseURL.trim() === "") {
    throw new Error("baseURL must be a non-empty string.");
  }

  return baseURL.trim().replace(/\/+$/, "");
}

function readApiKey() {
  return globalThis.process?.env?.ROUTERBASE_API_KEY;
}

async function parseJson(response) {
  const text = await response.text();

  if (!text) {
    return {};
  }

  return JSON.parse(text);
}

export function createChatBody(options = {}) {
  const {
    apiKey: _apiKey,
    baseURL: _baseURL,
    fetchImpl: _fetchImpl,
    model = DEFAULT_MODEL,
    messages,
    ...rest
  } = options;

  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error("messages must be a non-empty OpenAI-style message array.");
  }

  return {
    model,
    messages,
    ...rest
  };
}

export async function chatCompletion(options = {}) {
  const apiKey = options.apiKey ?? readApiKey();

  if (!apiKey) {
    throw new Error("RouterBase API key is required. Set ROUTERBASE_API_KEY.");
  }

  const fetchImpl = options.fetchImpl ?? globalThis.fetch;

  if (typeof fetchImpl !== "function") {
    throw new Error("A fetch implementation is required. Use Node.js 18+.");
  }

  const response = await fetchImpl(`${normalizeBaseURL(options.baseURL)}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(createChatBody(options))
  });
  const data = await parseJson(response);

  if (!response.ok) {
    const detail = data.error?.message ?? data.msg ?? JSON.stringify(data);
    throw new Error(`RouterBase request failed (${response.status}): ${detail}`);
  }

  return data;
}

export async function listModels(options = {}) {
  const apiKey = options.apiKey ?? readApiKey();

  if (!apiKey) {
    throw new Error("RouterBase API key is required. Set ROUTERBASE_API_KEY.");
  }

  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  const response = await fetchImpl(`${normalizeBaseURL(options.baseURL)}/models`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });
  const data = await parseJson(response);

  if (!response.ok) {
    const detail = data.error?.message ?? data.msg ?? JSON.stringify(data);
    throw new Error(`RouterBase models request failed (${response.status}): ${detail}`);
  }

  return data;
}

export function extractAssistantText(response) {
  return response?.choices?.[0]?.message?.content ?? "";
}
