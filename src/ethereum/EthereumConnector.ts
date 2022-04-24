import { Registry__factory } from "../../external/decentralised-scd-registry/src/types/factories/Registry__factory";
import { BigNumberish, ContractTransaction, Signer } from "ethers";
import { Registry } from "external/decentralised-scd-registry/src/types/Registry";
import scds from "./SCDs";
import { SCD } from "../../external/decentralised-scd-registry-common/src/interfaces/SCD";
import {
  Metadata,
  toContractType,
} from "../../external/decentralised-scd-registry-common/src/Conversion";

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

  public async scdToContractMetadata(
    scd: SCD,
    url: string
  ): Promise<Registry.SCDMetadataStruct> {
    return await toContractType(await this.scdToMetadata(scd, url));
  }

  private async scdToMetadata(scd: SCD, url: string): Promise<Metadata> {
    const functionNames = scd.functions.map((func) => func.name);
    const eventNames = scd.events ? scd.events.map((event) => event.name) : [];
    const signature = await this.signer!.signMessage(JSON.stringify(scd));
    const authorAddress = await this.signer!.getAddress();

    return {
      name: scd.name,
      author: authorAddress,
      version: scd.version,
      signature: signature,
      internal_address: scd.internal_address,
      url: new URL(url),
      blockchain_type: scd.blockchain_type,
      functions: functionNames,
      events: eventNames,
      is_valid: true,
    };
  }
}

const ethereumConnector = new EthereumConnector();
export { ethereumConnector };
