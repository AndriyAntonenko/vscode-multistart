import * as vscode from "vscode";

import { getTasks } from "./task-manager";
import { Term } from "./term";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "multistart" is now active!');

  const disposable = vscode.commands.registerCommand("multistart.run", () => {
    vscode.window.showInformationMessage("Starting multiple processes");

    getTasks()
      .then((tasks) => {
        tasks.forEach((task) => {
          Term.spawn(task.name, task.location).cmdMany(task.commands ?? []);
        });
      })
      .catch((err) => vscode.window.showErrorMessage(err.message));
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
