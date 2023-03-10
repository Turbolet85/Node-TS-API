import pkg from 'bcryptjs';
const { hash } = pkg;

export class User {
	constructor(private readonly _email: string, private readonly _name: string) {}

	private _password: string;

	get password(): string {
		return this._password;
	}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	public async setPassword(pass: string): Promise<void> {
		this._password = await hash(pass, 10);
	}
}
