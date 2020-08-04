FROM keymetrics/pm2:latest-alpine
# FROM nginx:latest

RUN apk update
RUN apk add nodejs
RUN apk add npm
RUN apk add git

WORKDIR home/backend/
RUN git clone https://github.com/Mario2334/stock_app.git .
COPY .env.example .env
RUN npm install
RUN npm run build
COPY server/fixtures/data dist-server/fixtures/data
CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]