FROM node:20-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .


RUN npm install

COPY prisma ./prisma/

COPY .env .
COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY nest-cli.json ./nest-cli.json

RUN npm run build
#Nest runs on port 3000
EXPOSE 3001

CMD npm run db:migrate && npm run start:dev
