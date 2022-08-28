export default class Jug {
  water: number;
  constructor(readonly capacity: number, readonly name: string = "") {
    this.water = 0;
  }

  fill(water: number) {
    if (this.water + water > this.capacity) throw new Error("Not enough capacity");
    this.water += water;
  }

  dump(water: number) {
    if (water > this.water) throw new Error("Not enough water to dump");
    this.water -= water;
  }

  empty() {
    this.water = 0;
  }

  fullFill() {
    this.water = this.capacity;
  }

  isEmpty() {
    return this.water === 0;
  }

  isFull() {
    return this.water === this.capacity;
  }
}
