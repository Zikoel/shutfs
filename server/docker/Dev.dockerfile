FROM node:22-alpine

LABEL maintainer="Elia Mazzuoli <zikoel@gmail.com>"

WORKDIR /app

# dumb-init is available in Alpine's package manager
RUN apk add --no-cache dumb-init

# Install dependencies
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn

# Prepare storage folders
RUN mkdir /storage
RUN mkdir /app_logs

# Add node_modules/.bin to PATH
ENV PATH="/app/node_modules/.bin:${PATH}"

EXPOSE 5000
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
