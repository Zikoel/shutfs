FROM node:22-alpine AS node-modules
WORKDIR /app
COPY server/package.json package.json
COPY server/yarn.lock yarn.lock
RUN yarn --production

FROM node:22-alpine
LABEL maintainer="Elia Mazzuoli <zikoel@gmail.com>"
WORKDIR /app

# dumb-init is available in Alpine's package manager
RUN apk add --no-cache dumb-init

COPY --from=node-modules /app/node_modules /app/node_modules
COPY server/dist server/dist
COPY client/build client/build
COPY server/package.json package.json

EXPOSE 5000
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "server/dist/start"]
