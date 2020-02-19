FROM node:latest

RUN mkdir -p /client/src/app

WORKDIR /client/src/app

COPY package*.json ./

COPY . /client/src/app

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "docker"]