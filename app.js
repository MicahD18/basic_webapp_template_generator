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

    const appFolders = ["models", "views", "controllers", "assets", "styles"];
    const viewFiles = ["index.html", "404.html"];
    const styleFiles = ["index.css", "404.css"];

    fs.mkdir(appPath, { recursive: true }, (err) => {
      if (err) throw err;

      generateAppContent(appPath, appFolders, viewFiles, styleFiles);
    });
  } catch (err) {
    console.log("something went wrong", err);
  }
}

function generateAppContent(appPath, appFolders, viewFiles, styleFiles) {
  appFolders.forEach((folderName) => {
    fs.mkdir(`${appPath}/${folderName}`, { recursive: true }, (err) => {
      if (err) {
        console.error("Error generating app folders", err);
      }
      if (folderName === "views") {
        viewFiles.forEach((file) => {
          fs.writeFileSync(
            `${appPath}/views/${file}`,
            "/* generate html snippet */\ndoc"
          );
        });
      }

      if (folderName === "styles") {
        styleFiles.forEach((file) => {
          fs.writeFileSync(`${appPath}/styles/${file}`, "");
        });
      }

      // write folder file
      fs.writeFileSync(
        `${appPath}/server.js`,
        "// simple express server snippet:\ness"
      );

      console.log(`Folder ${folderName} created successfully`);
    });
  });
}

generateApp();
