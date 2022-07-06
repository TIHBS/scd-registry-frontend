import { Registry__factory } from "../../external/decentralised-scd-registry-common/src/wrappers/factories/Registry__factory";
import { BigNumberish, ContractTransaction, ethers, Signer } from "ethers";
import { Registry } from "../../external/decentralised-scd-registry-common/src/wrappers/Registry";
import { SCD } from "../../external/decentralised-scd-registry-common/src/interfaces/SCD";
import { checkIfLoggedIn, connectMetamask } from "@/ethereum/Metamask";
import { Provider } from "@ethersproject/abstract-provider/lib/index";
import { fromBlockchainType } from "../../external/decentralised-scd-registry-common/src/interfaces/Types";

class EthereumConnector {
  private signer: Signer | undefined;
  private provider: Provider | undefined;

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

    if (await checkIfLoggedIn()) {
      this.signer = await this.getSigner();
      return this.signer;
    }

    if (!this.provider) {
      if (localStorage.getItem("networkish")) {
        this.provider = await ethers.getDefaultProvider(
          localStorage.getItem("networkish")!
        );
      } else {
        throw new Error("You haven't entered a valid network ID");
      }
    }
    return this.provider;
  }

  private getContractAddress(): string {
    if (!localStorage.getItem("contractAddress")) {
      throw new Error("You have to specify a contract address!");
    }
    return localStorage.getItem("contractAddress")!;
  }

  private async createRegistryContractWithSigner(): Promise<Registry> {
    return Registry__factory.connect(
      this.getContractAddress(),
      await this.getSigner()
    );
  }

  private async createRegistryContractWithSignerOrProvider(): Promise<Registry> {
    return Registry__factory.connect(
      this.getContractAddress(),
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

  async store(scd: Registry.SCDMetadataInStruct): Promise<ContractTransaction> {
    return await (await this.createRegistryContractWithSigner()).store(scd);
  }

  public async scdToContractMetadata(
    scd: SCD,
    url: string
  ): Promise<Registry.SCDMetadataInStruct> {
    const signature = await (
      await this.getSigner()
    ).signMessage(JSON.stringify(scd));

    const functionNames = scd.functions.map((func) => func.name);
    const eventNames = scd.events ? scd.events.map((event) => event.name) : [];

    const contractMetadata: Registry.SCDMetadataInStruct = {
      name: scd.name,
      internalAddress: scd.internal_address,
      url: url,
      signature: signature,
      version: scd.version,
      functions: functionNames,
      events: eventNames,
      blockChainType: fromBlockchainType.get(scd.blockchain_type)!,
    };

    return contractMetadata;
  }

  public verifySignature(
    message: string,
    pubKey: string,
    signature: string
  ): boolean {
    try {
      return ethers.utils.verifyMessage(message, signature) === pubKey;
    } catch (err) {
      throw err;
    }
  }
}

const ethereumConnector = new EthereumConnector();
export { ethereumConnector };
