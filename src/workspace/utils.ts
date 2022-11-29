import * as vscode from "vscode";

export function getWorkspaceRootPath(): string {
  if (vscode.workspace.workspaceFolders !== undefined) {
    return vscode.workspace.workspaceFolders[0].uri.path;
  }

  throw new Error("Cannot read workspace root path");
}
