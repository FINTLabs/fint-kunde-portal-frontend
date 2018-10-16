FROM node:9-alpine
COPY . /src
WORKDIR /src
RUN yarn && yarn build
