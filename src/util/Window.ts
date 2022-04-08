/* eslint @typescript-eslint/no-explicit-any: "off"
--------
Otherwise the interface gets to complicated */

declare global {
  interface Window {
    ethereum: any;
  }
}
export {};
