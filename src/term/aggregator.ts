import { Term } from "./term";

export class TermsAggregator {
  terms: Term[];

  constructor() {
    this.terms = [];
  }

  static create(): TermsAggregator {
    return new TermsAggregator();
  }

  spawn(
    name: string,
    commands: string[][],
    location?: string
  ): TermsAggregator {
    const newTerm = Term.spawn(name, location).cmdMany(commands);
    this.terms.push(newTerm);
    return this;
  }

  async killAll(): Promise<void> {
    await Promise.all(this.terms.map((t) => t.kill()));
  }
}
