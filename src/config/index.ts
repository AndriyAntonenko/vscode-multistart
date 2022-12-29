import * as vscode from "vscode";

import { Config } from "../models";
import { ConfigurationReadingError } from "./errors";

export class ConfigurationReader {
  read(): Config {
    const conf = vscode.workspace.getConfiguration("multistart");
    const tasks = conf.get<Config>("templates");
    if (!tasks) {
      throw new ConfigurationReadingError("");
    }
    return tasks;
  }
}
