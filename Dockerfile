FROM cypress/base:10 as TEST
WORKDIR /src
COPY package.json .
COPY . /src
COPY cypress.json cypress ./
COPY cypress ./cypress
RUN yarn install --frozen-lockfile
RUN yarn ci && yarn build

FROM fintlabsacr.azurecr.io/nginx:1.17.6-6
COPY --from=builder /src/build/ /html/
COPY nginx.conf mime.types /etc/nginx/
