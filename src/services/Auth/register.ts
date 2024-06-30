import { User } from "../../types/User.ts";
import { request } from "../../helpers/request.ts";

type registerData = {
	name: string;
	cpf: string;
	email: string;
	phone: string;
	password: string;
};

async function register(data: registerData): Promise<User> {
	return request({ method: "POST", url: "auth/register", data });
}

export default register;
