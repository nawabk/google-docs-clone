import { Request, Response, NextFunction } from "express";

type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

const catchAsync = (fn: MiddlewareFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((e) => next(e));
  };
};

export default catchAsync;
