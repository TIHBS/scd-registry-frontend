import { createPow, Pow, powTypes } from "@textile/powergate-client";
import { Buffer } from "buffer";
import { readFileSync } from "fs";
import { useToast } from "vue-toastification";

class PowergateConnector {
  private pow: Pow | undefined;
  constructor() {}

  async init() {
    this.pow = createPow({ host: "http://localhost:6002" });
    const token = await this.createUser();
    this.pow.setToken(token);
  }

  async fetchBuildInfo(): Promise<string> {
    this.checkIfInitialized();
    const res = await this.pow!.buildInfo();
    return JSON.stringify(res);
  }

  async fetchWalletAddress(): Promise<string[]> {
    this.checkIfInitialized();
    const result = await this.pow!.wallet.addresses();
    console.log(result);
    return result.addressesList.map((item) => item.address);
  }

  async createUser(): Promise<string> {
    this.checkIfInitialized();
    const { user } = await this.pow!.admin.users.create();
    return user ? user.token : "";
  }

  async upload(file: File) {
    this.checkIfInitialized();
    const toast = useToast();
    const buffer = new Uint8Array(Buffer.from(await file.arrayBuffer()));

    const { cid } = await this.pow!.data.stage(buffer);

    // store the data using the default storage configuration
    const { jobId } = await this.pow!.storageConfig.apply(cid);

    // watch the job status to see the storage process progressing
    const jobsCancel = this.pow!.storageJobs.watch((job) => {
      if (job.status === powTypes.JobStatus.JOB_STATUS_CANCELED) {
        toast.warning("job canceled");
      } else if (job.status === powTypes.JobStatus.JOB_STATUS_FAILED) {
        toast.error("job failed");
      } else if (job.status === powTypes.JobStatus.JOB_STATUS_SUCCESS) {
        toast.success("job success!");
      }
    }, jobId);

    // watch all log events for a cid
    const logsCancel = this.pow!.data.watchLogs((logEvent) => {
      toast.info(`received event for cid ${logEvent.cid}`);
    }, cid);
  }

  private checkIfInitialized() {
    if (!this.pow) {
      throw new Error("Powergate was not initialized!");
    }
  }
}
const powergateConnector = new PowergateConnector();
powergateConnector.init();

export { powergateConnector };
