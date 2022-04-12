import { createPow, Pow, powTypes } from "@textile/powergate-client";
import { readFileSync } from "fs";

export class PowergateConnector {
  private pow: Pow | undefined;
  constructor() {}

  async init() {
    this.pow = createPow({ host: "http://0.0.0.0:6002" });
    const token = await this.createUser();
    this.pow.setToken(token);
  }

  async createUser(): Promise<string> {
    this.checkIfInitialized();
    const { user } = await this.pow!.admin.users.create();
    return user ? user.token : "";
  }

  async upload(path: string) {
    this.checkIfInitialized();

    const file = readFileSync(path);
    const { cid } = await this.pow!.data.stage(file);

    // store the data using the default storage configuration
    const { jobId } = await this.pow!.storageConfig.apply(cid);

    // watch the job status to see the storage process progressing
    const jobsCancel = this.pow!.storageJobs.watch((job) => {
      if (job.status === powTypes.JobStatus.JOB_STATUS_CANCELED) {
        console.warn("job canceled");
      } else if (job.status === powTypes.JobStatus.JOB_STATUS_FAILED) {
        console.error("job failed");
      } else if (job.status === powTypes.JobStatus.JOB_STATUS_SUCCESS) {
        console.log("job success!");
      }
    }, jobId);

    // watch all log events for a cid
    const logsCancel = this.pow!.data.watchLogs((logEvent) => {
      console.info(`received event for cid ${logEvent.cid}`);
    }, cid);
  }

  private checkIfInitialized() {
    if (!this.pow) {
      throw new Error("Powergate was not initialized!");
    }
  }
}
