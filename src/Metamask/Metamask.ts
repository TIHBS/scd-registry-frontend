import { ethers, providers, Signer } from "ethers";

export async function connectWallet(window: Window): Promise<Signer> {
  const provider = new providers.Web3Provider((window as any).ethereum, "any");
  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  console.log("Account:", await signer.getAddress());
  return signer;
}

export async function isLoggedIn(signer: Signer): Promise<boolean> {
  return signer && (await signer.getAddress()) != "";
}

export function checkIfMetamaskIsInstalled(window: Window): boolean {
  return typeof (window as any).ethereum !== undefined;
}
