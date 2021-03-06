FROM node:12.16-stretch AS node-modules
WORKDIR /app
COPY server/package.json package.json
COPY server/yarn.lock yarn.lock
RUN yarn --production
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64

FROM node:12.16-stretch-slim
LABEL Elia Mazzuoli <zikoel@gmail.com>
WORKDIR /app

# Add dumb-init to receive SIGINT and SIGTERM signals

COPY --from=node-modules /usr/local/bin/dumb-init /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

COPY --from=node-modules /app/node_modules /app/node_modules
COPY server/dist server/dist
COPY client/build client/build
COPY server/package.json package.json

EXPOSE 5000
ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]
CMD ["node", "server/dist/start"]
