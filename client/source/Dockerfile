FROM node:16 AS builder
WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:1.21.4-alpine
EXPOSE 80
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build .