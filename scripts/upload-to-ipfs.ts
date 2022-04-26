import { create, globSource, CID } from "ipfs-http-client";

async function progressFunction(bytes: number, path?: string) {
  console.info(`Byte: ${bytes} ${path ? path : ""}`);
}

async function main() {
  let gateway = process.env.IPFS_GATEWAY
    ? process.env.IPFS_GATEWAY
    : "http://0.0.0.0:5001";

  const ipfs = await create({ url: new URL(gateway) });

  let cid: CID;
  for await (const file of ipfs.addAll(globSource("dist", "**/*"), {
    pin: true,
    wrapWithDirectory: true,
  })) {
    cid = file.cid;
    const path = file.path.length != 0 ? file.path : "the frontend";
    console.log(`Access ${path} at: https://ipfs.io/ipfs/${cid}`);
  }
}
main().then().catch();
