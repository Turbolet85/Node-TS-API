import express, { type Express } from 'express'
import { type Server } from 'http'
import { type UserController } from './users/user.controller.js'
import { type ExceptionFilter } from './errors/exception.filter.js'
import { type ILogger } from './logger/logger.interface.js'
import { inject, injectable } from 'inversify'
import { TYPES } from './types.js'
import 'reflect-metadata'

@injectable()
export class App {
  app: Express
  port: number
  server: Server

  constructor (
    @inject(TYPES.ILogger) private readonly logger: ILogger,
    @inject(TYPES.UserController) private readonly userController: UserController,
    @inject(TYPES.ExceptionFilter) private readonly exceptionFilter: ExceptionFilter
  ) {
    this.app = express()
    this.port = 8000
  }

  useRoutes (): void {
    this.app.use('/users', this.userController.router)
  }

  useExceptionFilters (): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
  }

  public async init (): Promise<void> {
    this.useRoutes()
    this.useExceptionFilters()
    this.server = this.app.listen(this.port)
    this.logger.log(`Server is listening on port: ${this.port}`)
  }
}
