import Jug from "../entity/Jug";
import greatCommonDivisor from "../utils/Math";

export default class SolveChallenge {
  firstJug: Jug;
  secondJug: Jug;
  currentStates: States[];
  constructor(xCapacity: number, yCapacity: number, private Z: number) {
    if (Z % greatCommonDivisor(xCapacity, yCapacity) != 0) throw new Error("There is no Solution");
    if (Z > xCapacity && Z > yCapacity) throw new Error("There is no Solution");
    this.firstJug = new Jug(xCapacity, "X");
    this.secondJug = new Jug(yCapacity, "Y");
    this.currentStates = [];
  }

  execute() {
    this.solve();
    const firstAttempt = this.currentStates;
    this.swapJugs();
    this.reset();
    this.solve();
    const secondAttempt = this.currentStates;
    return firstAttempt.length < secondAttempt.length
      ? this.formatOutput(firstAttempt, ["X", "Y"])
      : this.formatOutput(secondAttempt, ["X", "Y"]);
  }

  private solve(): void {
    this.firstJug.fullFill();
    this.recordState(`Fill bucket ${this.firstJug.name}`);
    while (!this.isSolved()) {
      const availableSpace = this.secondJug.capacity - this.secondJug.water;
      const waterToBeTransfered = Math.min(this.firstJug.water, availableSpace);
      this.transferWater(this.firstJug, this.secondJug, waterToBeTransfered);
      if (this.isSolved()) return;
      this.fullFillFirstJugIfEmpty();
      this.emptySecondJugIfFull();
    }
  }

  private swapJugs() {
    let temp: Jug = this.firstJug;
    this.firstJug = this.secondJug;
    this.secondJug = temp;
  }

  private reset() {
    this.firstJug.empty();
    this.secondJug.empty();
    this.currentStates = [];
  }

  private recordState(explanation: string) {
    this.currentStates.push({ firstJug: this.firstJug.water, secondJug: this.secondJug.water, explanation });
  }

  private fullFillFirstJugIfEmpty() {
    if (this.firstJug.isEmpty()) {
      this.firstJug.fullFill();
      this.recordState(`Fill bucket ${this.firstJug.name}`);
    }
  }

  private emptySecondJugIfFull() {
    if (this.secondJug.isFull()) {
      this.secondJug.empty();
      this.recordState(`Dump bucket ${this.secondJug.name}`);
    }
  }

  private transferWater(from: Jug, to: Jug, water: number) {
    from.dump(water);
    to.fill(water);
    this.recordState(`Transfer bucket ${from.name} to bucket ${to.name}`);
  }

  private isSolved() {
    return this.firstJug.water == this.Z || this.secondJug.water == this.Z;
  }

  private formatOutput(states: States[], labels: [string, string]) {
    return states.map((s) => ({ [labels[0]]: s.firstJug, [labels[1]]: s.secondJug, explanation: s.explanation }));
  }
}

type States = {
  firstJug: number;
  secondJug: number;
  explanation: string;
};
