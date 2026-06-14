import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../config/api";
import type { Categoria, Prestador } from "../data/mockData";

export interface SiteStats {
  prestadores: Prestador[];
  categorias: Categoria[];
  carregando: boolean;
  erro: string;
  totalPrestadores: number;
  totalCategorias: number;
  avaliacaoMediaLabel: string;
  profissionaisLocaisPercent: string;
}

export function useSiteStats(): SiteStats {
  const [prestadores, setPrestadores] = useState<Prestador[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let isMounted = true;

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

        if (!isMounted) {
          return;
        }

        if (dadosPrestadores.sucesso) {
          setPrestadores(dadosPrestadores.prestadores || []);
        } else {
          setErro("Falha ao carregar prestadores.");
        }

        if (dadosCategorias.sucesso) {
          setCategorias(dadosCategorias.categorias || []);
        } else {
          setErro((prev) => prev || "Falha ao carregar categorias.");
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setErro("Não foi possível conectar com a API.");
        }
      } finally {
        if (isMounted) {
          setCarregando(false);
        }
      }
    }

    carregarDados();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalPrestadores = prestadores.length;
  const totalCategorias = categorias.length;

  const avaliacaoMediaLabel = useMemo(() => {
    if (!totalPrestadores) {
      return "0.0★";
    }

    const totalAvaliacao = prestadores.reduce((sum, prestador) => sum + prestador.avaliacao, 0);
    return `${(totalAvaliacao / totalPrestadores).toFixed(1)}★`;
  }, [prestadores, totalPrestadores]);

  const profissionaisLocaisPercent = useMemo(() => {
    if (!totalPrestadores) {
      return "100%";
    }

    const locais = prestadores.filter((prestador) => Boolean(prestador.bairro)).length;
    return `${Math.round((locais / totalPrestadores) * 100)}%`;
  }, [prestadores, totalPrestadores]);

  return {
    prestadores,
    categorias,
    carregando,
    erro,
    totalPrestadores,
    totalCategorias,
    avaliacaoMediaLabel,
    profissionaisLocaisPercent,
  };
}
