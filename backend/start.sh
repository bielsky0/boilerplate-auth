#!/usr/bin/env bash

./wait-for-it.sh postgres:5432


npx prisma migrate dev --name init --schema=./source/infrastructure/database/prisma/schema.prisma

yarn run dev