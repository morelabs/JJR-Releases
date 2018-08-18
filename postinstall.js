import path from "path";
import fs from "fs";

function copy(filepath, dest) {
  fs.writeFileSync(
    path.join(__dirname, dest),
    fs.readFileSync(path.join(__dirname, filepath))
  );
}

function addEnvFileIfNotExist() {
  // Check if it exists
  try {
    fs.accessSync(path.join(__dirname, ".env"));
    console.log("--> Using existing .env file...");
    return true;
  } catch (e) {
    console.log('--> Creating ".env" file...');
    copy(".env.example", ".env");
    return true;
  }
}

addEnvFileIfNotExist();
