import SolveRiddle from "../src/usecase/SolveRiddle";

test("it should be able to solve the riddle", () => {
  const riddle = new SolveRiddle(2, 10, 4);
  const result = riddle.execute();
  const expectedResult = [
    {
      x: 2,
      y: 0,
    },
    {
      x: 0,
      y: 2,
    },
    {
      x: 2,
      y: 2,
    },
    {
      x: 0,
      y: 4,
    },
  ];
  expect(result).toEqual(expectedResult);
});

test("it should be throw an error if z is greater than x and y", () => {
  expect(() => new SolveRiddle(1, 2, 5)).toThrow("There is no Solution");
});
