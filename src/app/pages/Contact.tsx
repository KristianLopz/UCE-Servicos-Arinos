import { useState } from "react";
import { CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import { FormContainer, InputField, TextareaField } from "../components/FormContainer";

interface ContactProps {
  onNavigate?: (page: string) => void;
}

export function Contact({ onNavigate }: ContactProps) {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [sucesso, setSucesso] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (campo: string) => (v: string) => setForm((f) => ({ ...f, [campo]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: integrar com API de contato
    setTimeout(() => {
      setLoading(false);
      setSucesso(true);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1
          className="text-foreground mb-3"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2rem)", fontWeight: 800 }}
        >
          Entre em contato
        </h1>
        <p className="text-muted-foreground">Tem alguma dúvida ou sugestão? Fale com a gente!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulário */}
        <div>
          {sucesso ? (
            <div className="bg-card rounded-2xl border border-border shadow-sm p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="font-bold text-foreground mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.2rem" }}>
                Mensagem enviada!
              </h3>
              <p className="text-muted-foreground text-sm">
                Obrigado por entrar em contato, {form.nome.split(" ")[0]}! Responderemos em breve.
              </p>
              <button
                onClick={() => { setSucesso(false); setForm({ nome: "", email: "", mensagem: "" }); }}
                className="mt-5 text-primary text-sm hover:underline"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <FormContainer titulo="Enviar mensagem" subtitulo="Responderemos em até 24 horas">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
                <InputField label="Nome" value={form.nome} onChange={set("nome")} placeholder="Seu nome" required />
                <InputField label="E-mail" type="email" value={form.email} onChange={set("email")} placeholder="seu@email.com" required />
                <TextareaField
                  label="Mensagem"
                  value={form.mensagem}
                  onChange={set("mensagem")}
                  placeholder="Sua dúvida ou sugestão..."
                  rows={5}
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {loading ? "Enviando..." : "Enviar mensagem"}
                </button>
              </form>
            </FormContainer>
          )}
        </div>

        {/* Informações de contato */}
        <div className="flex flex-col gap-5">
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
            <h3 className="font-semibold text-foreground mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Informações de contato
            </h3>
            <ul className="flex flex-col gap-4">
              {[
                { icone: <MapPin className="w-5 h-5 text-primary" />, label: "Endereço", valor: "Arinos, Minas Gerais, Brasil" },
                { icone: <Phone className="w-5 h-5 text-primary" />, label: "Telefone", valor: "(38) 9 9999-9999" },
                { icone: <Mail className="w-5 h-5 text-primary" />, label: "E-mail", valor: "contato@servicosarinos.com.br" },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    {item.icone}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{item.label}</p>
                    <p className="text-foreground text-sm font-medium">{item.valor}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="bg-card rounded-2xl border border-border shadow-sm p-6"
            style={{ background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" }}
          >
            <h3 className="font-semibold text-white mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              É prestador de serviços?
            </h3>
            <p className="text-white/85 text-sm mb-4 leading-relaxed">
              Cadastre-se gratuitamente e comece a receber clientes em Arinos hoje mesmo.
            </p>
            <button
              onClick={() => onNavigate?.("register-provider")}
              className="inline-block px-5 py-2 bg-white text-orange-600 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Cadastrar meu serviço
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
