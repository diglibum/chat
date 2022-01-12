FROM alpine:3.14
WORKDIR /var/www

COPY . .
RUN npm install
EXPOSE 3000
