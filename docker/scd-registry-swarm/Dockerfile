FROM node:16 as build

WORKDIR /home/node
COPY . .
RUN chown -R node /home/node
USER node
RUN npm i 
RUN npm run build 

CMD SWARM_API=$SWARM_API SWARM_DEBUG=$SWARM_DEBUG npx ts-node scripts/upload-to-swarm.ts 
