# Base image
FROM node:16
RUN mkdir -p /home/appWeb/node_modules
WORKDIR /home/appWeb
COPY . .
COPY package*.json ./
RUN npm install
EXPOSE 4200
#RUN npm run build
#CMD [ "node", "dist/main.js" ]