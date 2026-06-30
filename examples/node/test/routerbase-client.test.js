import assert from "node:assert/strict";
import test from "node:test";
import {
  ROUTERBASE_BASE_URL,
  chatCompletion,
  createChatBody,
  extractAssistantText,
  listModels
} from "../src/routerbase-client.js";

test("creates OpenAI-style chat bodies", () => {
  assert.deepEqual(
    createChatBody({
      apiKey: "sk-rb-test",
      baseURL: "https://example.com/v1",
      fetchImpl: async () => {},
      messages: [{ role: "user", content: "Hello" }],
      temperature: 0.1
    }),
    {
      model: "google/gemini-2.5-flash",
      messages: [{ role: "user", content: "Hello" }],
      temperature: 0.1
    }
  );
});

test("calls chat completions endpoint", async () => {
  const calls = [];
  const response = await chatCompletion({
    apiKey: "sk-rb-test",
    messages: [{ role: "user", content: "Hello" }],
    fetchImpl: async (url, init) => {
      calls.push({ url, init });
      return new Response(
        JSON.stringify({ choices: [{ message: { content: "Hi" } }] })
      );
    }
  });

  assert.equal(calls[0].url, `${ROUTERBASE_BASE_URL}/chat/completions`);
  assert.equal(calls[0].init.headers.Authorization, "Bearer sk-rb-test");
  assert.equal(extractAssistantText(response), "Hi");
});

test("calls models endpoint", async () => {
  const calls = [];
  const response = await listModels({
    apiKey: "sk-rb-test",
    fetchImpl: async (url, init) => {
      calls.push({ url, init });
      return new Response(JSON.stringify({ data: [{ id: "google/gemini" }] }));
    }
  });

  assert.equal(calls[0].url, `${ROUTERBASE_BASE_URL}/models`);
  assert.equal(response.data[0].id, "google/gemini");
});
