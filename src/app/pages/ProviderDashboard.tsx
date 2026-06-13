import { formatarTelefone, limparTelefone } from "../utils/formatarTelefone";
import { useEffect, useState } from "react";
import {
  User, Edit, Eye, CheckCircle, Clock, XCircle,
  Plus, MapPin, MessageCircle, Users, TrendingUp,
} from "lucide-react";
import { categorias, bairros, getWhatsAppLink } from "../data/mockData";
import type { Prestador, Avaliacao } from "../data/mockData";
import { InputField, SelectField, TextareaField } from "../components/FormContainer";
import { StarRating, RatingBar } from "../components/StarRating";
import type { UsuarioLogado } from "../App";
import { API_URL } from "../config/api";

interface ProviderDashboardProps {
  onNavigate: (page: string) => void;
  usuario: UsuarioLogado | null;
}


function calcularDistribuicaoAvaliacoes(lista: Avaliacao[]) {
  const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  lista.forEach((avaliacao) => {
    dist[avaliacao.nota]++;
  });

  return dist;
}

export function ProviderDashboard({ onNavigate, usuario }: ProviderDashboardProps) {
  const [aba, setAba] = useState<"visao-geral" | "perfil" | "servicos" | "previa">("visao-geral");
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState<Prestador | null>(null);
  const [novoServico, setNovoServico] = useState("");
  const [servicos, setServicos] = useState<string[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const setWhatsapp = (v: string) => {
  setForm((f) => (f ? { ...f, whatsapp: formatarTelefone(v) } : f));
};

  const carregarPerfil = async () => {
    if (!usuario) {
      setErro("Você precisa estar logado como prestador.");
      setCarregando(false);
      return;
    }

    try {
      setCarregando(true);
      setErro("");

      const resposta = await fetch(
        `${API_URL}/meuPerfilPrestador.php?email=${encodeURIComponent(usuario.email)}`
      );

      const dados = await resposta.json();

      if (dados.sucesso) {
        setForm(dados.prestador);
        setServicos(dados.prestador.servicos || []);
        setAvaliacoes(dados.avaliacoes || []);
      } else {
        setErro(dados.mensagem || "Erro ao carregar perfil do prestador.");
      }
    } catch (error) {
      console.error(error);
      setErro("Não foi possível conectar com a API.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarPerfil();
  }, [usuario]);

  const set = (campo: string) => (v: string) => {
    setForm((f) => (f ? { ...f, [campo]: v } : f));
  };

 const adicionarServico = async () => {
  if (!form) return;

  const nomeServico = novoServico.trim();

  if (!nomeServico) {
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/adicionarServicoPrestador.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: form.id,
        nomeServico,
      }),
    });

    const dados = await resposta.json();

    if (dados.sucesso) {
      setNovoServico("");
      await carregarPerfil();
    } else {
      alert(dados.mensagem || "Erro ao adicionar serviço.");
    }
  } catch (error) {
    console.error(error);
    alert("Não foi possível conectar com a API.");
  }
};

const removerServico = async (i: number) => {
  if (!form) return;

  const nomeServico = servicos[i];

  if (!confirm(`Remover o serviço "${nomeServico}"?`)) {
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/removerServicoPrestador.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: form.id,
        nomeServico,
      }),
    });

    const dados = await resposta.json();

    if (dados.sucesso) {
      await carregarPerfil();
    } else {
      alert(dados.mensagem || "Erro ao remover serviço.");
    }
  } catch (error) {
    console.error(error);
    alert("Não foi possível conectar com a API.");
  }
};

  if (carregando) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">⏳</div>
        <h3 className="font-semibold text-foreground mb-2">Carregando painel...</h3>
        <p className="text-muted-foreground text-sm">Buscando dados do seu perfil.</p>
      </div>
    );
  }

  if (erro || !form) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h3 className="font-semibold text-foreground mb-2">Não foi possível carregar o painel</h3>
        <p className="text-muted-foreground text-sm mb-4">{erro}</p>
        <button
          onClick={() => onNavigate("home")}
          className="px-5 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold"
        >
          Voltar ao início
        </button>
      </div>
    );
  }

  const statusConfig = {
    aprovado:  { label: "Aprovado", cor: "text-emerald-700 bg-emerald-50 border-emerald-200", icone: <CheckCircle className="w-4 h-4" /> },
    aguardando:{ label: "Aguardando aprovação", cor: "text-amber-700 bg-amber-50 border-amber-200", icone: <Clock className="w-4 h-4" /> },
    bloqueado: { label: "Bloqueado", cor: "text-destructive bg-destructive/10 border-destructive/20", icone: <XCircle className="w-4 h-4" /> },
  };

  const status = statusConfig[form.status];

  const whatsappLink = getWhatsAppLink(form.whatsapp, form.nomeProfissional);

  const avals = avaliacoes.filter((a) => a.prestadorId === form.id);
  const distribuicao = calcularDistribuicaoAvaliacoes(avals);

  const mediaAtual =
    avals.length > 0
      ? avals.reduce((s, a) => s + a.nota, 0) / avals.length
      : form.avaliacao;

  const nomeExibido = usuario?.nomeCompleto.split(" ")[0] ?? form.nomeProfissional.split(" ")[0];

  const abas = [
    { id: "visao-geral", label: "Visão Geral" },
    { id: "perfil",      label: "Meu Perfil" },
    { id: "servicos",    label: "Meus Serviços" },
    { id: "previa",      label: "Prévia do Card" },
  ] as const;

  const salvarPerfil = async () => {
  if (!form) return;

  const whatsappLimpo = limparTelefone(form.whatsapp);

  if (whatsappLimpo.length < 10 || whatsappLimpo.length > 11) {
    alert("Informe um WhatsApp válido com DDD.");
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/editarPerfilPrestador.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: form.id,
        nomeCompleto: form.nomeCompleto,
        nomeProfissional: form.nomeProfissional,
        whatsapp: whatsappLimpo,
        categoriaId: form.categoriaId,
        descricao: form.descricao,
        bairro: form.bairro,
      }),
    });

    const dados = await resposta.json();

    if (dados.sucesso) {
      alert("Perfil atualizado com sucesso!");
      setEditando(false);
      await carregarPerfil();
    } else {
      alert(dados.mensagem || "Erro ao atualizar perfil.");
    }
  } catch (error) {
    console.error(error);
    alert("Não foi possível conectar com a API.");
  }
};

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cabeçalho */}
      <div className="flex items-start sm:items-center justify-between mb-6 gap-3 flex-col sm:flex-row">
        <div>
          <h1
            className="text-foreground"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.5rem", fontWeight: 700 }}
          >
            Olá, {nomeExibido}! 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Acompanhe seu desempenho e gerencie seu perfil</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium shrink-0 ${status.cor}`}>
          {status.icone}
          {status.label}
        </div>
      </div>

      {/* Abas */}
      <div className="flex gap-1 bg-secondary/50 p-1 rounded-xl mb-6 overflow-x-auto">
        {abas.map((a) => (
          <button
            key={a.id}
            onClick={() => setAba(a.id)}
            className={`flex-1 min-w-max py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              aba === a.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      {/* ── VISÃO GERAL ── */}
      {aba === "visao-geral" && (
        <div className="flex flex-col gap-5">
          {/* Cards de stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Total atendidos */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-5 flex flex-col gap-2 sm:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-muted-foreground text-sm">Pessoas atendidas</p>
              <p
                className="font-bold text-foreground"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "2rem", lineHeight: 1 }}
              >
                {form.totalAtendidos}
              </p>
            </div>

            {/* Total avaliações */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-5 flex flex-col gap-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-muted-foreground text-sm">Avaliações</p>
              <p
                className="font-bold text-foreground"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "2rem", lineHeight: 1 }}
              >
                {avals.length > 0 ? avals.length : form.totalAvaliacoes}
              </p>
            </div>

            {/* Nota média */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-5 flex flex-col gap-2 col-span-2 sm:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">★</span>
              </div>
              <p className="text-muted-foreground text-sm">Nota média</p>
              <div className="flex items-baseline gap-2">
                <p
                  className="font-bold text-foreground"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "2rem", lineHeight: 1 }}
                >
                  {mediaAtual.toFixed(1)}
                </p>
                <span className="text-muted-foreground text-sm">/ 5.0</span>
              </div>
            </div>
          </div>

          {/* Distribuição de estrelas */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
            <h2 className="font-semibold text-foreground mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Avaliações por estrela
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              {/* Nota grande */}
              <div className="flex flex-col items-center shrink-0">
                <p
                  className="font-bold text-primary"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "4rem", lineHeight: 1 }}
                >
                  {mediaAtual.toFixed(1)}
                </p>
                <StarRating value={mediaAtual} size="md" />
                <p className="text-muted-foreground text-sm mt-1">
                  {avals.length > 0 ? avals.length : form.totalAvaliacoes} avaliações
                </p>
              </div>

              {/* Barras */}
              <div className="flex-1 w-full flex flex-col gap-2">
                {[5, 4, 3, 2, 1].map((n) => (
                  <RatingBar
                    key={n}
                    estrela={n}
                    count={distribuicao[n] ?? Math.round(form.totalAvaliacoes * [0, 0.02, 0.04, 0.08, 0.28, 0.58][n])}
                    total={avals.length > 0 ? avals.length : form.totalAvaliacoes}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Avaliações recentes */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
            <h2 className="font-semibold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Avaliações recentes
            </h2>
            {avals.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4">
                Nenhuma avaliação recebida ainda. Divulgue seu perfil!
              </p>
            ) : (
              <ul className="flex flex-col divide-y divide-border">
                {avals.slice(-5).reverse().map((av) => (
                  <li key={av.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
                        <span className="text-sm font-semibold text-muted-foreground">
                          {av.nomeUsuario[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-foreground text-sm font-medium">{av.nomeUsuario}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(av.data).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                    <StarRating value={av.nota} size="sm" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* ── PERFIL ── */}
      {aba === "perfil" && (
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {form.nomeProfissional}
                </h2>
                <span className="text-sm text-muted-foreground">{form.categoria}</span>
              </div>
            </div>
            <button
              onClick={() => setEditando(!editando)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                editando ? "bg-destructive/10 text-destructive" : "bg-primary text-primary-foreground hover:opacity-90"
              }`}
            >
              <Edit className="w-4 h-4" />
              {editando ? "Cancelar" : "Editar perfil"}
            </button>
          </div>

          {editando ? (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Nome completo"      value={form.nomeCompleto}     onChange={set("nomeCompleto")}     required />
                <InputField label="Nome profissional"  value={form.nomeProfissional}  onChange={set("nomeProfissional")} required />
               <InputField
                    label="E-mail"
                    type="email"
                    value={form.email}
                    onChange={() => {}}
                    required
                    hint="O e-mail de login não pode ser alterado por aqui."
                  />
               <InputField
                    label="WhatsApp"
                    value={form.whatsapp}
                    onChange={setWhatsapp}
                    placeholder="(38) 99999-9999"
                    required
                  />
                <SelectField
                  label="Categoria"
                  value={form.categoriaId}
                  onChange={(v) => {
                    const cat = categorias.find((c) => c.id === v);
                    setForm((f) => f ? { ...f, categoriaId: v, categoria: cat?.nome || v } : f);
                  }}
                  options={categorias.map((c) => ({ value: c.id, label: `${c.icone} ${c.nome}` }))}
                />
                <SelectField
                  label="Bairro"
                  value={form.bairro}
                  onChange={set("bairro")}
                  options={bairros.map((b) => ({ value: b, label: b }))}
                />
              </div>
              <TextareaField label="Descrição" value={form.descricao} onChange={set("descricao")} rows={4} />
              <button
                onClick={salvarPerfil}
                className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Salvar alterações
              </button>
            </div>
          ) : (
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Nome completo",  valor: form.nomeCompleto },
                { label: "E-mail",         valor: form.email },
                { label: "WhatsApp",       valor: form.whatsapp },
                { label: "Categoria",      valor: form.categoria },
                { label: "Bairro",         valor: form.bairro },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{item.label}</dt>
                  <dd className="text-foreground text-sm">{item.valor}</dd>
                </div>
              ))}
              <div className="sm:col-span-2">
                <dt className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Descrição</dt>
                <dd className="text-foreground text-sm leading-relaxed">{form.descricao}</dd>
              </div>
            </dl>
          )}
        </div>
      )}

      {/* ── SERVIÇOS ── */}
      {aba === "servicos" && (
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <h2 className="font-semibold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Serviços cadastrados
          </h2>
          <ul className="flex flex-col gap-2 mb-5">
            {servicos.map((s, i) => (
              <li key={i} className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                <span className="text-sm text-foreground flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  {s}
                </span>
                <button
                  onClick={() => removerServico(i)}
                  className="text-xs text-destructive hover:opacity-70 transition-opacity"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <input
              type="text"
              value={novoServico}
              onChange={(e) => setNovoServico(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && adicionarServico()}
              placeholder="Adicionar novo serviço..."
              className="flex-1 bg-input-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={adicionarServico}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90"
            >
              <Plus className="w-4 h-4" /> Adicionar
            </button>
          </div>
        </div>
      )}

      {/* ── PRÉVIA ── */}
      {aba === "previa" && (
        <div>
          <p className="text-muted-foreground text-sm mb-4 flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            Veja como seu card aparece para os usuários na busca
          </p>
          <div className="max-w-sm">
            <div className="bg-card rounded-2xl border border-border shadow-sm p-5 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <User className="w-7 h-7 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {form.nomeProfissional || "Nome profissional"}
                  </h3>
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-primary mt-1">
                    {form.categoria || "Categoria"}
                  </span>
                </div>
              </div>

              {/* Avaliação + atendidos */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StarRating value={mediaAtual} size="sm" />
                  <span className="text-sm font-semibold text-foreground">{mediaAtual.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground">({avals.length || form.totalAvaliacoes})</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  <span>{form.totalAtendidos} atendidos</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-muted-foreground -mt-1">
                <MapPin className="w-3.5 h-3.5" />
                {form.bairro || "Bairro"}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {form.descricao || "Descrição do prestador..."}
              </p>
              <div className="flex gap-2">
                <div className="flex-1 py-2 rounded-xl border border-primary text-primary text-sm font-medium flex items-center justify-center">
                  Ver perfil
                </div>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl bg-emerald-500 text-white text-sm font-medium flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
