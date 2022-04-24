import { Registry__factory } from "../../external/decentralised-scd-registry-common/src/wrappers/factories/Registry__factory";
import { BigNumberish, ContractTransaction, ethers, Signer } from "ethers";
import { Registry } from "../../external/decentralised-scd-registry-common/src/wrappers/Registry";
import scds from "./SCDs";
import { SCD } from "../../external/decentralised-scd-registry-common/src/interfaces/SCD";
import {
  Metadata,
  toContractType,
} from "../../external/decentralised-scd-registry-common/src/Conversion";
import { connectMetamask, getNetworkById } from "@/ethereum/Metamask";
import { def } from "@vue/shared";

class EthereumConnector {
  private contractAddress: string;
  private defaultNetwork: number;

  constructor(
    defaultNetwork = 57771,
    contractAddress = "0x222E34DA1926A9041ed5A87f71580D4D27f84fD3" /* This address seems to be the one that is used most of the time when the contract is deployed.*/
  ) {
    this.defaultNetwork = defaultNetwork;
    this.contractAddress = contractAddress;
  }

  async connectWallet() {
    return await connectMetamask();
  }

  async query(
    query: string
  ): Promise<Registry.SCDMetadataWithIDStructOutput[]> {
    return (await this.createRegistryContractWithProvider()).query(query);
  }

  async retrieveById(
    id: BigNumberish
  ): Promise<Registry.SCDMetadataWithIDStructOutput> {
    return await (
      await this.createRegistryContractWithProvider()
    ).retrieveById(id);
  }

  async store(scd: Registry.SCDMetadataStruct): Promise<ContractTransaction> {
    return await (await this.createRegistryContractWithSigner()).store(scd);
  }

  async storeMock(): Promise<ContractTransaction> {
    return await (
      await this.createRegistryContractWithSigner()
    ).storeMultiple(scds);
  }

  private async createRegistryContractWithSigner() {
    return Registry__factory.connect(
      this.contractAddress,
      await this.connectWallet()
    );
  }

  private async createRegistryContractWithProvider() {
    return Registry__factory.connect(
      this.contractAddress,
      await ethers.getDefaultProvider(
        getNetworkById(Number(this.defaultNetwork))
      )
    );
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
    const signature = await (
      await this.connectWallet()
    ).signMessage(JSON.stringify(scd));
    const authorAddress = await (await this.connectWallet()).getAddress();

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
