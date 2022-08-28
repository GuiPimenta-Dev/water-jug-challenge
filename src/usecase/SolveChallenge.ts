import Jug from "../entity/Jug";
import greatCommonDivisor from "../utils/Math";

export default class SolveChallenge {
  X: Jug;
  Y: Jug;

  constructor(xCapacity: number, yCapacity: number, private Z: number) {
    if (Z % greatCommonDivisor(xCapacity, yCapacity) != 0) throw new Error("There is no Solution");
    if (Z > xCapacity && Z > yCapacity) throw new Error("There is no Solution");
    this.X = new Jug(xCapacity, "X");
    this.Y = new Jug(yCapacity, "Y");
  }

  execute() {
    const firstAttempt = this.solve(this.X, this.Y);
    const secondAttempt = this.solve(this.Y, this.X);
    if (firstAttempt.length < secondAttempt.length) {
      return firstAttempt.map((s) => ({ X: s.firstJug, Y: s.secondJug, explanation: s.explanation }));
    }
    return secondAttempt.map((s) => ({ X: s.secondJug, Y: s.firstJug, explanation: s.explanation }));
  }

  private solve(firstJug: Jug, secondJug: Jug) {
    this.emptyJugs(firstJug, secondJug);
    firstJug.fullFill();
    const states = [];
    this.recordState(firstJug, secondJug, `Fill bucket ${firstJug.name}`, states);
    while (!this.isSolved(firstJug, secondJug)) {
      const waterToBeTransfered = Math.min(firstJug.water, secondJug.capacity - secondJug.water);
      this.transfer(firstJug, secondJug, waterToBeTransfered);
      this.recordState(firstJug, secondJug, `Transfer bucket ${firstJug.name} to bucket ${secondJug.name}`, states);
      if (this.isSolved(firstJug, secondJug)) return states;
      if (firstJug.isEmpty()) {
        firstJug.fullFill();
        this.recordState(firstJug, secondJug, `Fill bucket ${firstJug.name}`, states);
      }
      if (secondJug.isFull()) {
        secondJug.empty();
        this.recordState(firstJug, secondJug, `Dump bucket ${secondJug.name}`, states);
      }
    }
    return states;
  }

  private emptyJugs(firstJug: Jug, secondJug: Jug) {
    firstJug.empty();
    secondJug.empty();
  }

  private recordState(firstJug: Jug, secondJug: Jug, explanation: string, states: States[]) {
    states.push({ firstJug: firstJug.water, secondJug: secondJug.water, explanation });
  }

  private transfer(from: Jug, to: Jug, water: number) {
    from.dump(water);
    to.fill(water);
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
