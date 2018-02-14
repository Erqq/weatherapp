FROM node:carbon


WORKDIR /usr/src/app



COPY package*.json ./

RUN npm install

COPY . .

ENV ENDPOINT 1.2.3.34:9000/api

EXPOSE 8080
CMD [ "npm", "start" ]