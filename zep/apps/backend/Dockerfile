FROM node:16

WORKDIR /usr/src/app

COPY package.json ./

# Copy the api package.json
COPY package.json ./

RUN npm install

# Copy app source
COPY . .
    
EXPOSE 3003

CMD [ "node", "apps/api/server.js" ]