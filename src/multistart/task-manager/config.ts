import * as vscode from "vscode";

import { Task } from "./models";
import { ConfigurationReadingError } from "./errors";

export function readFromSettings(): Task[] {
  const conf = vscode.workspace.getConfiguration("multistart");
  const tasks = conf.get<Task[]>("tasks");
  if (!tasks) {
    throw new ConfigurationReadingError("");
  }
  return tasks;
}
