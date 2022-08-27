"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Jug_1 = __importDefault(require("../src/domain/entities/Jug"));
const Transfer_1 = __importDefault(require("../src/domain/service/Transfer"));
test("Should be able to create a Jug", () => {
    const x = new Jug_1.default(2);
    const y = new Jug_1.default(10);
    x.fill(2);
    (0, Transfer_1.default)(x, y, 2);
    expect(x.water).toBe(0);
    expect(y.water).toBe(2);
});
//# sourceMappingURL=Transfer.test.js.map