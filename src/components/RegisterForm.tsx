import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useNotification from "../hooks/useNotification.ts";
import { useService } from "../hooks/useService.ts";
import registerService from "../services/Auth/register.ts";

const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().min(14, "CPF inválido").max(14, "CPF inválido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(14, "Telefone inválido").max(15, "Telefone inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const notification = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const [isRegistering, doRegister] = useService(registerService, {
    onData: () => {
      notification("success", "Usuário registrado com sucesso! Agora, faça seu Login.");
      setTimeout(() => navigate("/login"), 2500);
    },
    onError: (error) => {
      notification("error", error.message);
    },
  });

  const onSubmit = useCallback((data: RegisterFormData) => {
    if (data) {
      doRegister(data);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <img
          src="https://static.wixstatic.com/media/b87f83_9f4625b043a944daaf5fddefc7d73d0e~mv2.png/v1/fill/w_80,h_80,al_c,q_85,enc_auto/logo-pousada-quinta-do-ypua.png"
          alt="Logo Quinta do Ypuã"
          className="mx-auto pb-6 object-cover"
        />
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Nome</label>
            <input
              type="text"
              {...register("name")}
              className="w-full p-2 border rounded"
              placeholder="Digite seu nome"
              disabled={isRegistering}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">CPF</label>
            <InputMask
              mask="999.999.999-99"
              {...register("cpf")}
              className="w-full p-2 border rounded"
              placeholder="Digite seu CPF"
              disabled={isRegistering}
            />
            {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 border rounded"
              placeholder="Digite seu email"
              disabled={isRegistering}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Telefone</label>
            <InputMask
              mask="(99) 99999-9999"
              {...register("phone")}
              className="w-full p-2 border rounded"
              placeholder="Digite seu telefone"
              disabled={isRegistering}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Senha</label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-2 border rounded"
              placeholder="Digite sua senha"
              disabled={isRegistering}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-[#886023] text-white py-2 rounded hover:bg-[#64491f]"
            disabled={isRegistering}
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
