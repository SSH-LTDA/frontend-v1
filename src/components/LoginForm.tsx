import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useService } from "../hooks/useService.ts";
import useNotification from "../hooks/useNotification.ts";
import login from "../services/Auth/login.ts";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const notification = useNotification();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [isAuthenticating, authenticate] = useService(login, {
    onData: (data) => {
      notification("success", "Login realizado com sucesso!");
      setTimeout(() => {
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "/";
      }, 4000);
    },
    onError: (error) => {
      notification("error", error.message);
    },
  });

  const onSubmit = useCallback((data: LoginFormData) => {
    authenticate(data);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <img
          src="https://static.wixstatic.com/media/b87f83_9f4625b043a944daaf5fddefc7d73d0e~mv2.png/v1/fill/w_80,h_80,al_c,q_85,enc_auto/logo-pousada-quinta-do-ypua.png"
          alt="Logo Quinta do Ypuã"
          className="mx-auto pb-6 object-cover"
        />
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 border rounded"
              placeholder="Digite seu email"
              disabled={isAuthenticating}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Senha</label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-2 border rounded"
              placeholder="Digite sua senha"
              disabled={isAuthenticating}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-[#886023] text-white py-2 rounded hover:bg-[#64491f]"
            disabled={isAuthenticating}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
