import express from "express";

export default class ExpressAdapter {
  static create() {
    const app = express();
    app.use(express.json());
    return app;
  }

  static route(fn: any) {
    return async function (req: any, res: any) {
      try {
        const { query, body, headers, params } = req;
        const output = fn({ query, body, headers, path: params });
        res.status(200).json(output);
      } catch (e: any) {
        res.status(400).json({ message: e.message });
      }
    };
  }
}
