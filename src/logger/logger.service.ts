import { type ILogObj, type ISettingsParam, Logger } from 'tslog'
import { type ILogger } from './logger.interface.js'
import { injectable } from 'inversify'
import 'reflect-metadata'

@injectable()
export class LoggerService implements ILogger {
  public logger: Logger<ILogObj>
  private readonly loggerSettings = {
    displayFilePath: 'hidden',
    displayFunctionName: false,
    displayInstanceName: false,
    displayLoggerName: false
  }

  constructor () {
    this.logger = new Logger(this.loggerSettings as ISettingsParam<ILogObj>)
  }

  log (...args: unknown[]): void {
    this.logger.info(...args)
  }

  error (...args: unknown[]): void {
    this.logger.error(...args)
  }

  warn (...args: unknown[]): void {
    this.logger.warn(...args)
  }
}
