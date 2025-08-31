FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json bun.lockb* ./

RUN bun install --frozen-lockfile

COPY . .

# Run the server when the container launches
RUN bun run build

FROM caddy:2-alpine

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=builder /app/dist /usr/share/caddy

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
