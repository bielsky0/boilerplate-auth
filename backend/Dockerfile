FROM --platform=linux/amd64 node:16.10
WORKDIR /app
COPY backend/package*.json ./
RUN yarn install
COPY ./backend ./

EXPOSE 5000
CMD [ "yarn", "run", "start" ]
