import * as vscode from "vscode";

import { ConfigurationReader } from "./config";
import {
  TemplatesTreeViewDataProvider,
  TemplatesTreeItem,
} from "./TemplatesTreeViewDataProvider";

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

  // @TODO: run template correctly
  vscode.commands.registerCommand(
    "multistart.templatesExplorer.runTemplate",
    (template: TemplatesTreeItem) => {
      vscode.window.showInformationMessage(`Start template ${template.name}`);
    }
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
