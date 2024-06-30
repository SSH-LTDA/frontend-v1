import { request } from "../../helpers/request.ts";
import { User } from "../../types/User.ts";

type loginData = {
	email: string;
	password: string;
};

async function login(data: loginData): Promise<User> {
	return request({ method: "POST", url: "auth/login", data });
}

export default login;
