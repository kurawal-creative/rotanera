FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

ENV DATABASE_URL="file:placeholder"
ENV PRISMA_CLIENT_ENGINE_TYPE="wasm"

RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "start"]
