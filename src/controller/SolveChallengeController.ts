import SolveChallenge from "../usecase/SolveChallenge";

export default class SolveChallengeController {
  static solveChallenge(input: InputDTO): any {
    const { body } = input;
    if (!body.x || !body.y || !body.z) throw new Error("Missing required parameters");
    const challenge = new SolveChallenge(body.x, body.y, body.z);
    return challenge.execute();
  }
}

type InputDTO = {
  query: any;
  body: any;
  headers: any;
  path: any;
};
