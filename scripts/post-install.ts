import * as ProjectRootDir from "app-root-dir";
import { join } from "path";
import { execSync } from "child_process";

async function main() {
  process.chdir(
    join(ProjectRootDir.get(), "external/decentralised-scd-registry")
  );
  let result = execSync(`npm i`);
  console.log(result.toString());
  result = execSync(`npm run compile`);
  console.log(result.toString());
}

main()
  .then(() => console.log("Finished!"))
  .catch((err) => console.log(err));
