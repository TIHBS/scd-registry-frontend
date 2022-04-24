import { providers, Signer } from "ethers";

export async function connectMetamask(): Promise<Signer> {
  const provider = new providers.Web3Provider(window.ethereum, "any");
  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  return signer;
}

export async function checkIfLoggedIn(): Promise<boolean> {
  const provider = new providers.Web3Provider(window.ethereum, "any");
  const accounts = await provider.listAccounts();
  return accounts.length != 0;
}

export function checkIfMetamaskIsInstalled(): boolean {
  return typeof window.ethereum !== undefined;
}

export function getNetworkById(id: number) {
  switch (id) {
    case 1:
      return "Mainnet";
    case 43:
      return "Kovan";
    case 3:
      return "Ropsten";
    case 4:
      return "Rinkeby";
    case 5:
      return "Goerli";
    case 57771:
      return "http://localhost:8545";
  }
  throw new Error(`Unknown network id ${id}`);
}
