FROM node:10

WORKDIR /mnt/c/Users/KYI/Documents/dev/weather-was

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 8080 
CMD [ "node", "index.js" ]
