import {
  chatCompletion,
  extractAssistantText
} from "./src/routerbase-client.js";

const response = await chatCompletion({
  messages: [
    {
      role: "user",
      content: "Explain RouterBase in one concise sentence."
    }
  ]
});

console.log(extractAssistantText(response));
