FROM --platform=linux/amd64 node:16.10
WORKDIR /app
COPY backend/package.json ./
COPY backend/yarn.lock ./

RUN yarn install

COPY /backend/source/infrastructure/database/prisma ./source/infrastructure/database/prisma/

COPY ./backend ./

EXPOSE 5000

CMD [ "yarn", "run", "dev" ]
