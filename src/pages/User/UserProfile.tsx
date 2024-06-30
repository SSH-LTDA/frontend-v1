import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const UserInfo: React.FC = () => {
	const { user } = useAuth();

	return (
		user && (
			<div className="flex items-center justify-center py-[10vh]">
				<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
					<h2 className="text-2xl font-bold mb-6 text-center">Informações do Usuário</h2>
					<div className="flex justify-center mb-4">
						<img src="https://via.placeholder.com/150" alt="Avatar" className="rounded-full" />
					</div>
					<div className="space-y-4">
						<div>
							<strong>Nome:</strong> {user.name}
						</div>
						<div>
							<strong>CPF:</strong> {user.cpf}
						</div>
						<div>
							<strong>Email:</strong> {user.email}
						</div>
						<div>
							<strong>Telefone:</strong> {user.phone}
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default UserInfo;
