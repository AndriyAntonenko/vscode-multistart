import { Command } from "../commands";
import * as vscode from "vscode";

import { getTasks } from "./task-manager";
import { TermsAggregator } from "../term";

export class MultistartCommand implements Command {
  name: string = "multistart.run";

  constructor(private readonly termsAggregator: TermsAggregator) {}

  static init(): MultistartCommand {
    return new MultistartCommand(TermsAggregator.create());
  }

  registerHandler(context: vscode.ExtensionContext): void {
    const disposable = vscode.commands.registerCommand(this.name, () => {
      this.clear();
      vscode.window.showInformationMessage("Starting multiple processes");
      const tasks = getTasks();
      tasks.forEach((task) => {
        this.termsAggregator.spawn(
          task.name,
          task.commands ?? [],
          task.location
        );
      });
    });
    context.subscriptions.push(disposable);
  }

  clear(): void {
    this.termsAggregator
      .killAll()
      .catch((err) =>
        vscode.window.showErrorMessage(
          "Cannot clear all terminals due error:",
          err
        )
      );
  }
}
