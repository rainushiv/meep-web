FROM oven/bun:latest

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

RUN bun install

# Run the server when the container launches
CMD ["bun", "run", "build"]

