import { type NextFunction, type Request, type Response } from 'express';

export interface IUserController {
	login: (req: Request, res: Response, next: NextFunction) => void;

	register: (req: Request, res: Response, next: NextFunction) => void;

	info: (req: Request, res: Response, next: NextFunction) => void;
}
