import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { FormContainer, InputField } from "../components/FormContainer";
import type { UsuarioLogado } from "../App";
import { formatarTelefone, limparTelefone } from "../utils/formatarTelefone";
import { API_URL } from "../config/api";

interface RegisterUserProps {
  onNavigate: (page: string) => void;
  onLogin: (usuario: UsuarioLogado) => void;
}




export function RegisterUser({ onNavigate, onLogin }: RegisterUserProps) {

const setTelefone = (v: string) => {
  setForm((f) => ({ ...f, telefone: formatarTelefone(v) }));
};

  const [form, setForm] = useState({
    nomeCompleto: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  });
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (campo: string) => (v: string) => setForm((f) => ({ ...f, [campo]: v }));

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErro("");

  if (form.senha !== form.confirmarSenha) {
    setErro("As senhas não coincidem.");
    return;
  }

  if (form.senha.length < 6) {
    setErro("A senha deve ter pelo menos 6 caracteres.");
    return;
  }

  const telefoneLimpo = limparTelefone(form.telefone);

  if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
    setErro("Informe um telefone válido com DDD.");
    return;
  }

  setLoading(true);

  try {
    const resposta = await fetch(`${API_URL}/cadastrarUsuario.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeCompleto: form.nomeCompleto,
        email: form.email,
        telefone: telefoneLimpo,
        senha: form.senha,
      }),
    });

    const dados = await resposta.json();

    if (dados.sucesso) {
      setSucesso(true);

      onLogin({
        nomeCompleto: dados.usuario.nomeCompleto,
        email: dados.usuario.email,
        tipo: dados.usuario.tipo,
      });
    } else {
      setErro(dados.mensagem || "Erro ao cadastrar usuário.");
    }
  } catch (error) {
    console.error(error);
    setErro("Não foi possível conectar com a API.");
  } finally {
    setLoading(false);
  }
};

  if (sucesso) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
        <div className="bg-card rounded-2xl border border-border shadow-sm p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="font-bold text-foreground mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.3rem" }}>
            Cadastro realizado!
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Bem-vindo ao Serviços Arinos, {form.nomeCompleto.split(" ")[0]}! Agora você pode buscar profissionais.
          </p>
          <button
            onClick={() => onNavigate("search")}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Buscar serviços
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1
            className="text-foreground mb-2"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.75rem", fontWeight: 800 }}
          >
            Criar conta
          </h1>
          <p className="text-muted-foreground text-sm">Cadastre-se para encontrar serviços em Arinos</p>
        </div>

        <FormContainer titulo="Dados pessoais">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <InputField label="Nome completo" value={form.nomeCompleto} onChange={set("nomeCompleto")} placeholder="Seu nome completo" required />
            <InputField label="E-mail" type="email" value={form.email} onChange={set("email")} placeholder="seu@email.com" required />
            <InputField
                  label="Telefone"
                  type="tel"
                  value={form.telefone}
                  onChange={setTelefone}
                  placeholder="(38) 99999-9999"
                  required
                />
            <InputField label="Senha" type="password" value={form.senha} onChange={set("senha")} placeholder="Mínimo 6 caracteres" required />
            <InputField label="Confirmar senha" type="password" value={form.confirmarSenha} onChange={set("confirmarSenha")} placeholder="Repita a senha" required />

            {erro && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                {erro}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 mt-2"
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <button onClick={() => onNavigate("login")} className="text-primary font-medium hover:underline">
              Entrar
            </button>
          </div>
          <div className="mt-3 text-center">
            <button onClick={() => onNavigate("register-provider")} className="text-xs text-muted-foreground hover:text-foreground">
              Quero me cadastrar como prestador →
            </button>
          </div>
        </FormContainer>
      </div>
    </div>
  );
}
