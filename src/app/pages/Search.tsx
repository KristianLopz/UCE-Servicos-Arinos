import { useState, useMemo, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { Prestador, Categoria } from "../data/mockData";
import { ProviderCard } from "../components/ProviderCard";
import { SearchBar } from "../components/SearchBar";

interface SearchProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  initialQuery?: string;
  initialCategoria?: string;
}

const API_URL = "http://localhost/servicos-arinos-api";

export function Search({ onNavigate, initialQuery = "", initialCategoria = "" }: SearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const [categoriaFiltro, setCategoriaFiltro] = useState(initialCategoria);
  const [bairroFiltro, setBairroFiltro] = useState("");
  const [ordenacao, setOrdenacao] = useState("avaliacao");

  const [prestadores, setPrestadores] = useState<Prestador[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    setQuery(initialQuery);
    setCategoriaFiltro(initialCategoria);
  }, [initialQuery, initialCategoria]);

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setErro("");

        const [resPrestadores, resCategorias] = await Promise.all([
          fetch(`${API_URL}/listarPrestadores.php`),
          fetch(`${API_URL}/listarCategorias.php`),
        ]);

        const dadosPrestadores = await resPrestadores.json();
        const dadosCategorias = await resCategorias.json();

        if (dadosPrestadores.sucesso) {
          setPrestadores(dadosPrestadores.prestadores);
        } else {
          setErro("Erro ao carregar prestadores.");
        }

        if (dadosCategorias.sucesso) {
          setCategorias(dadosCategorias.categorias);
        }
      } catch (error) {
        console.error(error);
        setErro("Não foi possível conectar com a API.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  const bairros = useMemo(() => {
    const listaBairros = prestadores.map((p) => p.bairro);
    return Array.from(new Set(listaBairros)).sort();
  }, [prestadores]);

  const resultados = useMemo(() => {
    let lista = prestadores.filter((p) => p.status === "aprovado");

    if (query.trim()) {
      const q = query.toLowerCase();

      lista = lista.filter(
        (p) =>
          p.nomeProfissional.toLowerCase().includes(q) ||
          p.categoria.toLowerCase().includes(q) ||
          p.descricao.toLowerCase().includes(q) ||
          p.servicos.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (categoriaFiltro) {
      lista = lista.filter((p) => p.categoriaId === categoriaFiltro);
    }

    if (bairroFiltro) {
      lista = lista.filter((p) => p.bairro === bairroFiltro);
    }

    if (ordenacao === "avaliacao") {
      lista = [...lista].sort((a, b) => b.avaliacao - a.avaliacao);
    } else if (ordenacao === "avaliacoes") {
      lista = [...lista].sort((a, b) => b.totalAvaliacoes - a.totalAvaliacoes);
    }

    return lista;
  }, [prestadores, query, categoriaFiltro, bairroFiltro, ordenacao]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1
        className="text-foreground mb-2"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.5rem", fontWeight: 700 }}
      >
        Buscar serviços
      </h1>

      <p className="text-muted-foreground text-sm mb-6">
        Encontre o profissional certo para você em Arinos
      </p>

      <SearchBar
        placeholder="Ex: encanador, eletricista, diarista..."
        onSearch={setQuery}
        initialValue={query}
        className="mb-6"
      />

      <div className="flex flex-wrap gap-3 mb-6 p-4 bg-card rounded-2xl border border-border shadow-sm">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Filtros:</span>
        </div>

        <select
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          className="bg-input-background border border-border rounded-lg px-3 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Todas as categorias</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.icone} {c.nome}
            </option>
          ))}
        </select>

        <select
          value={bairroFiltro}
          onChange={(e) => setBairroFiltro(e.target.value)}
          className="bg-input-background border border-border rounded-lg px-3 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Todos os bairros</option>
          {bairros.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select
          value={ordenacao}
          onChange={(e) => setOrdenacao(e.target.value)}
          className="bg-input-background border border-border rounded-lg px-3 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="avaliacao">Melhor avaliação</option>
          <option value="avaliacoes">Mais avaliações</option>
        </select>

        {(categoriaFiltro || bairroFiltro || query) && (
          <button
            onClick={() => { setQuery(""); setCategoriaFiltro(""); setBairroFiltro(""); }}
            className="text-sm text-destructive hover:opacity-80 transition-opacity underline"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {carregando && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">⏳</div>
          <h3 className="font-semibold text-foreground mb-2">Carregando prestadores...</h3>
          <p className="text-muted-foreground text-sm">Buscando dados no banco de dados.</p>
        </div>
      )}

      {!carregando && erro && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="font-semibold text-foreground mb-2">Erro ao carregar dados</h3>
          <p className="text-muted-foreground text-sm">{erro}</p>
        </div>
      )}

      {!carregando && !erro && (
        <>
          <p className="text-sm text-muted-foreground mb-5">
            {resultados.length} prestador{resultados.length !== 1 ? "es" : ""} encontrado{resultados.length !== 1 ? "s" : ""}
          </p>

          {resultados.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-semibold text-foreground mb-2">Nenhum prestador encontrado</h3>
              <p className="text-muted-foreground text-sm">Tente outros termos ou remova os filtros aplicados.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {resultados.map((p) => (
                <ProviderCard
                  key={p.id}
                  prestador={p}
                  onVerPerfil={(id) => onNavigate("provider-detail", { id })}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}