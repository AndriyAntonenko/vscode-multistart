import * as vscode from "vscode";

export class Term {
  private _term: vscode.Terminal;
  constructor(name: string) {
    this._term = vscode.window.createTerminal(name);
  }

  static spawn(name: string, location?: string) {
    const term = new Term(name);
    if (location) {
      term.changeLocation(location).clear();
    }
    return term;
  }

  get name(): string {
    return this._term.name;
  }

  getProcessId(): Promise<number | undefined> {
    return new Promise((resolve, reject) => {
      this._term.processId.then(
        (id) => resolve(id),
        (reason) => reject(new Error(reason))
      );
    });
  }

  changeLocation(location: string): Term {
    this._term.sendText(`cd ${location}`);
    return this;
  }

  clear(): Term {
    this._term.sendText("clear");
    return this;
  }

  async kill(): Promise<void> {
    const pid = await this.getProcessId();
    if (pid) {
      process.kill(pid, 0);
    }
    this._term.dispose();
  }

  cmdMany(commands: string[][]): Term {
    commands.forEach((command) => this.cmd(command));
    return this;
  }

  cmd(command: string[]): Term {
    this._term.sendText(command.join(" "));
    return this;
  }
}
