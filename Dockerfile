FROM node:18-alpine AS builder
COPY . /src
WORKDIR /src
RUN yarn && yarn build

FROM nginx:1.25.4
COPY --from=builder /src/build/ /html/
COPY nginx.conf mime.types /etc/nginx/
