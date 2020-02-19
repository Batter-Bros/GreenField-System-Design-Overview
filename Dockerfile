FROM node:latest

RUN mkdir -p /src/app

WORKDIR /src/app

COPY package*.json ./

COPY . /src/app

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "docker"]