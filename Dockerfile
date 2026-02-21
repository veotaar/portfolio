# Stage 1: Build
FROM oven/bun:1 AS builder

WORKDIR /app

# Install dependencies first (cache layer)
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source and build
COPY . .
RUN bun run build

# Stage 2: Run
FROM oven/bun:1-slim AS runner

WORKDIR /app

# Copy built static assets and server script
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./

EXPOSE 4321

CMD ["bun", "server.ts"]
