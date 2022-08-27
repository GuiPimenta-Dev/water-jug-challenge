import Jug from "../src/domain/entities/Jug";
import transfer from "../src/domain/service/Transfer";

test("Should be able to transfer water form a jug to another", () => {
  const x = new Jug(2);
  const y = new Jug(10);
  x.fill(2);
  transfer(x, y, 2);
  expect(x.water).toBe(0);
  expect(y.water).toBe(2);
});
