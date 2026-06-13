import { Search, Users, MessageCircle, UserPlus, Clock, Phone } from "lucide-react";

interface HowItWorksProps {
  onNavigate: (page: string) => void;
}

export function HowItWorks({ onNavigate }: HowItWorksProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-14">
        <h1
          className="text-foreground mb-3"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 800 }}
        >
          Como funciona o Serviços Arinos?
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Nossa plataforma foi criada para simplificar a conexão entre moradores e prestadores de serviços autônomos de Arinos-MG.
        </p>
      </div>

      {/* Para usuários */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.3rem" }}>
            Para quem busca serviços
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              numero: "01",
              icone: <Search className="w-7 h-7 text-primary" />,
              titulo: "Pesquise o serviço",
              desc: "Digite o nome do serviço que precisa (ex: encanador, eletricista) ou navegue pelas categorias. Você pode filtrar por bairro para encontrar profissionais próximos.",
            },
            {
              numero: "02",
              icone: <Users className="w-7 h-7 text-primary" />,
              titulo: "Escolha o prestador",
              desc: "Veja o perfil completo, incluindo descrição, serviços oferecidos, bairro de atendimento e avaliações de outros clientes reais.",
            },
            {
              numero: "03",
              icone: <MessageCircle className="w-7 h-7 text-emerald-500" />,
              titulo: "Chame no WhatsApp",
              desc: "Clique em \"Chamar no WhatsApp\" e a mensagem já é enviada automaticamente. Negocie detalhes e preço diretamente com o profissional.",
            },
          ].map((step) => (
            <div key={step.numero} className="bg-card rounded-2xl border border-border shadow-sm p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                  {step.icone}
                </div>
                <span
                  className="text-3xl font-bold text-muted/50"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1 }}
                >
                  {step.numero}
                </span>
              </div>
              <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {step.titulo}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate("search")}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Buscar profissionais agora
          </button>
        </div>
      </div>

      {/* Divisória */}
      <div className="border-t border-border my-12" />

      {/* Para prestadores */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-accent" />
          </div>
          <h2 className="font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.3rem" }}>
            Para prestadores de serviço
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              numero: "01",
              icone: <UserPlus className="w-7 h-7 text-accent" />,
              titulo: "Crie seu cadastro",
              desc: "Preencha seus dados profissionais, descreva seus serviços, informe seu bairro e número de WhatsApp. O cadastro é gratuito.",
            },
            {
              numero: "02",
              icone: <Clock className="w-7 h-7 text-amber-500" />,
              titulo: "Aguarde aprovação",
              desc: "Nossa equipe analisa cada cadastro para garantir a qualidade e segurança da plataforma. Você será avisado por e-mail quando aprovado.",
            },
            {
              numero: "03",
              icone: <Phone className="w-7 h-7 text-emerald-500" />,
              titulo: "Receba contatos",
              desc: "Após aprovado, seu perfil aparece nas buscas. Os clientes entram em contato diretamente pelo seu WhatsApp.",
            },
          ].map((step) => (
            <div key={step.numero} className="bg-card rounded-2xl border border-border shadow-sm p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center shrink-0">
                  {step.icone}
                </div>
                <span
                  className="text-3xl font-bold text-muted/50"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1 }}
                >
                  {step.numero}
                </span>
              </div>
              <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {step.titulo}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate("register-provider")}
            className="px-8 py-3 bg-accent text-accent-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Quero me cadastrar como prestador
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-8">
        <h2 className="font-bold text-foreground mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.2rem" }}>
          Perguntas frequentes
        </h2>
        <dl className="flex flex-col gap-5">
          {[
            { p: "O uso do site é gratuito?", r: "Sim! Tanto para quem busca serviços quanto para os prestadores, o uso da plataforma é totalmente gratuito." },
            { p: "Os prestadores são verificados?", r: "Todos os cadastros passam por análise da nossa equipe antes de aparecer no site. Isso garante mais segurança para todos." },
            { p: "Como faço contato com o prestador?", r: "Basta clicar em 'Chamar no WhatsApp' no card ou perfil do prestador. A mensagem é enviada automaticamente." },
            { p: "Posso avaliar um prestador?", r: "Sim! Após contratar um serviço, você pode deixar uma avaliação no perfil do prestador para ajudar outros usuários." },
          ].map((item) => (
            <div key={item.p} className="border-b border-border pb-5 last:border-0 last:pb-0">
              <dt className="font-semibold text-foreground text-sm mb-1">{item.p}</dt>
              <dd className="text-muted-foreground text-sm leading-relaxed">{item.r}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
