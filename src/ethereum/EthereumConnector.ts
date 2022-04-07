import { Registry__factory } from "../../external/decentralised-scd-registry/src/types/factories/Registry__factory";
import { Signer } from "ethers";
import { Registry } from "external/decentralised-scd-registry/src/types/Registry";

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

    await registry.storeMultiple([
      {
        name: "Contract-Name-1",
        author: "TestAuthor1",
        version: "v2.3",
        signature:
          "62cf2bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
        internalAddress:
          "479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        blockChainType: 1,
        functions: ["function1", "function2", "function3"],
        events: ["event1", "event2", "event3", "event4"],
        isValid: true,
      },
      {
        name: "Contract-Name-2",
        author: "TestAuthor2",
        version: "v2.3",
        signature:
          "62cf2bcc38e123d52512bd72550cc61b0020ba726143d63fb58ec51371c5e746",
        internalAddress:
          "479f26b5f6e0db00d1cb9d6a4a0f8b28c30a7fe3f99fdfd68ed29ea3a12e6548",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        blockChainType: 1,
        functions: ["function1", "function2", "function3"],
        events: ["event1", "event2", "event3", "event4"],
        isValid: true,
      },
    ]);
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
