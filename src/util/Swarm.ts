import {
  BatchId,
  Bee,
  BeeDebug,
  NumberString,
  PostageBatch,
  Reference,
  REFERENCE_HEX_LENGTH,
  UploadResult,
} from "@ethersphere/bee-js";

export function createBeeApi(): Bee {
  let url = localStorage.getItem("swarm-api");
  if (!url) {
    throw new Error("You have to set the Swarm api url in the settings!");
  }
  return new Bee(url);
}

export function createBeeDebugApi(): BeeDebug {
  let url = localStorage.getItem("swarm-debug");
  if (!url) {
    throw new Error("You have to set the Swarm debug url in the settings!");
  }
  return new BeeDebug(url);
}

export async function getPostageBatch(
  beeDebug: BeeDebug,
  batchId: BatchId
): Promise<PostageBatch> {
  return await beeDebug.getPostageBatch(batchId);
}

export async function getAllPostageBatch(
  beeDebug: BeeDebug
): Promise<PostageBatch[]> {
  return await beeDebug.getAllPostageBatch();
}

export async function createPostageBatch(
  beeDebug: BeeDebug,
  amount: NumberString,
  depth: number
): Promise<BatchId> {
  const postageBatch = await beeDebug.createPostageBatch(amount, depth);
  return postageBatch;
}

export async function uploadString(
  data: string,
  bee: Bee,
  postageBatch: BatchId
): Promise<UploadResult> {
  const result = await bee.uploadData(postageBatch, data);
  return result;
}

export async function uploadFile(
  data: File,
  bee: Bee,
  postageBatch: BatchId
): Promise<UploadResult> {
  const result = await bee.uploadFile(postageBatch, data);
  return result;
}

export interface UploadStatus {
  finished: boolean;
  processed: number;
  synced: number;
}

export async function getUploadStatus(
  tagUid: number,
  bee: Bee
): Promise<UploadStatus> {
  const result = await bee.retrieveTag(tagUid);

  const finished =
    result.processed == result.total && result.synced == result.total;
  const processedPercentage = result.synced / result.total;
  const syncedPercentage = result.synced / result.total;

  return {
    finished: finished,
    processed: processedPercentage,
    synced: syncedPercentage,
  };
}

export function extractReferenceFromUrl(url: string): Reference {
  const reference = url.substring(8, url.length) as Reference;
  if (reference.length != REFERENCE_HEX_LENGTH) {
    throw new Error(
      `The swarm reference is not ${REFERENCE_HEX_LENGTH} symbols long!`
    );
  }
  return reference;
}
