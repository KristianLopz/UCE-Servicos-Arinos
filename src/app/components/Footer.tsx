import { MapPin, Phone, Mail, GraduationCap } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const desenvolvedores = [
    "Kristian Lopes",
    "Luiz Fernando Fonseca",
    "Dionil Júnior",
    "Washington Carlos",
  ];

  return (
    <footer className="bg-foreground text-primary-foreground pt-12 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Sobre */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span
                className="font-bold text-white"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.1rem" }}
              >
                Serviços Arinos
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Conectando moradores de Arinos-MG com os melhores prestadores de serviços autônomos da cidade.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="font-semibold text-white mb-4" style={{ fontSize: "0.9rem", letterSpacing: "0.05em" }}>
              NAVEGAÇÃO
            </h4>
            <ul className="space-y-2">
              {[
                { id: "home", label: "Início" },
                { id: "search", label: "Buscar Serviços" },
                { id: "how-it-works", label: "Como Funciona" },
                { id: "about", label: "Sobre Nós" },
                { id: "contact", label: "Contato" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-white mb-4" style={{ fontSize: "0.9rem", letterSpacing: "0.05em" }}>
              CONTATO
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                <MapPin className="w-4 h-4 shrink-0" />
                Arinos, Minas Gerais, Brasil
              </li>
              <li className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                <Phone className="w-4 h-4 shrink-0" />
                (38) 9 9999-9999
              </li>
              <li className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                <Mail className="w-4 h-4 shrink-0" />
                contato@servicosarinos.com.br
              </li>
            </ul>
          </div>
        </div>

        {/* Créditos IFNMG */}
        <div
          className="py-5 flex flex-col sm:flex-row items-start sm:items-center gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white text-xs font-semibold leading-tight">
                IFNMG — Campus Arinos
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                Projeto desenvolvido por estudantes
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 sm:ml-4">
            {desenvolvedores.map((nome) => (
              <span
                key={nome}
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)" }}
              >
                {nome}
              </span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div
          className="py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.35)" }}
        >
          <span>© 2026 Serviços Arinos. Todos os direitos reservados.</span>
          <span>Feito com ❤️ para Arinos-MG</span>
        </div>
      </div>
    </footer>
  );
}
