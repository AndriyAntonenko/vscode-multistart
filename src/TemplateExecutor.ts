import { Template } from "./models";
import { TermsAggregator } from "./term";

export class TemplateExecutor {
  constructor(private readonly terminalsAggregator: TermsAggregator) {}

  private static instance: TemplateExecutor;

  static async exec(template: Template): Promise<TemplateExecutor> {
    if (!TemplateExecutor.instance) {
      TemplateExecutor.instance = new TemplateExecutor(new TermsAggregator());
    }

    await TemplateExecutor.instance.exec(template);
    return TemplateExecutor.instance;
  }

  async exec(template: Template): Promise<void> {
    await this.terminalsAggregator.killAll();
    this.terminalsAggregator.spawnMany(template.processes);
  }
}
