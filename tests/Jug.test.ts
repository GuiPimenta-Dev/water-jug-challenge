import Jug from "../src/entity/Jug";

test("Should be able to create a Jug", () => {
  const jug = new Jug(10);
  expect(jug.capacity).toBe(10);
  expect(jug.water).toBe(0);
});

test("It should be able to fill a jug with water", () => {
  const jug = new Jug(10);
  jug.fill(10);
  expect(jug.water).toBe(10);
});

test("It should be able to throw an error if tries to fill above capacity", () => {
  const jug = new Jug(10);
  expect(() => jug.fill(12)).toThrowError("Not enough capacity");
});

test("It should be able to dumb water from a jug", () => {
  const jug = new Jug(10);
  jug.fill(10);
  jug.dump(10);
  expect(jug.water).toBe(0);
});

test("It should throw an error when trying to dumb more water than it has", () => {
  const jug = new Jug(10);
  expect(() => jug.dump(12)).toThrowError("Not enough water to dumb");
});

test("It should be able to check if a jug is empty", () => {
  const jug = new Jug(10);
  expect(jug.isEmpty()).toBe(true);
  jug.fill(10);
  expect(jug.isEmpty()).toBe(false);
});

test("It should be able to check if a jug is full", () => {
  const jug = new Jug(10);
  expect(jug.isFull()).toBe(false);
  jug.fill(10);
  expect(jug.isFull()).toBe(true);
});
