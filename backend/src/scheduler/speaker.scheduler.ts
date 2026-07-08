export const SPEAKERS = [
  "CEO",
  "CFO",
  "CMO",
  "COO",
  "CRO",
];

export class SpeakerScheduler {
  private index = 0;

  next() {
    const speaker = SPEAKERS[this.index];

    this.index = (this.index + 1) % SPEAKERS.length;

    return speaker;
  }

  reset() {
    this.index = 0;
  }
}