import express, { type Express } from 'express'
import { userRouter } from './users/users.js'
import { type Server } from 'http'

export class App {
  app: Express
  port: number
  server: Server

  constructor () {
    this.app = express()
    this.port = 8000
  }

  useRoutes (): void {
    this.app.use('/users', userRouter)
  }

  public async init (): Promise<void> {
    this.useRoutes()
    this.server = this.app.listen(this.port)
    console.log(`Server is listening on port: ${this.port}`)
  }
}
