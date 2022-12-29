import * as vscode from "vscode";

import { ConfigurationReader } from "./config";
import { Template, Process } from "./models";

export class TemplatesTreeViewDataProvider
  implements
    vscode.TreeDataProvider<
      TemplatesTreeItem | ProcessTreeItem | InstructionTreeItem
    >
{
  get templates(): Template[] {
    return this.configReader.read();
  }

  constructor(private readonly configReader: ConfigurationReader) {}

  getTreeItem(
    element: TemplatesTreeItem | ProcessTreeItem | InstructionTreeItem
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(
    element?:
      | TemplatesTreeItem
      | ProcessTreeItem
      | InstructionTreeItem
      | undefined
  ): vscode.ProviderResult<
    (TemplatesTreeItem | ProcessTreeItem | InstructionTreeItem)[]
  > {
    if (!element) {
      return this.templates.map(this.buildTemplateTreeItem);
    }

    if (element instanceof TemplatesTreeItem) {
      return element.processes.map(this.buildProcessTreeItem);
    }

    if (element instanceof ProcessTreeItem) {
      return element.instructions?.map(this.buildInstructionTreeItem);
    }

    return [];
  }

  private buildTemplateTreeItem(taskBatch: Template): TemplatesTreeItem {
    return new TemplatesTreeItem(
      taskBatch.name,
      taskBatch.processes,
      vscode.TreeItemCollapsibleState.Collapsed
    );
  }

  private buildProcessTreeItem(p: Process): ProcessTreeItem {
    return new ProcessTreeItem(
      p.name,
      vscode.TreeItemCollapsibleState.Collapsed,
      p.dirPath,
      p.instructions
    );
  }

  private buildInstructionTreeItem(
    instructions: string[]
  ): InstructionTreeItem {
    return new InstructionTreeItem(
      instructions.join(" "),
      vscode.TreeItemCollapsibleState.None
    );
  }

  private _onDidChangeTreeData: vscode.EventEmitter<
    | TemplatesTreeItem
    | ProcessTreeItem
    | InstructionTreeItem
    | undefined
    | null
    | void
  > = new vscode.EventEmitter<
    | TemplatesTreeItem
    | ProcessTreeItem
    | InstructionTreeItem
    | undefined
    | null
    | void
  >();
  readonly onDidChangeTreeData: vscode.Event<
    | TemplatesTreeItem
    | ProcessTreeItem
    | InstructionTreeItem
    | undefined
    | null
    | void
  > = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}

export class TemplatesTreeItem extends vscode.TreeItem {
  constructor(
    public readonly name: string,
    public readonly processes: Process[],
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(`Template: ${name}`, collapsibleState);
    this.contextValue = "template";
  }
}

export class ProcessTreeItem extends vscode.TreeItem {
  constructor(
    public readonly name: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly dirPath?: string,
    public readonly instructions?: string[][]
  ) {
    super(`Process: ${name}`, collapsibleState);
    this.description = this.dirPath;
  }
}

export class InstructionTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
  }
}
