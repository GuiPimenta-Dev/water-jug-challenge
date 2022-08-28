import Jug from "../entity/Jug";
import greatCommonDivisor from "../utils/Math";

export default class SolveChallenge {
  x: Jug;
  y: Jug;

  constructor(xCapacity: number, yCapacity: number, private z: number) {
    if (z % greatCommonDivisor(xCapacity, yCapacity) != 0) throw new Error("There is no Solution");
    if (z > xCapacity && z > yCapacity) throw new Error("There is no Solution");
    this.x = new Jug(xCapacity, "X");
    this.y = new Jug(yCapacity, "Y");
  }

  execute() {
    const firstAttempt = this.solve(this.x, this.y);
    const secondAttempt = this.solve(this.y, this.x);
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
    return firstJug.water == this.z || secondJug.water == this.z;
  }
}

type States = {
  firstJug: number;
  secondJug: number;
  explanation: string;
};
