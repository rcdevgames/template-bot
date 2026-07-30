# Stage 1: Build the binary using oven/bun
FROM oven/bun:latest as builder
WORKDIR /app

# Copy dependency files
COPY package.json bun.lock ./
# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Compile to a single standalone binary
RUN bun run build

# Stage 2: Deploy to Distroless/cc (minimal image, no shell, ~20MB)
FROM gcr.io/distroless/cc-debian12
WORKDIR /app

# Copy only the compiled binary and required env file template
COPY --from=builder /app/dist/bot ./bot
# COPY --from=builder /app/.env.example ./.env

USER nonroot:nonroot
ENV NODE_ENV=production

CMD ["./bot"]
