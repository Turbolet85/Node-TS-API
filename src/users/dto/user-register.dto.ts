import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Not correct email' })
	email: string;

	@IsString({ message: 'Please enter name' })
	name: string;

	@IsString({ message: 'Please enter password' })
	password: string;
}
