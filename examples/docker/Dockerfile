FROM node:20-alpine

WORKDIR /app

COPY examples/node/src ./examples/node/src
COPY examples/docker/prompt-runner.js ./prompt-runner.js

ENV ROUTERBASE_PROMPT="Explain RouterBase in one concise sentence."

CMD ["node", "prompt-runner.js"]
