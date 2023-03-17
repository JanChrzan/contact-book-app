import { Response } from "express";

export const handleStatus = (res: Response, code: number, message: string) => {
  res.status(code).send({ message: message });
};
