FROM oven/bun:latest AS build 

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

RUN bun install

# Expose the port on which the API will listen

# Run the server when the container launches
RUN bun run build

FROM caddy:2-alpine

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=build /app/dist /user/share/caddy

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
