FROM node:16

WORKDIR /usr/src/app



COPY . .
RUN npm install


EXPOSE 3003

CMD [ "node", "apps/api/server.js" ]