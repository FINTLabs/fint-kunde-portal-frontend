FROM node:16-alpine AS builder
COPY . /src
WORKDIR /src
RUN yarn && yarn build

FROM fintlabsacr.azurecr.io/nginx:1.17.6-6
COPY --from=builder /src/build/ /html/
COPY nginx.conf mime.types /etc/nginx/
