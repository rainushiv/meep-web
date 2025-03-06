FROM node:18-alpine

WORKDIR /react-app

COPY package* .json ./

RUN bun install

COPY . . 

EXPOSE 5173