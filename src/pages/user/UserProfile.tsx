import React from 'react';

const UserInfo: React.FC = () => {
  const storedData = JSON.parse(localStorage.getItem('userData') || '{}');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Informações do Usuário</h2>
        <div className="flex justify-center mb-4">
          <img 
            src="https://via.placeholder.com/150" 
            alt="Avatar"
            className="rounded-full"
          />
        </div>
        <div className="space-y-4">
          <div>
            <strong>Nome:</strong> {storedData.name}
          </div>
          <div>
            <strong>CPF:</strong> {storedData.cpf}
          </div>
          <div>
            <strong>Email:</strong> {storedData.email}
          </div>
          <div>
            <strong>Telefone:</strong> {storedData.phone}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
