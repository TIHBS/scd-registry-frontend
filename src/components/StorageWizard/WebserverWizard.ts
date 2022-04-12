import fetch from "node-fetch";

class WebserverWizard {
  async fetchSCD(url: string): Promise<JSON> {
    const result = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const asJson = result.json();
    return asJson;
  }
}

const webserverWizard = new WebserverWizard();
export { webserverWizard };
