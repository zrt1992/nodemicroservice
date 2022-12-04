FROM node:16-alpine

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 6002

CMD ["npm", "start"]