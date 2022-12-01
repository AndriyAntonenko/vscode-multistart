import * as vscode from "vscode";

import { MultistartCommand } from "./multistart";

const multistartCmd = MultistartCommand.init();

export function activate(context: vscode.ExtensionContext) {
  multistartCmd.registerHandler(context);
}

// This method is called when your extension is deactivated
export function deactivate() {
  multistartCmd.clear();
}
