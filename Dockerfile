FROM ubuntu:20.04
WORKDIR /var/www
COPY . .
RUN apt update && apt install -y nodejs && apt install -y npm
EXPOSE 4000
RUN npm install
CMD node server.js
