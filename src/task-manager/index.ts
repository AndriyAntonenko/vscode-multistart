import { Task } from "./models";
import { readTasksConfig } from "./config";

export function getTasks(): Promise<Task[]> {
  return readTasksConfig();
}

export * from "./models";
