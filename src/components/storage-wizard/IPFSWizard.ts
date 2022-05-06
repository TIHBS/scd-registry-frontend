import { createPow, Pow } from "@textile/powergate-client";
import { readFileSync } from "fs";

class IPFSWizard {
  public async stage(file: File): Promise<string> {
    const pow = await this.createPowergateClient();
    const buffer = await file.arrayBuffer();

    const { cid } = await pow.data.stage(
      new Uint8Array(await file.arrayBuffer())
    );
    return cid;
  }

  private async createPowergateClient(): Promise<Pow> {
    const url = this.getPowergateUrl();
    const token = await this.getPowergateUserToken();
    return createPow({ host: url, authToken: token });
  }

  private async getPowergateUserToken(): Promise<string> {
    const url = this.getPowergateUrl();
    const powergateKey = `powergate-key-${url}`;
    if (!localStorage.getItem(powergateKey)) {
      const pow = createPow({ host: url! });
      const { user } = await pow.admin.users.create();
      localStorage.setItem(powergateKey, user!.token);
    }
    return localStorage.getItem(powergateKey)!;
  }

  private getPowergateUrl(): string {
    const url = localStorage.getItem("powergate");
    if (!url) {
      throw new Error("You have to set the Powergate url!");
    }
    return url;
  }
}

const ipfsWizard = new IPFSWizard();

export { ipfsWizard };
