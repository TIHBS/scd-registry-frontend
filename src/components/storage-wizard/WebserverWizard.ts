import fetch from "node-fetch";

class WebserverWizard {
  async fetchSCD(url: string): Promise<JSON | null> {
    const result = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    try {
      return await result.json();
    } catch (error) {
      return null;
    }
  }
}

const webserverWizard = new WebserverWizard();
export { webserverWizard };
