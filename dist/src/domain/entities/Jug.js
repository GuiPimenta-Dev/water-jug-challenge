"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Jug {
    constructor(capacity) {
        this.capacity = capacity;
        this.water = 0;
    }
    fill(water) {
        if (this.water + water > this.capacity)
            throw new Error("Not enough capacity");
        this.water += water;
    }
    dumb(water) {
        if (water > this.water)
            throw new Error("Not enough water to dumb");
        this.water -= water;
    }
    isEmpty() {
        return this.water === 0;
    }
    isFull() {
        return this.water === this.capacity;
    }
}
exports.default = Jug;
//# sourceMappingURL=Jug.js.map