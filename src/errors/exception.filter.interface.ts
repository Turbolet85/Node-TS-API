import { type NextFunction, type Request, type Response } from 'express'

export interface IExceptionFilter {
  catch: (err: Error, req: Request, res: Response, next: NextFunction) => void
}
