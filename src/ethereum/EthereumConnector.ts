import { Registry__factory } from "../../external/decentralised-scd-registry/src/types/factories/Registry__factory";
import { BigNumberish, ContractTransaction, Signer } from "ethers";
import { Registry } from "external/decentralised-scd-registry/src/types/Registry";
import scds from "./SCDs";
import { SCD } from "@/util/SCD";

class EthereumConnector {
  private signer: Signer | undefined;
  private static contractAddress = "0x222E34DA1926A9041ed5A87f71580D4D27f84fD3";
  public setSigner(signer: Signer | undefined) {
    this.signer = signer;
  }

  async query(
    query: string
  ): Promise<Registry.SCDMetadataWithIDStructOutput[]> {
    return this.createRegistryContract().query(query);
  }

  async retrieveById(
    id: BigNumberish
  ): Promise<Registry.SCDMetadataWithIDStructOutput> {
    return await this.createRegistryContract().retrieveById(id);
  }

  async store(scd: Registry.SCDMetadataStruct): Promise<ContractTransaction> {
    return await this.createRegistryContract().store(scd);
  }

  async storeMock(): Promise<ContractTransaction> {
    return await this.createRegistryContract().storeMultiple(scds);
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

  public async scdToMetadata(
    scd: SCD,
    url: string
  ): Promise<Registry.SCDMetadataStruct> {
    const functionNames = scd.Functions.map((func) => func.Name);
    const eventNames = scd.Events ? scd.Events.map((event) => event.Name) : [];
    const signature = await this.signer!.signMessage(JSON.stringify(scd));
    const authorAddress = await this.signer!.getAddress();
    const metadata: Registry.SCDMetadataStruct = {
      name: scd.Name,
      author: authorAddress,
      version: scd.Version,
      signature: signature,
      internalAddress: scd.InternalAddress,
      url: url,
      blockChainType: scd.BlockChainType,
      functions: functionNames,
      events: eventNames,
      isValid: true,
    };

    return metadata;
  }
}

const ethereumConnector = new EthereumConnector();
export { ethereumConnector };
