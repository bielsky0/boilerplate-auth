#!/usr/bin/env bash

./wait-for-it.sh postgres:5432

npx prisma migrate dev --name init

yarn run dev