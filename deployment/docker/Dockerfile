FROM node:14 AS builder

LABEL maintainer="Thai Tan Loi <thaitanloi365@gmail.com>"

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

RUN echo "Building app ${NODE_ENV}"

WORKDIR /app

RUN pwd

COPY . .

RUN ls -la

COPY deployment/config/${NODE_ENV}/.env .env

RUN npm install


FROM node:14-alpine AS production

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./dist

CMD ["node", "dist/main"]

