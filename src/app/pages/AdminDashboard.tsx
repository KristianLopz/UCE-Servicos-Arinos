import { useEffect, useState } from "react";
import { Users, Wrench, Clock, Tag, Check, X, Trash2, Plus } from "lucide-react";
import { categorias as mockCategorias } from "../data/mockData";
import type { Prestador } from "../data/mockData";
import { DashboardCard } from "../components/DashboardCard";
import type { UsuarioLogado } from "../App";

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  usuario: UsuarioLogado | null;
}

const API_URL = "http://localhost/servicos-arinos-api";

export function AdminDashboard({ onNavigate, usuario }: AdminDashboardProps) {
  const [aba, setAba] = useState<"pendentes" | "prestadores" | "categorias">("pendentes");
  const [lista, setLista] = useState<Prestador[]>([]);
const [carregando, setCarregando] = useState(true);
const [erro, setErro] = useState("");
const [estatisticas, setEstatisticas] = useState({
  totalUsuarios: 0,
  totalPrestadores: 0,
  aprovados: 0,
  pendentes: 0,
  bloqueados: 0,
  totalCategorias: 0,
});
  const [cats, setCats] = useState(mockCategorias);
  const [novaCategoria, setNovaCategoria] = useState("");

const aprovados = estatisticas.aprovados;
const pendentes = estatisticas.pendentes;
const bloqueados = estatisticas.bloqueados;

const carregarPrestadores = async () => {
  try {
    setCarregando(true);
    setErro("");

    const resposta = await fetch(`${API_URL}/adminListarPrestadores.php`);
    const dados = await resposta.json();

    if (dados.sucesso) {
      setLista(dados.prestadores);
      setEstatisticas(dados.estatisticas);
    } else {
      setErro(dados.mensagem || "Erro ao carregar prestadores.");
    }
  } catch (error) {
    console.error(error);
    setErro("Não foi possível conectar com a API.");
  } finally {
    setCarregando(false);
  }
};

useEffect(() => {
  carregarPrestadores();
}, []);

const atualizarStatus = async (id: string, status: Prestador["status"]) => {
  try {
    const resposta = await fetch(`${API_URL}/adminAtualizarStatusPrestador.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    const dados = await resposta.json();

    if (dados.sucesso) {
      await carregarPrestadores();
    } else {
      alert(dados.mensagem || "Erro ao atualizar status.");
    }
  } catch (error) {
    console.error(error);
    alert("Não foi possível conectar com a API.");
  }
};

const excluir = async (id: string) => {
  if (!confirm("Tem certeza que deseja excluir este prestador?")) {
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/adminExcluirPrestador.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const dados = await resposta.json();

    if (dados.sucesso) {
      await carregarPrestadores();
    } else {
      alert(dados.mensagem || "Erro ao excluir prestador.");
    }
  } catch (error) {
    console.error(error);
    alert("Não foi possível conectar com a API.");
  }
};

  const adicionarCategoria = () => {
    if (novaCategoria.trim()) {
      setCats((c) => [
        ...c,
        { id: novaCategoria.toLowerCase().replace(/\s/g, "-"), nome: novaCategoria.trim(), icone: "🛠️", cor: "#64748b", totalPrestadores: 0 },
      ]);
      setNovaCategoria("");
    }
  };

  const statusBadge = (status: Prestador["status"]) => {
    const map = {
      aprovado: "bg-emerald-50 text-emerald-700 border-emerald-200",
      aguardando: "bg-amber-50 text-amber-700 border-amber-200",
      bloqueado: "bg-destructive/10 text-destructive border-destructive/20",
    };
    const labels = { aprovado: "Aprovado", aguardando: "Pendente", bloqueado: "Bloqueado" };
    return (
      <span className={`px-2 py-0.5 rounded-full border text-xs font-medium ${map[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.5rem", fontWeight: 700 }}>
          Painel Administrativo
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Gerencie prestadores, usuários e categorias</p>
      </div>

      {/* Cards resumo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard titulo="Usuários" valor={estatisticas.totalUsuarios} icone={<Users className="w-6 h-6" />} cor="#1a5eb8" subtitulo="Cadastrados" />
        <DashboardCard titulo="Prestadores" valor={aprovados} icone={<Wrench className="w-6 h-6" />} cor="#16a34a" subtitulo="Aprovados" />
        <DashboardCard titulo="Pendentes" valor={pendentes} icone={<Clock className="w-6 h-6" />} cor="#f59e0b" subtitulo="Aguardando análise" />
        <DashboardCard titulo="Categorias" valor={cats.length} icone={<Tag className="w-6 h-6" />} cor="#7c3aed" subtitulo="Tipos de serviço" />
      </div>

      {carregando && (
      <div className="bg-card rounded-2xl border border-border shadow-sm p-8 text-center text-muted-foreground mb-6">
        Carregando dados do painel...
      </div>
    )}

    {erro && (
      <div className="bg-destructive/10 text-destructive rounded-xl p-4 text-sm mb-6">
        {erro}
      </div>
    )}

      {/* Abas */}
      <div className="flex gap-1 bg-secondary/50 p-1 rounded-xl mb-6 overflow-x-auto">
        {([
          { id: "pendentes", label: `Pendentes (${pendentes})` },
          { id: "prestadores", label: "Todos os prestadores" },
          { id: "categorias", label: "Categorias" },
        ] as const).map((a) => (
          <button
            key={a.id}
            onClick={() => setAba(a.id)}
            className={`flex-1 min-w-max py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              aba === a.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      {/* Pendentes */}
      {aba === "pendentes" && (
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          {lista.filter((p) => p.status === "aguardando").length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Check className="w-10 h-10 mx-auto mb-3 text-emerald-500" />
              <p>Nenhum prestador pendente no momento.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {lista
                .filter((p) => p.status === "aguardando")
                .map((p) => (
                  <div key={p.id} className="p-5 flex items-start sm:items-center gap-4 flex-col sm:flex-row">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {p.nomeProfissional}
                      </p>
                      <p className="text-sm text-muted-foreground">{p.nomeCompleto} · {p.categoria} · {p.bairro}</p>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{p.descricao}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => atualizarStatus(p.id, "aprovado")}
                        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
                      >
                        <Check className="w-4 h-4" /> Aprovar
                      </button>
                      <button
                        onClick={() => atualizarStatus(p.id, "bloqueado")}
                        className="flex items-center gap-1.5 px-4 py-2 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                      >
                        <X className="w-4 h-4" /> Bloquear
                      </button>
                      <button
                        onClick={() => excluir(p.id)}
                        className="flex items-center gap-1 px-3 py-2 text-destructive rounded-lg text-sm hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Todos prestadores */}
      {aba === "prestadores" && (
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border">
            <p className="text-sm text-muted-foreground">{lista.length} prestadores cadastrados</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Nome</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden sm:table-cell">Categoria</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">Bairro</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {lista.map((p) => (
                  <tr key={p.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-foreground">{p.nomeProfissional}</p>
                        <p className="text-xs text-muted-foreground">{p.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{p.categoria}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{p.bairro}</td>
                    <td className="px-4 py-3">{statusBadge(p.status)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {p.status !== "aprovado" && (
                          <button
                            onClick={() => atualizarStatus(p.id, "aprovado")}
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="Aprovar"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        {p.status !== "bloqueado" && (
                          <button
                            onClick={() => atualizarStatus(p.id, "bloqueado")}
                            className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors"
                            title="Bloquear"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => excluir(p.id)}
                          className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Categorias */}
      {aba === "categorias" && (
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <h2 className="font-semibold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Gerenciar categorias
          </h2>
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && adicionarCategoria()}
              placeholder="Nova categoria..."
              className="flex-1 bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={adicionarCategoria}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90"
            >
              <Plus className="w-4 h-4" /> Adicionar
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {cats.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{cat.icone}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{cat.nome}</p>
                    <p className="text-xs text-muted-foreground">{cat.totalPrestadores} prestadores</p>
                  </div>
                </div>
                <button
                  onClick={() => setCats((c) => c.filter((x) => x.id !== cat.id))}
                  className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
