FROM node:12.16-stretch

LABEL Elia Mazzuoli <zikoel@gmail.com>

WORKDIR /app

# Add dumb-init to receive SIGINT and SIGTERM signals
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64
RUN chmod +x /usr/local/bin/dumb-init

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
ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]
