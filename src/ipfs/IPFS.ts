import * as IPFS from "ipfs-core";

class IPFSConnector {
  private ipfs: IPFS.IPFS | undefined;

  async start() {
    this.ipfs = await IPFS.create();
  }

  async stop() {
    this.checkIfStarted();
    this.ipfs!.stop();
  }

  async fetchData(cid: IPFS.CID | string) {
    this.checkIfStarted();
    let data = "";
    for await (const buffer of this.ipfs!.cat(cid)) {
      data += buffer;
    }
    return data;
  }

  async store(fileContents: string) {
    this.checkIfStarted();
    const { cid } = await this.ipfs!.add(fileContents);
    return cid.toString();
  }

  private checkIfStarted() {
    if (!this.ipfs) {
      throw new Error("IPFS was not started!");
    }
  }
}

const ipfsConnector = new IPFSConnector();
ipfsConnector.start();

export { ipfsConnector };
