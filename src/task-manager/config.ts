import * as vscode from "vscode";
import * as path from "path";

import { Task } from "./models";
import { TASK_CONFIG_FILE } from "./constants";
import { getWorkspaceRootPath } from "../workspace";

export function readTasksConfig(): Promise<Task[]> {
  return new Promise((resolve, reject) => {
    const wr = getWorkspaceRootPath();
    vscode.workspace.openTextDocument(path.join(wr, TASK_CONFIG_FILE)).then(
      (doc) => resolve(parse(doc.getText())),
      (reason) => reject(explain(reason))
    );
  });
}

function parse(json: string): Task[] {
  const obj: Task[] = JSON.parse(json);
  return obj;
}

function explain(reason: any): Error {
  if (reason instanceof Error) {
    return reason;
  }
  return new Error(
    `Cannot read tasks config(${TASK_CONFIG_FILE}). Reason: ${reason}`
  );
}
