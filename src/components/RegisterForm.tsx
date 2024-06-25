// RegisterForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';

const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().min(14, "CPF inválido").max(14, "CPF inválido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(14, "Telefone inválido").max(15, "Telefone inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres")
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = (data: RegisterFormData) => {
    localStorage.setItem('userData', JSON.stringify(data));
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Nome</label>
            <input
              type="text"
              {...register('name')}
              className="w-full p-2 border rounded"
              placeholder="Digite seu nome"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">CPF</label>
            <InputMask
              mask="999.999.999-99"
              {...register('cpf')}
              className="w-full p-2 border rounded"
              placeholder="Digite seu CPF"
            />
            {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full p-2 border rounded"
              placeholder="Digite seu email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Telefone</label>
            <InputMask
              mask="(99) 99999-9999"
              {...register('phone')}
              className="w-full p-2 border rounded"
              placeholder="Digite seu telefone"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Senha</label>
            <input
              type="password"
              {...register('password')}
              className="w-full p-2 border rounded"
              placeholder="Digite sua senha"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-[#886023] text-white py-2 rounded hover:bg-[#64491f]"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
