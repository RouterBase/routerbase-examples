import { listModels } from "./src/routerbase-client.js";

const response = await listModels();
const models = Array.isArray(response.data) ? response.data : response.models ?? [];

for (const model of models) {
  console.log(model.id ?? model.name ?? model.model ?? model);
}
