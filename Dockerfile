FROM node:18-alpine AS build
WORKDIR /src/courses-ui

COPY package.json package-lock.json ./

RUN npm install

COPY . .

#CMD /courses/node_modules/.bin/ng serve --host 0.0.0.0 --disableHostCheck --proxy-config src/proxy.conf.json
