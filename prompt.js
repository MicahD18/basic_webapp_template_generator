import inquirer from "inquirer";

export let appName = {};
export let templateEngine = {};

export default async function promptUser() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "appname",
        message: "Please enter a name for your app:",
      },
      {
        type: "list",
        default: "html",
        name: "engine",
        message: "Please choose a templating engine for your app:",
        choices: [
          { name: "Pug", value: "pug" },
          { name: "Handlebars", value: "handlebars" },
          { name: "EJS", value: "ejs" },
          { name: "Mustache", value: "mustache" },
          { name: "Nunjucks", value: "nunjucks" },
        ],
      },
    ]);

    appName = {
      name: answers.appname,
    };
    templateEngine = {
      name: answers.engine,
    }
  } catch (err) {
    console.log("Something went wrong", err);
  }
}
