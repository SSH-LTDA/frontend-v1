export enum UserRole {
  Client = "Client",
  Employee = "Employee",
}

export interface User {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  role: UserRole;
  password: string;
}
