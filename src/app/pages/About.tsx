import { Heart, Shield, Users, Star, GraduationCap } from "lucide-react";

interface AboutProps {
  onNavigate: (page: string) => void;
}

export function About({ onNavigate }: AboutProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div
        className="rounded-3xl p-10 text-center mb-12 overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #1a2744 0%, #1a5eb8 100%)" }}
      >
        <h1
          className="text-white mb-4"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 800 }}
        >
          Sobre o Serviços Arinos
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto leading-relaxed text-lg">
          Uma plataforma feita por e para a cidade de Arinos-MG, conectando moradores com profissionais autônomos locais.
        </p>
      </div>

      {/* Missão */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
        <div>
          <h2
            className="text-foreground mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.4rem", fontWeight: 700 }}
          >
            Nossa missão
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            O <strong className="text-foreground">Serviços Arinos</strong> nasceu da necessidade real dos moradores da nossa cidade: encontrar profissionais de confiança sem precisar depender de indicações boca a boca ou buscar fora de Arinos.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Nossa plataforma conecta quem precisa de um serviço com quem oferece seu trabalho autônomo — tudo de forma simples, direta e gratuita.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Acreditamos que valorizar os talentos locais fortalece a economia da cidade e aproxima as pessoas. Cada contato feito aqui é dinheiro que fica em Arinos.
          </p>
        </div>
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 flex flex-col gap-5">
          {[
            { icone: <Heart className="w-5 h-5 text-rose-500" />, titulo: "Feito para Arinos", desc: "100% local, pensado para a nossa realidade." },
            { icone: <Shield className="w-5 h-5 text-primary" />, titulo: "Perfis verificados", desc: "Todos os prestadores passam por análise antes de aparecer." },
            { icone: <Users className="w-5 h-5 text-emerald-500" />, titulo: "Contato direto", desc: "Sem intermediários — você fala direto com o profissional." },
            { icone: <Star className="w-5 h-5 text-amber-500" />, titulo: "Avaliações reais", desc: "Clientes reais, avaliações honestas." },
          ].map((item) => (
            <div key={item.titulo} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shrink-0">{item.icone}</div>
              <div>
                <p className="font-medium text-foreground text-sm">{item.titulo}</p>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Números */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-8 mb-14">
        <h2
          className="text-foreground text-center mb-8"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.3rem", fontWeight: 700 }}
        >
          Serviços Arinos em números
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { valor: "55+", label: "Prestadores cadastrados" },
            { valor: "10", label: "Categorias de serviços" },
            { valor: "128+", label: "Usuários ativos" },
            { valor: "4.7★", label: "Avaliação média" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-bold text-primary" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.75rem" }}>
                {stat.valor}
              </p>
              <p className="text-muted-foreground text-sm mt-1 leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <button
          onClick={() => onNavigate("search")}
          className="py-4 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-90 transition-opacity"
        >
          Buscar profissionais
        </button>
        <button
          onClick={() => onNavigate("register-provider")}
          className="py-4 bg-accent text-accent-foreground rounded-2xl font-semibold hover:opacity-90 transition-opacity"
        >
          Cadastrar meu serviço
        </button>
      </div>

      {/* Créditos IFNMG */}
      <div
        className="rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5"
        style={{ background: "linear-gradient(135deg, #1a2744 0%, #1a5eb8 100%)" }}
      >
        <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
          <GraduationCap className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-white mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1rem" }}>
            Projeto acadêmico — IFNMG Campus Arinos
          </p>
          <p className="text-white/70 text-sm mb-3">
            O Serviços Arinos foi desenvolvido como projeto por um grupo de estudantes do Instituto Federal do Norte de Minas Gerais, Campus Arinos.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Kristian Lopes", "Luiz Fernando Fonseca", "Dionil Júnior", "Washington Carlos"].map((nome) => (
              <span
                key={nome}
                className="text-sm px-3 py-1 rounded-full font-medium"
                style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)" }}
              >
                {nome}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
