import { ethereumConnector } from "@/ethereum/EthereumConnector";
import { BigNumberish } from "ethers";
import { Registry } from "external/scd-registry-common/src/wrappers/Registry";
import { useToast } from "vue-toastification";

interface QueryFunction {
  (query: string): Promise<Registry.SCDMetadataWithIDStructOutput[]>;
}

class QueryService {
  private queryFunctions = new Map<string, QueryFunction>([
    ["EASY", this.easyQuery],
    ["TRUSTWORTHY", this.trustworthyQuery],
  ]);

  async query(
    query: string
  ): Promise<Registry.SCDMetadataWithIDStructOutput[]> {
    if (query.length == 0) {
      throw new Error("You have to enter a query!");
    }

    const mode = localStorage.getItem("pickedSearchMode");
    if (!mode) {
      throw new Error("You haven't specified a query mode!");
    }
    const result = await this.queryFunctions.get(mode)!(query);

    if (result.length == 0) {
      useToast().warning("Nothing was found!");
    }

    return result;
  }

  async trustworthyQuery(
    query: string
  ): Promise<Registry.SCDMetadataWithIDStructOutput[]> {
    return await ethereumConnector.query(query);
  }

  async easyQuery(
    query: string
  ): Promise<Registry.SCDMetadataWithIDStructOutput[]> {
    let url = localStorage.getItem("externalSearchProvider");
    if (!url) {
      throw new Error("You have to specify an External search provider URL!");
    }

    url = `${url}?onlyId=true&query=${query}`;

    const result = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.status == 404) {
      return [];
    }

    let parsedResult: BigNumberish[] = [];
    try {
      parsedResult = await result.json();
    } catch (error) {
      throw new Error("The result could not be parsed");
    }

    return await Promise.all(
      parsedResult.map(async (id) => await ethereumConnector.retrieveById(id))
    );
  }
}

const queryService = new QueryService();
export { queryService };
