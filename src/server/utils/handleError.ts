import { Response } from "express";

export const handleError = (res: Response, code: number, err: any) => {
  res.status(code).send({ error: err.message });
};
