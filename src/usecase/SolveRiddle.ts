import Jug from "../domain/entities/Jug";
import isSolved from "../domain/service/Riddle";
export default class SolveRiddle {
  x: Jug;
  y: Jug;

  constructor(xCapacity: number, yCapacity: number, private z: number) {
    if (z > xCapacity || z > yCapacity) throw new Error("There is no Solution");
    this.x = new Jug(xCapacity);
    this.y = new Jug(yCapacity);
  }

  execute() {
    let water: number;
    while (!isSolved(this.x, this.y, this.z)) {}
  }
}
