FROM node:18 AS build
WORKDIR /src/courses-ui

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ./node_modules/.bin/ng serve --host 0.0.0.0 --configuration=production --proxy-config src/staging-proxy.conf.json
