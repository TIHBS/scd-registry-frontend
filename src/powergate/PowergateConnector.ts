import { createPow, Pow } from "@textile/powergate-client";
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

  private checkIfInitialized() {
    if (!this.pow) {
      throw new Error("Powergate was not initialized!");
    }
  }
}
const powergateConnector = new PowergateConnector();
powergateConnector.init();

export { powergateConnector };
