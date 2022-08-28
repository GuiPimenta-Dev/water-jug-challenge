import SolveChallenge from "../src/usecase/SolveChallenge";

test("it should be able to solve the Challenge", () => {
  const Challenge = new SolveChallenge(2, 10, 4);
  const result = Challenge.execute();
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
  expect(() => new SolveChallenge(1, 2, 5)).toThrow("There is no Solution");
});

it("it should thrown an error if Challenge has no resolution", () => {
  expect(() => new SolveChallenge(8, 2, 7)).toThrow("There is no Solution");
});
