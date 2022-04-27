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
import { Provider } from "@ethersproject/abstract-provider/lib/index";

class EthereumConnector {
  private contractAddress: string;
  private signer: Signer | undefined;
  private provider: Provider | undefined;

  constructor(
    contractAddress = "0x222E34DA1926A9041ed5A87f71580D4D27f84fD3" /* This address seems to be the one that is used most of the time when the contract is deployed.*/
  ) {
    this.contractAddress = contractAddress;
  }

  public isConnected(): boolean {
    return this.signer != undefined;
  }

  public setSigner(signer: Signer | undefined) {
    this.signer = signer;
  }

  public async getSigner(): Promise<Signer> {
    if (!this.signer) {
      this.signer = await connectMetamask();
    }
    return this.signer;
  }

  public async getSignerOrProvider(): Promise<Signer | Provider> {
    if (this.signer) {
      return this.signer;
    }
    if (!this.provider) {
      if (localStorage.getItem("networkid")) {
        this.provider = await ethers.getDefaultProvider(
          localStorage.getItem("networkid")!
        );
      } else {
        throw new Error("You haven't entered a valid network ID");
      }
    }
    return this.provider;
  }

  private async createRegistryContractWithSigner(): Promise<Registry> {
    return Registry__factory.connect(
      this.contractAddress,
      await this.getSigner()
    );
  }

  private async createRegistryContractWithSignerOrProvider(): Promise<Registry> {
    return Registry__factory.connect(
      this.contractAddress,
      await this.getSignerOrProvider()
    );
  }

  async query(
    query: string
  ): Promise<Registry.SCDMetadataWithIDStructOutput[]> {
    return (await this.createRegistryContractWithSignerOrProvider()).query(
      query
    );
  }

  async retrieveById(
    id: BigNumberish
  ): Promise<Registry.SCDMetadataWithIDStructOutput> {
    return await (
      await this.createRegistryContractWithSignerOrProvider()
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
      await this.getSigner()
    ).signMessage(JSON.stringify(scd));
    const authorAddress = await (await this.getSigner()).getAddress();

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

  public verifySignature(message: string, signature: string): string {
    return ethers.utils.verifyMessage(message, signature);
  }
}

const ethereumConnector = new EthereumConnector();
export { ethereumConnector };
