FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY dist .
