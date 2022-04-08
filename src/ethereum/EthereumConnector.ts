import { Registry__factory } from "../../external/decentralised-scd-registry/src/types/factories/Registry__factory";
import { ContractTransaction, Signer } from "ethers";
import { Registry } from "external/decentralised-scd-registry/src/types/Registry";
import scds from "./SCDs";

class EthereumConnector {
  private signer: Signer | undefined;
  private static contractAddress = "0x222E34DA1926A9041ed5A87f71580D4D27f84fD3";
  public setSigner(signer: Signer | undefined) {
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

  async store(): Promise<ContractTransaction> {
    return await this.createRegistryContract().storeMultiple(scds);
  }

  async query(
    query: string
  ): Promise<Registry.SCDMetadataWithIDStructOutput[]> {
    return this.createRegistryContract().query(query);
  }
}

const ethereumConnector = new EthereumConnector();
export { ethereumConnector };
