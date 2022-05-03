import {
  createBeeApi,
  createBeeDebugApi,
  createPostageBatch,
  getUploadStatus,
  uploadFile,
  UploadStatus,
  uploadString,
} from "@/util/Swarm";
import {
  BatchId,
  NumberString,
  PostageBatch,
  Reference,
  UploadResult,
} from "@ethersphere/bee-js";

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

  public async getPostageBatch(batchId: BatchId): Promise<PostageBatch> {
    const beeDebug = createBeeDebugApi();
    return await beeDebug.getPostageBatch(batchId);
  }

  public async getAllPostageBatch(): Promise<PostageBatch[]> {
    const beeDebug = createBeeDebugApi();
    return await beeDebug.getAllPostageBatch();
  }

  public async downloadSCD(reference: Reference): Promise<JSON> {
    const bee = createBeeApi();
    const result = await (await bee.downloadFile(reference)).data.text();
    return JSON.parse(result);
  }

  public async upload(
    data: string | File,
    postageBatch: BatchId
  ): Promise<UploadResult> {
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

  getUploadStatus(tagUid: number): Promise<UploadStatus> {
    const result = getUploadStatus(tagUid, createBeeApi());
    return result;
  }
}

const swarmWizard = new SwarmWizard();
export { swarmWizard };
