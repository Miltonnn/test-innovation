"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";
import { useAuthStore } from "@/store/auth.store";
import { LoginRequest } from "@/types/auth";

import { Lock, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const { mutate, isPending } = useLogin();

  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    senha: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);

    mutate(formData, {
      onSuccess: (data) => {
        if (data.status === 1) {
          document.cookie = `token=${data.token_de_acesso}; path=/;`;

          setAuth(data.token_de_acesso, data.dados_usuario);

          router.push("/produtos");
        } else {
          setErrorMessage(data.message || "Erro ao realizar login.");
        }
      },
    });
  };

  return (
    <div className="hero-bg flex flex-col items-center justify-center min-h-screen gap-10 px-5">
      <h1 className="text-4xl font-bold text-primary text-center">
        Bem-vindo a innovation Brindes
      </h1>
      <div className="w-full max-w-md bg-primary px-8 py-20 rounded-2xl shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center bg-white rounded-full px-4 py-2 gap-2">
            <User size={18} className="text-gray-400" />

            <input
              id="email"
              name="email"
              type="text"
              placeholder="Usuário"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex items-center bg-white rounded-full px-4 py-2 gap-2">
            <Lock size={18} className="text-gray-400" />
            <input
              id="senha"
              name="senha"
              type="password"
              placeholder="Senha"
              required
              value={formData.senha}
              onChange={handleChange}
              className="w-full bg-transparent focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-white">
              <input type="checkbox" />
              Manter logado
            </label>

            <button type="button" className="text-white hover:underline">
              Esqueceu a senha?
            </button>
          </div>

          {errorMessage && (
            <div className="text-white text-sm text-center">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className=" bg-white text-gray-900 p-3 px-20 rounded-full font-normal hover:bg-black flex justify-center m-auto transition duration-300 hover:text-white"
          >
            {isPending ? "Entrando..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
