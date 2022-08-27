export default class Jug {
  water: number;
  constructor(readonly capacity: number) {
    this.water = 0;
  }

  fill(water: number) {
    if (this.water + water > this.capacity) throw new Error("Not enough capacity");
    this.water += water;
  }

  dumb(water: number) {
    if (water > this.water) throw new Error("Not enough water to dumb");
    this.water -= water;
  }

  isEmpty() {
    return this.water === 0;
  }

  isFull() {
    return this.water === this.capacity;
  }
}
