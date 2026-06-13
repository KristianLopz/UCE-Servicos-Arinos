import { useState } from "react";
import { Menu, X, MapPin, User, ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
import type { UsuarioLogado } from "../App";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  usuarioLogado: UsuarioLogado | null;
  onLogout: () => void;
}

const tipoBadge: Record<string, { label: string; cor: string }> = {
  usuario: { label: "Usuário", cor: "bg-primary/10 text-primary" },
  prestador: { label: "Prestador", cor: "bg-accent/10 text-accent" },
  admin: { label: "Admin", cor: "bg-purple-100 text-purple-700" },
};

export function Navbar({ currentPage, onNavigate, usuarioLogado, onLogout }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const links = [
    { id: "home", label: "Início" },
    { id: "search", label: "Serviços" },
    { id: "how-it-works", label: "Como Funciona" },
    { id: "about", label: "Sobre" },
    { id: "contact", label: "Contato" },
  ];

  const handleNav = (page: string) => {
    onNavigate(page);
    setMenuOpen(false);
    setUserMenuOpen(false);
  };

  const primeiroNome = usuarioLogado?.nomeCompleto.split(" ")[0] ?? "";
  const badge = usuarioLogado ? tipoBadge[usuarioLogado.tipo] : null;

  const dashboardPage = usuarioLogado?.tipo === "admin"
    ? "admin-dashboard"
    : usuarioLogado?.tipo === "prestador"
    ? "provider-dashboard"
    : null;

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <button
            onClick={() => handleNav("home")}
            className="flex items-center gap-2 shrink-0 focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-tight text-left">
              <span
                className="font-bold text-foreground"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1rem" }}
              >
                Serviços Arinos
              </span>
              <span className="text-muted-foreground" style={{ fontSize: "0.65rem" }}>
                Arinos · MG
              </span>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer text-sm ${
                  currentPage === link.id
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </button>
            ))}
            {!usuarioLogado && (
              <button
                onClick={() => handleNav("register-provider")}
                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer text-sm ${
                  currentPage === "register-provider"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                Sou Prestador
              </button>
            )}
          </div>

          {/* Desktop: usuário logado ou botão login */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {usuarioLogado ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-secondary transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <span
                      className="text-primary-foreground text-sm font-semibold"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {primeiroNome[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-foreground text-sm font-medium leading-tight">{primeiroNome}</p>
                    {badge && (
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${badge.cor}`}>
                        {badge.label}
                      </span>
                    )}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown */}
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-52 bg-card border border-border rounded-2xl shadow-lg z-20 overflow-hidden py-1">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="font-semibold text-foreground text-sm truncate">{usuarioLogado.nomeCompleto}</p>
                        <p className="text-xs text-muted-foreground truncate">{usuarioLogado.email}</p>
                        {badge && (
                          <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium ${badge.cor}`}>
                            {badge.label}
                          </span>
                        )}
                      </div>
                      {dashboardPage && (
                        <button
                          onClick={() => handleNav(dashboardPage)}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                          Meu painel
                        </button>
                      )}
                      <button
                        onClick={() => { onLogout(); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/5 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sair da conta
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleNav("login")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  currentPage === "login"
                    ? "bg-primary text-primary-foreground"
                    : "border border-primary text-primary hover:bg-primary/5"
                }`}
              >
                <User className="w-4 h-4" />
                Login
              </button>
            )}
          </div>

          {/* Mobile: avatar compacto + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            {usuarioLogado && (
              <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-secondary">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-bold">
                    {primeiroNome[0]?.toUpperCase()}
                  </span>
                </div>
                <span className="text-foreground text-xs font-medium max-w-[80px] truncate">{primeiroNome}</span>
                {badge && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${badge.cor}`}>
                    {badge.label}
                  </span>
                )}
              </div>
            )}
            <button
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-card border-t border-border px-4 pb-4 shadow-lg">
          {/* Info do usuário no mobile */}
          {usuarioLogado && (
            <div className="mt-3 mb-2 p-3 bg-secondary/60 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="text-primary-foreground font-bold">
                  {primeiroNome[0]?.toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-sm truncate">{usuarioLogado.nomeCompleto}</p>
                <p className="text-xs text-muted-foreground truncate">{usuarioLogado.email}</p>
              </div>
              {badge && (
                <span className={`ml-auto shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${badge.cor}`}>
                  {badge.label}
                </span>
              )}
            </div>
          )}

          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`w-full text-left px-4 py-3 rounded-lg mt-1 transition-colors ${
                currentPage === link.id
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              {link.label}
            </button>
          ))}

          {!usuarioLogado && (
            <>
              <button
                onClick={() => handleNav("register-provider")}
                className={`w-full text-left px-4 py-3 rounded-lg mt-1 transition-colors ${
                  currentPage === "register-provider"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                Sou Prestador
              </button>
              <button
                onClick={() => handleNav("login")}
                className="w-full text-left px-4 py-3 rounded-lg mt-1 text-foreground hover:bg-secondary transition-colors"
              >
                Login
              </button>
            </>
          )}

          {usuarioLogado && (
            <>
              {dashboardPage && (
                <button
                  onClick={() => handleNav(dashboardPage)}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-lg mt-1 text-foreground hover:bg-secondary transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Meu painel
                </button>
              )}
              <button
                onClick={() => { onLogout(); setMenuOpen(false); }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-lg mt-1 text-destructive hover:bg-destructive/5 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sair da conta
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
