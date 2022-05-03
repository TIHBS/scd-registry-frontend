import {
  createBeeApi,
  createBeeDebugApi,
  createPostageBatch,
  uploadFile,
  uploadString,
} from "@/util/Swarm";
import { BatchId, NumberString, UploadResult } from "@ethersphere/bee-js";

interface BatchID {
  batchID: string;
}

interface Reference {
  reference: string;
}

class SwarmWizard {
  public async createPostageBatch(
    amount: NumberString,
    depth: number
  ): Promise<BatchId> {
    const batchId = await createPostageBatch(
      createBeeDebugApi(),
      amount,
      depth
    );
    return batchId;
  }

  public async upload(data: string | File): Promise<UploadResult> {
    const beeDebug = createBeeDebugApi();
    const postageBatch = await createPostageBatch(beeDebug, "10000000", 20);

    const bee = createBeeApi();

    let result: UploadResult;
    if (typeof data == "string") {
      result = await uploadString(data as string, bee, postageBatch);
    } else if (data instanceof File) {
      result = await uploadFile(data as File, bee, postageBatch);
    } else {
      throw new Error("Data type not supported!");
    }

    return result;
  }
}

const swarmWizard = new SwarmWizard();
export { swarmWizard };
