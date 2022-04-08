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

export function truncateAddress(address: string) {
  return (
    address.substring(0, 5) +
    "..." +
    address.substring(address.length - 4, address.length)
  );
}
