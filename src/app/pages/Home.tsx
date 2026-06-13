import { Search, Star, Shield, Zap, Users, ArrowRight, MessageCircle, CheckCircle } from "lucide-react";
import { categorias, prestadores } from "../data/mockData";
import { CategoryCard } from "../components/CategoryCard";
import { ProviderCard } from "../components/ProviderCard";
import { SearchBar } from "../components/SearchBar";

interface HomeProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const destaques = prestadores.filter((p) => p.destaque && p.status === "aprovado");

  const handleCategoryClick = (categoriaId: string) => {
    onNavigate("search", { categoria: categoriaId });
  };

  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a2744 0%, #1a5eb8 60%, #2d7dd2 100%)",
          minHeight: "520px",
        }}
      >
        {/* decorative circles */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: "white" }}
        />
        <div
          className="absolute bottom-0 -left-10 w-48 h-48 rounded-full opacity-10"
          style={{ background: "white" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-start">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <MapPinIcon />
            Arinos · Minas Gerais
          </span>
          <h1
            className="text-white leading-tight mb-4 max-w-2xl"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 800 }}
          >
            Encontre prestadores de serviços em Arinos de forma rápida e fácil
          </h1>
          <p className="text-white/75 text-lg mb-8 max-w-xl leading-relaxed">
            Conectamos moradores da nossa cidade com profissionais autônomos locais e de confiança. Sem complicação, sem burocracia.
          </p>
          <div className="w-full max-w-xl">
            <SearchBar
              placeholder="Ex: encanador, eletricista, diarista..."
              onSearch={(q) => onNavigate("search", { query: q })}
              className="w-full"
            />
          </div>
          <div className="flex flex-wrap gap-4 mt-8 text-white/80 text-sm">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Perfis verificados
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Contato direto via WhatsApp
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              100% gratuito para usuários
            </span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { valor: "55+", label: "Prestadores cadastrados" },
            { valor: "10", label: "Categorias de serviços" },
            { valor: "4.7★", label: "Avaliação média" },
            { valor: "100%", label: "Profissionais locais" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="font-bold text-primary"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.6rem" }}
              >
                {stat.valor}
              </p>
              <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categorias */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2
              className="text-foreground"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.5rem", fontWeight: 700 }}
            >
              Categorias populares
            </h2>
            <p className="text-muted-foreground text-sm mt-1">Escolha o tipo de serviço que você precisa</p>
          </div>
          <button
            onClick={() => onNavigate("search")}
            className="hidden sm:flex items-center gap-1 text-primary text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Ver todos <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categorias.map((cat) => (
            <CategoryCard key={cat.id} categoria={cat} onClick={handleCategoryClick} />
          ))}
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-14 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-foreground"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.5rem", fontWeight: 700 }}
            >
              Como funciona?
            </h2>
            <p className="text-muted-foreground mt-2">Simples, rápido e sem cadastro obrigatório</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                numero: "1",
                icone: <Search className="w-7 h-7" />,
                titulo: "Pesquise o serviço",
                desc: "Digite o tipo de serviço que você precisa ou navegue pelas categorias disponíveis.",
              },
              {
                numero: "2",
                icone: <Users className="w-7 h-7" />,
                titulo: "Escolha o prestador",
                desc: "Veja o perfil, avaliações e descrição de cada profissional e escolha o melhor para você.",
              },
              {
                numero: "3",
                icone: <MessageCircle className="w-7 h-7" />,
                titulo: "Chame no WhatsApp",
                desc: "Entre em contato diretamente com o prestador via WhatsApp para combinar detalhes e orçamento.",
              },
            ].map((step) => (
              <div key={step.numero} className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    {step.icone}
                  </div>
                  <span
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
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
          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate("how-it-works")}
              className="inline-flex items-center gap-2 text-primary font-medium hover:opacity-80 transition-opacity text-sm"
            >
              Saiba mais <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Prestadores em destaque */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2
              className="text-foreground"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.5rem", fontWeight: 700 }}
            >
              Prestadores em destaque
            </h2>
            <p className="text-muted-foreground text-sm mt-1">Profissionais mais bem avaliados da cidade</p>
          </div>
          <button
            onClick={() => onNavigate("search")}
            className="hidden sm:flex items-center gap-1 text-primary text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Ver todos <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {destaques.map((p) => (
            <ProviderCard
              key={p.id}
              prestador={p}
              onVerPerfil={(id) => onNavigate("provider-detail", { id })}
            />
          ))}
        </div>
      </section>

      {/* CTA para prestadores */}
      <section
        className="py-16 mx-4 sm:mx-6 lg:mx-8 rounded-3xl mb-14 overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-8 text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2
            className="text-white mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 700 }}
          >
            Você é prestador de serviços?
          </h2>
          <p className="text-white/85 mb-8 text-lg leading-relaxed">
            Cadastre-se gratuitamente e comece a receber clientes da sua cidade. Mostre seu trabalho e amplie sua renda.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate("register-provider")}
              className="px-8 py-3 bg-white text-orange-600 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              Cadastrar como prestador
            </button>
            <button
              onClick={() => onNavigate("how-it-works")}
              className="px-8 py-3 bg-white/15 border border-white/30 text-white rounded-xl font-medium hover:bg-white/25 transition-colors"
            >
              Saiba como funciona
            </button>
          </div>
          <div className="flex justify-center gap-6 mt-8 text-white/75 text-sm">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> Perfil verificado
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4" /> Avaliações reais
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
