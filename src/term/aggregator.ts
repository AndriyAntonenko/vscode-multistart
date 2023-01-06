import { Term } from "./term";
import { Process } from "../models";

export class TermsAggregator {
  terms: Term[];

  constructor() {
    this.terms = [];
  }

  static create(): TermsAggregator {
    return new TermsAggregator();
  }

  spawnMany(processes: Process[]): TermsAggregator {
    processes.forEach((p) => {
      this.spawn(p);
    });
    return this;
  }

  spawn({ name, dirPath, instructions }: Process): TermsAggregator {
    const newTerm = Term.spawn(name, dirPath).cmdMany(instructions ?? []);
    this.terms.push(newTerm);
    return this;
  }

  async killAll(): Promise<void> {
    await Promise.all(this.terms.map((t) => t.kill()));
    this.terms = [];
  }
}
