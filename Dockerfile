FROM node:16.10.0

WORKDIR /usr/src/app

RUN apt-get update || : && apt-get install python -y
RUN apt-get install ffmpeg -y
RUN npm i pm2

COPY package*.json ./

RUN npm ci

COPY . .

CMD [ "pm2", "index.js" ]