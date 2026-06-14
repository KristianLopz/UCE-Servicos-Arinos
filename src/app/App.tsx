import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { ProviderDetail } from "./pages/ProviderDetail";
import { Login } from "./pages/Login";
import { RegisterUser } from "./pages/RegisterUser";
import { RegisterProvider } from "./pages/RegisterProvider";
import { ProviderDashboard } from "./pages/ProviderDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { HowItWorks } from "./pages/HowItWorks";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

export type TipoUsuario = "usuario" | "prestador" | "admin";

export interface UsuarioLogado {
  nomeCompleto: string;
  email: string;
  tipo: TipoUsuario;
}

type Page =
  | "home"
  | "search"
  | "provider-detail"
  | "login"
  | "register-user"
  | "register-provider"
  | "provider-dashboard"
  | "admin-dashboard"
  | "how-it-works"
  | "about"
  | "contact";

interface PageParams {
  id?: string;
  query?: string;
  categoria?: string;
}

const PAGES_WITHOUT_FOOTER: Page[] = ["admin-dashboard", "provider-dashboard"];

export default function App() {
  {/* MARKER-MAKE-KIT-INVOKED */}
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [params, setParams] = useState<PageParams>({});
  const [usuarioLogado, setUsuarioLogado] = useState<UsuarioLogado | null>(() => {
  const usuarioSalvo = localStorage.getItem("usuarioLogado");

  if (usuarioSalvo) {
    try {
      return JSON.parse(usuarioSalvo);
    } catch {
      localStorage.removeItem("usuarioLogado");
      return null;
    }
  }

  return null;
});

  const navigate = (page: string, newParams: Record<string, string> = {}) => {
    setCurrentPage(page as Page);
    setParams(newParams);
    // Atualiza a URL para permitir compartilhamento direto
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("page", page);
      Object.entries(newParams).forEach(([k, v]) => {
        if (v == null || v === "") url.searchParams.delete(k);
        else url.searchParams.set(k, v);
      });
      window.history.pushState({}, "", url.toString());
    } catch (e) {
      // fallback: usar hash
      const parts = [page];
      if (newParams.id) parts.push(newParams.id);
      window.location.hash = `#/${parts.join("/")}`;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Inicializa a página a partir da URL (permitir links diretos)
  useEffect(() => {
    try {
      const sp = new URL(window.location.href).searchParams;
      const p = (sp.get("page") as Page) || undefined;
      const id = sp.get("id") || undefined;
      const query = sp.get("query") || sp.get("q") || undefined;
      const categoria = sp.get("categoria") || undefined;

      if (p) {
        setCurrentPage(p);
        setParams({ id, query, categoria });
      }
    } catch (e) {
      // tentar hash (#/page/id)
      const hash = window.location.hash.replace(/^#\/?/, "");
      if (hash) {
        const parts = hash.split("/");
        const p = parts[0] as Page;
        const id = parts[1] || undefined;
        if (p) {
          setCurrentPage(p);
          setParams({ id });
        }
      }
    }
  }, []);

  // Manter histórico navegável (back/forward)
  useEffect(() => {
    const handler = () => {
      try {
        const sp = new URL(window.location.href).searchParams;
        const p = (sp.get("page") as Page) || "home";
        const id = sp.get("id") || undefined;
        const query = sp.get("query") || sp.get("q") || undefined;
        const categoria = sp.get("categoria") || undefined;
        setCurrentPage(p);
        setParams({ id, query, categoria });
      } catch (e) {
        const hash = window.location.hash.replace(/^#\/?/, "");
        const parts = hash.split("/");
        const p = parts[0] as Page;
        const id = parts[1] || undefined;
        setCurrentPage(p || "home");
        setParams({ id });
      }
    };

    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

const handleLogin = (usuario: UsuarioLogado) => {
  setUsuarioLogado(usuario);
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

  if (usuario.tipo === "admin") {
    navigate("admin-dashboard");
  } else if (usuario.tipo === "prestador") {
    navigate("provider-dashboard");
  } else {
    navigate("home");
  }
};

  const handleLogout = () => {
  setUsuarioLogado(null);
  localStorage.removeItem("usuarioLogado");
  navigate("home");
};

  const showFooter = !PAGES_WITHOUT_FOOTER.includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={navigate} />;
      case "search":
        return <Search onNavigate={navigate} initialQuery={params.query} initialCategoria={params.categoria} />;
      case "provider-detail":
        return <ProviderDetail prestadorId={params.id || ""} onNavigate={navigate} usuarioLogado={usuarioLogado} />;
      case "login":
        return <Login onNavigate={navigate} onLogin={handleLogin} />;
      case "register-user":
        return <RegisterUser onNavigate={navigate} onLogin={handleLogin} />;
      case "register-provider":
        return <RegisterProvider onNavigate={navigate} />;
      case "provider-dashboard":
        return <ProviderDashboard onNavigate={navigate} usuario={usuarioLogado} />;
      case "admin-dashboard":
        return <AdminDashboard onNavigate={navigate} usuario={usuarioLogado} />;
      case "how-it-works":
        return <HowItWorks onNavigate={navigate} />;
      case "about":
        return <About onNavigate={navigate} />;
      case "contact":
        return <Contact onNavigate={navigate} />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar
        currentPage={currentPage}
        onNavigate={navigate}
        usuarioLogado={usuarioLogado}
        onLogout={handleLogout}
      />
      <main className="flex-1">
        {renderPage()}
      </main>
      {showFooter && <Footer onNavigate={navigate} />}
    </div>
  );
}
