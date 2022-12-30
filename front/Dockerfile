FROM node:18

WORKDIR /front

COPY /front/. .

RUN npm ci

EXPOSE 3000

CMD ["npm","start"]