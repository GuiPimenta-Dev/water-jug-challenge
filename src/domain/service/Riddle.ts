import Jug from "../entities/Jug";

export default class Riddle {
  states = [];
  constructor(private x: Jug, private y: Jug, private z: number) {}

  findSolution() {
    const firstAttempt = this.solve(this.x, this.y);
    const secondAttempt = this.solve(this.y, this.x);
  }

  private solve(a: Jug, b: Jug) {
    a.fill(a.capacity);
    this.recordState(a, b);
    while (!this.isSolved(a, b)) {
      const waterToBeTransfered = Math.min(a.water, b.capacity - b.water);
      this.transfer(a, b, waterToBeTransfered);
      this.recordState(a, b);
      if (this.isSolved(a, b)) return this.states;
    }
  }

  private recordState(a: Jug, b: Jug) {
    this.states.push({ a: a.water, b: b.water });
  }

  private transfer(from: Jug, to: Jug, water: number) {
    from.dumb(water);
    to.fill(water);
  }

  private isSolved(firstJug: Jug, secondJug: Jug) {
    return firstJug.water == this.z || secondJug.water == this.z;
  }
}
