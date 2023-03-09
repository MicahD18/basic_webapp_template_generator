import inquirer from "inquirer";

export let appName = {};

export default async function promptUser() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "appname",
        message: "Please specify a directory name for your app:",
      },
    ]);

    appName = {
      name: answers.appname,
    };
  } catch (err) {
    console.log("Something went wrong", err);
  }
}
