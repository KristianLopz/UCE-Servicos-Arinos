import { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { FormContainer, InputField, SelectField, TextareaField } from "../components/FormContainer";
import { categorias, bairros } from "../data/mockData";
import { formatarBairro } from "../utils/formatarBairro";
import { formatarTelefone, limparTelefone } from "../utils/formatarTelefone";
import { API_URL } from "../config/api";


interface RegisterProviderProps {
  onNavigate: (page: string) => void;
}


export function RegisterProvider({ onNavigate }: RegisterProviderProps) {
  const [form, setForm] = useState({
    nomeCompleto: "",
    nomeProfissional: "",
    email: "",
    whatsapp: "",
    categoriaId: "",
    descricao: "",
    bairro: "",
    senha: "",
    confirmarSenha: "",
  });
  const [bairroOutro, setBairroOutro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (campo: string) => (v: string) => setForm((f) => ({ ...f, [campo]: v }));


const setWhatsapp = (v: string) => {
  // Formata para exibição enquanto mantém apenas até 11 dígitos
  setForm((f) => ({
    ...f,
    whatsapp: formatarTelefone(v),
  }));
};

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

  if (!form.categoriaId) {
    setErro("Selecione uma categoria principal.");
    return;
  }


  const whatsappLimpo = limparTelefone(form.whatsapp);

  if (whatsappLimpo.length < 10 || whatsappLimpo.length > 11) {
    setErro("Informe um WhatsApp válido com DDD. Exemplo: (38) 99999-9999");
    return;
  }

setLoading(true);

  try {
    let bairroParaEnviar = form.bairro === "outro" ? bairroOutro.trim() : form.bairro;

    if (!bairroParaEnviar) {
      setErro("Informe o bairro ou região de atendimento.");
      setLoading(false);
      return;
    }

    bairroParaEnviar = formatarBairro(bairroParaEnviar);

    const resposta = await fetch(`${API_URL}/cadastrarPrestador.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      nomeCompleto: form.nomeCompleto,
      nomeProfissional: form.nomeProfissional,
      email: form.email,
      whatsapp: whatsappLimpo,
      categoriaId: form.categoriaId,
      descricao: form.descricao,
      bairro: bairroParaEnviar,
      senha: form.senha,
    }),
    });

    const dados = await resposta.json();

    if (dados.sucesso) {
      setSucesso(true);
    } else {
      setErro(dados.mensagem || "Erro ao cadastrar prestador.");
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
          <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="font-bold text-foreground mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.3rem" }}>
            Cadastro enviado!
          </h2>
          <p className="text-muted-foreground text-sm mb-2">
            Obrigado pelo cadastro, {form.nomeProfissional || form.nomeCompleto.split(" ")[0]}!
          </p>
          <p className="text-muted-foreground text-sm mb-6">
            Seu perfil está <strong>aguardando aprovação</strong> pela nossa equipe. Você receberá uma confirmação em breve.
          </p>
          <button
            onClick={() => onNavigate("home")}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1
            className="text-foreground mb-2"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.75rem", fontWeight: 800 }}
          >
            Cadastrar como prestador
          </h1>
          <p className="text-muted-foreground text-sm">Divulgue seus serviços e encontre clientes em Arinos</p>
        </div>

        <FormContainer titulo="Seus dados profissionais">
          {/* Aviso de aprovação */}
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl mb-6 mt-2">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              Após o cadastro, seu perfil será analisado pela nossa equipe antes de aparecer publicamente no site. Isso garante a qualidade dos prestadores.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputField label="Nome completo" value={form.nomeCompleto} onChange={set("nomeCompleto")} placeholder="Seu nome completo" required />
            <InputField
              label="Nome profissional"
              value={form.nomeProfissional}
              onChange={set("nomeProfissional")}
              placeholder='Ex: "João Eletricista" ou "Graça Diarista"'
              required
              hint="Este é o nome que aparecerá no seu perfil público"
            />
            <InputField label="E-mail" type="email" value={form.email} onChange={set("email")} placeholder="seu@email.com" required />
            <InputField
              label="Telefone / WhatsApp"
              type="tel"
              value={form.whatsapp}
              onChange={setWhatsapp}
              placeholder="(38) 99999-9999"
              required
              hint="Digite seu WhatsApp com DDD. Ex: (38) 99999-9999"
            />
            <SelectField
              label="Categoria principal"
              value={form.categoriaId}
              onChange={set("categoriaId")}
              options={categorias.map((c) => ({ value: c.id, label: `${c.icone} ${c.nome}` }))}
              required
            />
            <TextareaField
              label="Descrição do trabalho"
              value={form.descricao}
              onChange={set("descricao")}
              placeholder="Descreva sua experiência, especialidades e diferenciais..."
              rows={4}
              required
            />
            <SelectField
              label="Bairro / Região de atendimento"
              value={form.bairro}
              onChange={set("bairro")}
              options={[...bairros.map((b) => ({ value: b, label: b })), { value: "outro", label: "Outro (informar)" }]}
              required
            />
            {form.bairro === "outro" && (
              <InputField
                label="Informe seu bairro"
                value={bairroOutro}
                onChange={(v) => setBairroOutro(v)}
                placeholder="Ex: Bairro das Flores"
                required
                hint="Informe seu bairro ou região (ex: Bairro das Flores)."
              />
            )}
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
              className="w-full py-3 bg-accent text-accent-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 mt-2"
            >
              {loading ? "Enviando cadastro..." : "Cadastrar como prestador"}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <button onClick={() => onNavigate("login")} className="text-primary font-medium hover:underline">
              Entrar
            </button>
          </div>
        </FormContainer>
      </div>
    </div>
  );
}
