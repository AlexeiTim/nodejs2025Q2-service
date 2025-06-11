FROM node:22.14.0-alpine

WORKDIR /app

RUN apk add --no-cache netcat-openbsd

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "start:dev"]