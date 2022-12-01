import * as vscode from "vscode";

export interface Command {
  name: string;
  registerHandler: (context: vscode.ExtensionContext) => void;
  clear: () => void;
}
