FROM node:16 AS builder

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm run serve:ipfs
