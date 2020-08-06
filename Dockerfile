FROM node:12.16.3
RUN npm install pm2 -g
WORKDIR /code
COPY package.json .
COPY yarn.lock .

RUN yarn
COPY ./dist .

# CMD ["pm2-runtime", "shared/infra/http/server.js"]
