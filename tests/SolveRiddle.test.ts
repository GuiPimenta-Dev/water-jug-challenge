import SolveChallenge from "../src/usecase/SolveChallenge";

test("it should be able to solve the Challenge", () => {
  const Challenge = new SolveChallenge(2, 10, 4);
  const result = Challenge.execute();
  const expectedResult = [
    {
      X: 2,
      Y: 0,
      explanation: "Fill bucket X",
    },
    {
      X: 0,
      Y: 2,
      explanation: "Transfer bucket X to bucket Y",
    },
    {
      X: 2,
      Y: 2,
      explanation: "Fill bucket X",
    },
    {
      X: 0,
      Y: 4,
      explanation: "Transfer bucket X to bucket Y",
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
