import express, { type Express } from 'express';
import { type Server } from 'http';
import { type ILogger } from './logger/logger.interface.js';
import { inject, injectable } from 'inversify';
import { TYPES } from './types.js';
import 'reflect-metadata';
import pkg from 'body-parser';
import { IConfigService } from './config/config.service.interface.js';
import { IExceptionFilter } from './errors/exception.filter.interface.js';
import { UserController } from './users/user.controller.js';
import { PrismaService } from './database/prisma.service.js';
import { AuthMiddleware } from './common/auth.middleware.js';
const { json } = pkg;

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;

	constructor(
		@inject(TYPES.ILogger) private readonly logger: ILogger,
		@inject(TYPES.UserController) private readonly userController: UserController,
		@inject(TYPES.ExceptionFilter) private readonly exceptionFilter: IExceptionFilter,
		@inject(TYPES.ConfigService) private readonly configService: IConfigService,
		@inject(TYPES.PrismaService) private readonly prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8001;
	}

	useMiddleware(): void {
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server is listening on port: ${this.port}`);
	}
}
