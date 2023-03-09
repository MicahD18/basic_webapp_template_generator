import fs, { existsSync } from "fs";
import path from "path";
import promptUser, { appName } from "./prompt.js";

const __dirname = path.resolve();

async function generateApp() {
  try {
    await promptUser();

    if (existsSync(appName.name)) {
      console.log("Path already exists");
      return;
    }

    console.log(appName.name);
    console.log(__dirname);

    const appPath = path.join(__dirname, appName.name);

    const appFolders = [
      "server",
      "models",
      "views",
      "controllers",
      "assets",
      "styles",
    ];

    fs.mkdir(appPath, { recursive: true }, (err) => {
      if (err) throw err;
      appFolders.forEach((folderName) => {
        fs.mkdir(`${appPath}/${folderName}`, { recursive: true }, (err) => {
          if (err) {
            console.error("Error generating app folders", err);
          }
          console.log(`Folder ${folderName} created successfully`);
        });
      });
    });
  } catch (err) {
    console.log("something went wrong", err);
  }
}

generateApp();
