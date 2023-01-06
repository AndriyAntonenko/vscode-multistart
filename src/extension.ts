import * as vscode from "vscode";

import { ConfigurationReader } from "./config";
import {
  TemplatesTreeViewDataProvider,
  TemplatesTreeItem,
} from "./TemplatesTreeViewDataProvider";
import { TemplateExecutor } from "./TemplateExecutor";

export function activate(context: vscode.ExtensionContext) {
  const configReader = new ConfigurationReader();
  const templateViewDataProvider = new TemplatesTreeViewDataProvider(
    configReader
  );

  vscode.window.registerTreeDataProvider(
    "multistart.templatesExplorer",
    templateViewDataProvider
  );

  vscode.commands.registerCommand("multistart.templatesExplorer.refresh", () =>
    templateViewDataProvider.refresh()
  );

  vscode.commands.registerCommand(
    "multistart.templatesExplorer.runTemplate",
    (template: TemplatesTreeItem) => {
      vscode.window.showInformationMessage(
        `Starting template ${template.name}`
      );

      TemplateExecutor.exec(template).catch((err) => {
        vscode.window.showErrorMessage(
          `Template execution error: ${template.name}`
        );
      });
    }
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
