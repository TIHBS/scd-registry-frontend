import { PowergateConnector } from "./bla";

async function main() {
  const powergateConnector = new PowergateConnector();
  await powergateConnector.init();

  await powergateConnector.upload("./test.ts");
}
main().then().catch();
