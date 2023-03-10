import { type NextFunction, type Request, type Response, type Router } from 'express';
import { IMiddleware } from './middleware.interface.js';

export interface IControllerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
	middlewares?: IMiddleware[];
}
