const { BeeDebug } = require("@ethersphere/bee-js");
const { Bee } = require("@ethersphere/bee-js");

async function main() {
  const swarmApi = process.env.SWARM_API
    ? process.env.SWARM_API
    : "http://localhost:1633";
  const swarmDebug = process.env.SWARM_DEBUG
    ? process.env.SWARM_DEBUG
    : "http://localhost:1635";

  const amount = process.env.AMOUNT ? process.env.AMOUNT : "1000000";
  const depth = parseInt(process.env.DEPTH ? process.env.DEPTH : "20");

  const directory = process.env.DIRECTORY ? process.env.DIRECTORY : "./dist";

  const beeApi = new Bee(swarmApi);
  const beeDebug = new BeeDebug(swarmDebug);

  console.log("Creating a postage batch.");
  const batchId = await beeDebug.createPostageBatch(amount, depth);

  console.log(`Created a postage batch with the reference ${batchId}.`);
  console.log("Waiting until the postage is usable.");

  let usable = false;
  while (!usable) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const postageBatch = await beeDebug.getPostageBatch(batchId);
    usable = postageBatch.usable;
  }
  console.log("Batch is now usable.");
  console.log(`Uploading the directory ${directory}.`);
  const result = await beeApi.uploadFilesFromDirectory(batchId, directory);
  const websiteUrl = new URL(
    `${result.reference}/index.html`,
    `${swarmApi}/bzz/`
  );
  console.log("Uploaded directory");
  console.log(`The website can be found at ${websiteUrl}`);
}
main().then().catch();
