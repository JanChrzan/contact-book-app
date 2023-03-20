import { Request, Response } from "express";
import {
  ContactNotFoundError,
  InvalidCredentialsError,
  InvalidDataError,
  InvalidUserIdError,
  UnauthorizedError,
  UserAlreadyExistsError,
  UserNotFoundError,
} from "./Errors.js";

type ErrorTypes = Record<
  string,
  | typeof InvalidDataError
  | typeof InvalidCredentialsError
  | typeof UserAlreadyExistsError
  | typeof InvalidUserIdError
  | typeof UnauthorizedError
  | typeof UserNotFoundError
  | typeof ContactNotFoundError
>;

export const createRouteHandler =
  <T>(serviceMethod: (req: Request, res: Response) => Promise<T>) =>
  async (req: Request, res: Response) => {
    try {
      await serviceMethod(req, res);
    } catch (err: any) {
      const errorTypes: ErrorTypes = {
        InvalidDataError,
        InvalidCredentialsError,
        UserAlreadyExistsError,
        InvalidUserIdError,
        UnauthorizedError,
        UserNotFoundError,
        ContactNotFoundError,
      };
      const errorType = Object.keys(errorTypes).find(
        (key) => err instanceof errorTypes[key]
      );
      const errorMessage = errorType ? err.message : "Server error.";
      const statusCode = errorType ? err.status : 500;

      res.status(statusCode).json({ message: errorMessage });
    }
  };
