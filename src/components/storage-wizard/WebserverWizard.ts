import { SCD } from "external/scd-registry-common/src/interfaces/SCD";
import fetch from "node-fetch";

class WebserverWizard {
  async fetchSCD(url: string): Promise<SCD> {
    const result = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    try {
      return await result.json();
    } catch (error) {
      throw error;
    }
  }
}

const webserverWizard = new WebserverWizard();
export { webserverWizard };
