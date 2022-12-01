import { Task } from "./models";
import { readFromSettings } from "./config";

export function getTasks(): Task[] {
  return readFromSettings();
}

export * from "./models";
