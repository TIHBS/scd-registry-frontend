import { Registry__factory } from "../../external/decentralised-scd-registry/src/types/factories/Registry__factory";
import { BigNumberish, ContractTransaction, Signer } from "ethers";
import { Registry } from "external/decentralised-scd-registry/src/types/Registry";
import scds from "./SCDs";
import { SCD } from "../../external/decentralised-scd-registry-common/SCD";
import Deployment from "../../external/decentralised-scd-registry/deployments/ganache-cli/Registry.json";

class EthereumConnector {
  private signer: Signer | undefined;
  private contractAddress: string;

  constructor(contractAddress = Deployment.address) {
    this.contractAddress = contractAddress;
  }

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
      return Registry__factory.connect(this.contractAddress, this.signer);
    }
    throw new Error("You are not logged in!");
  }

  public async scdToMetadata(
    scd: SCD,
    url: string
  ): Promise<Registry.SCDMetadataStruct> {
    const functionNames = scd.functions.map((func) => func.name);
    const eventNames = scd.events ? scd.events.map((event) => event.name) : [];
    const signature = await this.signer!.signMessage(JSON.stringify(scd));
    const authorAddress = await this.signer!.getAddress();
    const metadata: Registry.SCDMetadataStruct = {
      name: scd.name,
      author: authorAddress,
      version: scd.version,
      signature: signature,
      internalAddress: scd.internal_address,
      url: url,
      blockChainType: scd.blockchain_type,
      functions: functionNames,
      events: eventNames,
      isValid: true,
    };

    return metadata;
  }
}

const ethereumConnector = new EthereumConnector();
export { ethereumConnector };
