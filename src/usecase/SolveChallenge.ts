import Jug from "../entity/Jug";
import greatCommonDivisor from "../utils/Math";

export default class SolveChallenge {
  X: Jug;
  Y: Jug;
  currentStates: States[];
  constructor(xCapacity: number, yCapacity: number, private Z: number) {
    if (Z % greatCommonDivisor(xCapacity, yCapacity) != 0) throw new Error("There is no Solution");
    if (Z > xCapacity && Z > yCapacity) throw new Error("There is no Solution");
    this.X = new Jug(xCapacity, "X");
    this.Y = new Jug(yCapacity, "Y");
    this.currentStates = [];
  }

  execute() {
    this.solve(this.X, this.Y);
    const firstAttempt = this.currentStates;
    this.solve(this.Y, this.X);
    const secondAttempt = this.currentStates;
    if (firstAttempt.length < secondAttempt.length) {
      return firstAttempt.map((s) => ({ X: s.firstJug, Y: s.secondJug, explanation: s.explanation }));
    }
    return secondAttempt.map((s) => ({ X: s.secondJug, Y: s.firstJug, explanation: s.explanation }));
  }

  private solve(firstJug: Jug, secondJug: Jug): void {
    this.reset(firstJug, secondJug);
    firstJug.fullFill();
    this.recordState(firstJug, secondJug, `Fill bucket ${firstJug.name}`);
    while (!this.isSolved(firstJug, secondJug)) {
      const waterToBeTransfered = Math.min(firstJug.water, secondJug.capacity - secondJug.water);
      this.transfer(firstJug, secondJug, waterToBeTransfered);
      if (this.isSolved(firstJug, secondJug)) return;
      this.fullFillFirstJugIfEmpty(firstJug, secondJug);
      this.emptySecondJugIfFull(firstJug, secondJug);
    }
  }

  private reset(firstJug: Jug, secondJug: Jug) {
    firstJug.empty();
    secondJug.empty();
    this.currentStates = [];
  }

  private recordState(firstJug: Jug, secondJug: Jug, explanation: string) {
    this.currentStates.push({ firstJug: firstJug.water, secondJug: secondJug.water, explanation });
  }

  private fullFillFirstJugIfEmpty(firstJug: Jug, secondJug: Jug) {
    if (firstJug.isEmpty()) {
      firstJug.fullFill();
      this.recordState(firstJug, secondJug, `Fill bucket ${firstJug.name}`);
    }
  }

  private emptySecondJugIfFull(firstJug: Jug, secondJug: Jug) {
    if (secondJug.isFull()) {
      secondJug.empty();
      this.recordState(firstJug, secondJug, `Dump bucket ${secondJug.name}`);
    }
  }

  private transfer(from: Jug, to: Jug, water: number) {
    from.dump(water);
    to.fill(water);
    this.recordState(from, to, `Transfer bucket ${from.name} to bucket ${to.name}`);
  }

  private isSolved(firstJug: Jug, secondJug: Jug) {
    return firstJug.water == this.Z || secondJug.water == this.Z;
  }
}

type States = {
  firstJug: number;
  secondJug: number;
  explanation: string;
};
