export interface Process {
  name: string;
  dirPath?: string;
  instructions?: string[][];
}

export interface Template {
  name: string;
  processes: Process[];
}

export type Config = Template[];
