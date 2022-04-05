import { create } from "ipfs-core";

async function main() {
  const ipfs = await create();
  const { cid } = await ipfs.add({
    path: "/home/christian/GitRepos/decentralised-scd-registry-frontend/dist",
  });

  console.info(cid);
}

main()
  .then()
  .catch((error) => {});
