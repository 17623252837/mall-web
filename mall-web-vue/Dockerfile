FROM nginx
MAINTAINER huronghua <1505523898@qq.com>

RUN rm /etc/nginx/conf.d/default.conf
ADD default.conf /etc/nginx/conf.d/

COPY ./dist/  /usr/share/nginx/wwwroot/upload/
