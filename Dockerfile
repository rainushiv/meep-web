FROM oven/bun:latest

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

RUN bun install
RUN bun run build

# Expose the port on which the API will listen
EXPOSE 5173

# Run the server when the container launches
CMD ["bun", "run", "dev","--host"]