FROM node:carbon



WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm install

COPY . .

ENV APPID e557dda35ce7f17314b70fe4c595a9ae

EXPOSE 9000
CMD [ "npm", "start" ]