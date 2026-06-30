import {
  chatCompletion,
  extractAssistantText
} from "./examples/node/src/routerbase-client.js";

const prompt = process.env.ROUTERBASE_PROMPT;

const response = await chatCompletion({
  messages: [{ role: "user", content: prompt }]
});

console.log(extractAssistantText(response));
