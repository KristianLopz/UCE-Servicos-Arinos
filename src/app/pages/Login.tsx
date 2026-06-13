import { useState } from "react";
import { User, Wrench, Shield } from "lucide-react";
import { FormContainer, InputField } from "../components/FormContainer";
import type { UsuarioLogado, TipoUsuario } from "../App";

interface LoginProps {
  onNavigate: (page: string) => void;
  onLogin: (usuario: UsuarioLogado) => void;
}

const API_URL = "http://localhost/servicos-arinos-api";

// Contas de demonstração para login sem backend
const CONTAS_DEMO: Record<string, { nomeCompleto: string; tipo: TipoUsuario }> = {
  "usuario@demo.com": { nomeCompleto: "Fernanda Rocha", tipo: "usuario" },
  "prestador@demo.com": { nomeCompleto: "Carlos Alberto Ferreira", tipo: "prestador" },
  "admin@demo.com": { nomeCompleto: "Administrador Arinos", tipo: "admin" },
};

export function Login({ onNavigate, onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState<TipoUsuario>("usuario");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErro("");
  setLoading(true);

  try {
    const resposta = await fetch(`${API_URL}/login.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha,
      }),
    });

    const dados = await resposta.json();

    if (dados.sucesso) {
      onLogin({
        nomeCompleto: dados.usuario.nomeCompleto,
        email: dados.usuario.email,
        tipo: dados.usuario.tipo,
      });
    } else {
      setErro(dados.mensagem || "E-mail ou senha incorretos.");
    }
  } catch (error) {
    console.error(error);
    setErro("Não foi possível conectar com a API.");
  } finally {
    setLoading(false);
  }
};

  const tipoOptions: { id: TipoUsuario; label: string; desc: string; icone: React.ReactNode }[] = [
    { id: "usuario", label: "Usuário", desc: "Procuro serviços", icone: <User className="w-5 h-5" /> },
    { id: "prestador", label: "Prestador", desc: "Ofereço serviços", icone: <Wrench className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1
            className="text-foreground mb-2"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.75rem", fontWeight: 800 }}
          >
            Bem-vindo de volta
          </h1>
          <p className="text-muted-foreground text-sm">Acesse sua conta no Serviços Arinos</p>
        </div>

        <FormContainer titulo="Entrar na conta">
          {/* Seletor de tipo */}
          <div className="flex gap-3 mb-6 mt-2">
            {tipoOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTipo(opt.id)}
                className={`flex-1 flex flex-col items-center gap-1.5 py-4 rounded-xl border-2 transition-all ${
                  tipo === opt.id
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                {opt.icone}
                <span className="text-sm font-semibold">{opt.label}</span>
                <span className="text-xs opacity-70">{opt.desc}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputField
              label="E-mail"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="seu@email.com"
              required
            />
            <InputField
              label="Senha"
              type="password"
              value={senha}
              onChange={setSenha}
              placeholder="••••••••"
              required
            />

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
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Contas demo */}
          <div className="mt-5 p-4 bg-secondary/60 rounded-xl">
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
              Contas de demonstração (senha: 1234)
            </p>
            <ul className="flex flex-col gap-1.5">
              {Object.entries(CONTAS_DEMO).map(([e, c]) => (
                <li key={e}>
                  <button
                    type="button"
                    onClick={() => { setEmail(e); setSenha("1234"); setTipo(c.tipo); }}
                    className="text-xs text-primary hover:underline text-left"
                  >
                    {e} — {c.nomeCompleto} ({c.tipo})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Não tem conta?{" "}
            <button
              onClick={() => onNavigate(tipo === "prestador" ? "register-provider" : "register-user")}
              className="text-primary font-medium hover:underline"
            >
              Cadastre-se
            </button>
          </div>

          <div className="mt-3 text-center">
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Esqueci minha senha
            </button>
          </div>

          {/* Acesso admin direto */}
          <div className="mt-4 pt-4 border-t border-border text-center">
            <button
              onClick={() => onLogin({ nomeCompleto: "Administrador Arinos", email: "admin@servicosarinos.com.br", tipo: "admin" })}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              Acesso administrativo (demo)
            </button>
          </div>
        </FormContainer>
      </div>
    </div>
  );
}
