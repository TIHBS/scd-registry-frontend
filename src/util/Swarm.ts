import {
  BatchId,
  Bee,
  BeeDebug,
  NumberString,
  PostageBatch,
  UploadResult,
} from "@ethersphere/bee-js";

export function createBeeApi(): Bee {
  let url = localStorage.getItem("swarm-debug");
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

  while (!(await beeDebug.getPostageBatch(postageBatch)).usable) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
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
