import { BaseController } from '../common/base.controller.js'
import { type NextFunction, type Request, type Response } from 'express'
import { HTTPError } from '../errors/http-error.class.js'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types.js'
import { ILogger } from '../logger/logger.interface.js'
import 'reflect-metadata'
import { type IUserController } from './user.controller.interface'

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor (
    @inject(TYPES.ILogger) private readonly loggerService: ILogger
  ) {
    super(loggerService)
    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        func: this.register
      },
      {
        path: '/login',
        method: 'post',
        func: this.login
      }
    ])
  }

  login (req: Request, res: Response, next: NextFunction): void {
    next(new HTTPError(401, 'Authorisation error', 'login'))
  }

  register (req: Request, res: Response, next: NextFunction): void {
    this.ok(res, 'register')
  }
}
