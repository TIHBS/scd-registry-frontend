import { ethers, providers, Signer } from "ethers";

export async function connectMetamask(
  window: Window
): Promise<[Signer, string]> {
  const provider = new providers.Web3Provider((window as any).ethereum, "any");
  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  return [signer, address];
}

export async function checkIfLoggedIn(signer: Signer): Promise<boolean> {
  return (await signer.getAddress()) != "";
}

export function checkIfMetamaskIsInstalled(window: Window): boolean {
  return typeof (window as any).ethereum !== undefined;
}

export function truncateAddress(address: string) {
  return (
    address.substring(0, 5) +
    "..." +
    address.substring(address.length - 4, address.length)
  );
}
