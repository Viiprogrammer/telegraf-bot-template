FROM node:lts-alpine3.15

WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .
