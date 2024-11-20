FROM node:lts
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npx", "nodemon", "--exec", "npx ts-node", "app.ts"]