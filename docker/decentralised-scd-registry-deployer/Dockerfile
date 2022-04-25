FROM node:16 as build

WORKDIR /home/node
COPY . .
RUN chown -R node /home/node
USER node
RUN npm i 
RUN npm run build 

CMD IPFS_GATEWAY=$IPFS_GATEWAY npx ts-node scripts/upload-to-ipfs.ts 
