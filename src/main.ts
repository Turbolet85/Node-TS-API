import { App } from './app.js';
import { LoggerService } from './logger/logger.service.js';
import { UserController } from './users/user.controller.js';
import { ExceptionFilter } from './errors/exception.filter.js';
import { Container, ContainerModule, type interfaces } from 'inversify';
import { type ILogger } from './logger/logger.interface.js';
import { TYPES } from './types.js';
import { type IExceptionFilter } from './errors/exception.filter.interface.js';
import 'reflect-metadata';
import { type IUserController } from './users/user.controller.interface.js';
import { IUserService } from './users/user.service.interface.js';
import { UserService } from './users/user.service.js';
import { IConfigService } from './config/config.service.interface.js';
import { ConfigService } from './config/config.service.js';
import { PrismaService } from './database/prisma.service.js';
import { UsersRepository } from './users/users.repository.js';
import { IUsersRepository } from './users/users.repository.interface.js';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();

	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return {
		app,
		appContainer,
	};
}

export const { app, appContainer } = bootstrap();
