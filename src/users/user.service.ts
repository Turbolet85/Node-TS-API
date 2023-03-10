import { IUserService } from './user.service.interface.js';
import { UserRegisterDto } from './dto/user-register.dto.js';
import { UserLoginDto } from './dto/user-login.dto.js';
import { User } from './user.entity.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types.js';
import { IConfigService } from '../config/config.service.interface.js';

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.ConfigService) private readonly configService: IConfigService) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		return null;
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
