import React from "react";

const UserInfo: React.FC = () => {
	const userData = JSON.parse(localStorage.getItem("userData") || "{}");

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
				<h2 className="text-2xl font-bold mb-6">Informações do Usuário</h2>
				<img src="https://via.placeholder.com/150" alt="Avatar" className="w-24 h-24 mx-auto rounded-full mb-4" />
				<div className="text-left">
					<p>
						<strong>Nome:</strong> {userData.name}
					</p>
					<p>
						<strong>CPF:</strong> {userData.cpf}
					</p>
					<p>
						<strong>Email:</strong> {userData.email}
					</p>
					<p>
						<strong>Telefone:</strong> {userData.phone}
					</p>
				</div>
			</div>
		</div>
	);
};

export default UserInfo;
