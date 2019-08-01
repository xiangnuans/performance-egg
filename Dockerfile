
FROM node:10

ADD . /app/

WORKDIR /app

EXPOSE 7001
RUN yarn

CMD ["yarn","dev"]
