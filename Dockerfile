FROM node:18-alpine AS builder
WORKDIR /src
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . /src
RUN yarn build

FROM node:18.19.1-bookworm-slim
WORKDIR /usr/src/app
RUN mkdir -p server
COPY server/package*.json server
COPY server/yarn.lock*.json server
COPY --from=builder /src/build/ build
RUN yarn --cwd server install
COPY server server

EXPOSE 8000

CMD [ "node", "server/index.js" ]