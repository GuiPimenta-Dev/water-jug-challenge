import Jug from "../entities/Jug";

export default class SolveRiddle {
  x: Jug;
  y: Jug;

  constructor(xCapacity: number, yCapacity: number, private z: number) {
    if (z > xCapacity && z > yCapacity) throw new Error("There is no Solution");
    this.x = new Jug(xCapacity);
    this.y = new Jug(yCapacity);
  }

  execute() {
    const firstAttempt = this.solve(this.x, this.y);
    const secondAttempt = this.solve(this.y, this.x);
    if (firstAttempt.length < secondAttempt.length) return firstAttempt.map((s) => ({ x: s.firstJug, y: s.secondJug }));
    return secondAttempt.map((s) => ({ x: s.secondJug, y: s.firstJug }));
  }

  private solve(firstJug: Jug, secondJug: Jug) {
    this.emptyJugs(firstJug, secondJug);
    firstJug.fullFill();
    const states = [];
    this.recordState(firstJug, secondJug, states);
    while (!this.isSolved(firstJug, secondJug)) {
      const waterToBeTransfered = Math.min(firstJug.water, secondJug.capacity - secondJug.water);
      this.transfer(firstJug, secondJug, waterToBeTransfered);
      this.recordState(firstJug, secondJug, states);
      if (this.isSolved(firstJug, secondJug)) return states;
      if (firstJug.isEmpty()) {
        firstJug.fullFill();
        this.recordState(firstJug, secondJug, states);
      }
      if (secondJug.isFull()) {
        secondJug.empty();
        this.recordState(firstJug, secondJug, states);
      }
    }
    return states;
  }

  private emptyJugs(firstJug: Jug, secondJug: Jug) {
    firstJug.empty();
    secondJug.empty();
  }

  private recordState(firstJug: Jug, secondJug: Jug, states: States[]) {
    states.push({ firstJug: firstJug.water, secondJug: secondJug.water });
  }

  private transfer(from: Jug, to: Jug, water: number) {
    from.dumb(water);
    to.fill(water);
  }

  private isSolved(firstJug: Jug, secondJug: Jug) {
    return firstJug.water == this.z || secondJug.water == this.z;
  }
}

type States = {
  firstJug: number;
  secondJug: number;
};
