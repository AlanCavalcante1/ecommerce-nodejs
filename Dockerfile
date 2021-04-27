FROM node:11-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 3000

CMD nodemon -L --watch . server.js

#FROM node:alpine

#WORKDIR /usr/src/app

#COPY package*.json ./

#RUN npm install
#RUN npm install nodemon -g --quiet

#COPY . .

#EXPOSE 3000

#CMD ['node', 'server.js']