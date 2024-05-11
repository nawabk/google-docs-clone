import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      let errMessage: string;
      if (e instanceof ZodError) {
        errMessage = e.errors[0].message;
      } else if (e instanceof Error) {
        errMessage = e.message;
      } else {
        errMessage = "Something went wrong";
      }
      res.status(400).json({ message: errMessage });
    }
  };
