import { Registry__factory } from "../../external/decentralised-scd-registry/src/types/factories/Registry__factory";
import { Signer } from "ethers";
import { Registry } from "external/decentralised-scd-registry/src/types/Registry";
import scds from "./SCDs";

class EthereumConnector {
  private signer: Signer | undefined;
  private static contractAddress = "0x222E34DA1926A9041ed5A87f71580D4D27f84fD3";
  public setSigner(signer: Signer) {
    this.signer = signer;
  }

  private createRegistryContract() {
    if (this.signer) {
      return Registry__factory.connect(
        EthereumConnector.contractAddress,
        this.signer
      );
    }
    throw new Error("You are not logged in!");
  }

  async store() {
    const registry = this.createRegistryContract();

    await registry.storeMultiple(scds);
  }

  async query(
    query: string
  ): Promise<Registry.SCDMetadataWithIDStructOutput[]> {
    const registry = this.createRegistryContract();
    return registry.query(query);
  }

  async fetch(): Promise<Registry.SCDMetadataWithIDStructOutput[]> {
    const registry = this.createRegistryContract();
    return registry.retrieveByAuthor("TestAuthor1");
  }
}

const ethereumConnector = new EthereumConnector();
export { ethereumConnector };
