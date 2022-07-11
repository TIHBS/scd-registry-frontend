# Frontend

This is the frontend of the SCD registry.
It can be served with [serve](https://www.npmjs.com/package/serve), [IPFS](https://ipfs.io/) or [Swarm](https://www.ethswarm.org/).
## Requirements

- npm
- node
- docker
- docker-compose

## Build

To build the project:

```bash
npm i
npm run build
```

## Serve

To serve the Frontend with [serve](https://www.npmjs.com/package/serve) run:

```bash
npm start
```

To serve the Frontend with [IPFS](https://ipfs.io/) run:

```bash
IPFS_GATEWAY=<url-to-gateway> npx ts-node scripts/upload-to-ipfs.ts 
```

To serve the Frontend with [Swarm](https://www.ethswarm.org/) run:

```bash
SWARM_API=<url-to-swarm-api> SWARM_DEBUG=<url-to-swarm-debug> npx ts-node scripts/upload-to-swarm.ts 
```

## Test

To test the project run:

```bash
npm test
```
