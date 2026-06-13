import { useState } from "react";
import { MapPin, MessageCircle, Phone, User, ArrowLeft, CheckCircle, Users, Star } from "lucide-react";
import { prestadores, avaliacoes as mockAvaliacoes, getWhatsAppLink, calcularDistribuicao } from "../data/mockData";
import type { Avaliacao } from "../data/mockData";
import { StarRating, RatingBar } from "../components/StarRating";
import type { UsuarioLogado } from "../App";

interface ProviderDetailProps {
  prestadorId: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  usuarioLogado?: UsuarioLogado | null;
}

export function ProviderDetail({ prestadorId, onNavigate, usuarioLogado }: ProviderDetailProps) {
  const prestador = prestadores.find((p) => p.id === prestadorId);
  const [listaAvaliacoes, setListaAvaliacoes] = useState<Avaliacao[]>(mockAvaliacoes);
  const [notaSelecionada, setNotaSelecionada] = useState(0);
  const [jaAvaliou, setJaAvaliou] = useState(false);
  const [avaliacaoEnviada, setAvaliacaoEnviada] = useState(false);

  if (!prestador) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Prestador não encontrado.</p>
        <button onClick={() => onNavigate("search")} className="mt-4 text-primary underline text-sm">
          Voltar à busca
        </button>
      </div>
    );
  }

  const avals = listaAvaliacoes.filter((a) => a.prestadorId === prestadorId);
  const distribuicao = calcularDistribuicao(prestadorId, listaAvaliacoes);
  const mediaAtual = avals.length > 0
    ? avals.reduce((s, a) => s + a.nota, 0) / avals.length
    : prestador.avaliacao;
  const whatsappLink = getWhatsAppLink(prestador.whatsapp, prestador.nomeProfissional);

  const enviarAvaliacao = () => {
    if (!notaSelecionada || !usuarioLogado) return;
    const novaAv: Avaliacao = {
      id: `av-${Date.now()}`,
      prestadorId,
      usuarioId: usuarioLogado.email,
      nomeUsuario: usuarioLogado.nomeCompleto,
      nota: notaSelecionada,
      data: new Date().toISOString().split("T")[0],
    };
    setListaAvaliacoes((prev) => [...prev, novaAv]);
    setJaAvaliou(true);
    setAvaliacaoEnviada(true);
  };

  const podeAvaliar =
    usuarioLogado?.tipo === "usuario" &&
    !jaAvaliou &&
    !avals.some((a) => a.usuarioId === usuarioLogado?.email);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => onNavigate("search")}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar aos resultados
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna principal */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Header do perfil */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                <User className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h1
                  className="text-foreground"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.4rem", fontWeight: 700 }}
                >
                  {prestador.nomeProfissional}
                </h1>
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mt-1">
                  {prestador.categoria}
                </span>

                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <StarRating value={mediaAtual} size="sm" />
                    <span className="font-semibold text-foreground">{mediaAtual.toFixed(1)}</span>
                    <span className="text-muted-foreground text-sm">({avals.length} avaliações)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <MapPin className="w-4 h-4" />
                    {prestador.bairro}
                  </div>
                </div>

                {/* Total atendidos — destaque */}
                <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-emerald-50 rounded-xl w-fit">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-700">
                    {prestador.totalAtendidos} pessoas já foram atendidas
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sobre */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
            <h2 className="font-semibold text-foreground mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Sobre
            </h2>
            <p className="text-muted-foreground leading-relaxed">{prestador.descricao}</p>
          </div>

          {/* Serviços */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
            <h2 className="font-semibold text-foreground mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Serviços oferecidos
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {prestador.servicos.map((servico) => (
                <li key={servico} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  {servico}
                </li>
              ))}
            </ul>
          </div>

          {/* Bloco de avaliações */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
            <h2 className="font-semibold text-foreground mb-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Avaliações
            </h2>

            {/* Resumo visual */}
            <div className="flex flex-col sm:flex-row gap-6 mb-6 p-4 bg-secondary/50 rounded-xl">
              <div className="flex flex-col items-center justify-center shrink-0">
                <span
                  className="font-bold text-foreground"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "3rem", lineHeight: 1 }}
                >
                  {mediaAtual.toFixed(1)}
                </span>
                <StarRating value={mediaAtual} size="sm" />
                <span className="text-xs text-muted-foreground mt-1">{avals.length} avaliações</span>
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                {[5, 4, 3, 2, 1].map((n) => (
                  <RatingBar key={n} estrela={n} count={distribuicao[n] ?? 0} total={avals.length} />
                ))}
              </div>
            </div>

            {/* Caixa para avaliar — só para usuários logados */}
            {podeAvaliar && (
              <div className="mb-5 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                <p className="font-medium text-foreground text-sm mb-3">
                  Você utilizou o serviço de {prestador.nomeProfissional}? Deixe sua avaliação:
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <StarRating value={notaSelecionada} interactive onChange={setNotaSelecionada} size="lg" />
                  {notaSelecionada > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {["", "Muito ruim", "Ruim", "Regular", "Bom", "Excelente"][notaSelecionada]}
                    </span>
                  )}
                </div>
                <button
                  disabled={notaSelecionada === 0}
                  onClick={enviarAvaliacao}
                  className="px-5 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-40"
                >
                  Enviar avaliação
                </button>
              </div>
            )}

            {/* Avaliação enviada */}
            {avaliacaoEnviada && (
              <div className="mb-5 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-medium text-emerald-800 text-sm">Avaliação enviada com sucesso!</p>
                  <p className="text-xs text-emerald-700">Você deu {notaSelecionada} estrela{notaSelecionada > 1 ? "s" : ""} para {prestador.nomeProfissional}.</p>
                </div>
              </div>
            )}

            {/* Aviso para não logados */}
            {!usuarioLogado && (
              <div className="mb-5 p-4 bg-muted rounded-xl text-sm text-muted-foreground">
                <button onClick={() => onNavigate("login")} className="text-primary font-medium hover:underline">
                  Faça login
                </button>{" "}
                para avaliar este prestador.
              </div>
            )}

            {/* Aviso para prestadores */}
            {usuarioLogado?.tipo === "prestador" && (
              <div className="mb-5 p-4 bg-muted rounded-xl text-sm text-muted-foreground">
                Somente usuários podem avaliar prestadores.
              </div>
            )}

            {/* Lista de avaliações */}
            {avals.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4">Nenhuma avaliação ainda. Seja o primeiro!</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {avals
                  .slice()
                  .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                  .map((av) => (
                    <li key={av.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
                          <span className="text-sm font-semibold text-muted-foreground">
                            {av.nomeUsuario[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{av.nomeUsuario}</p>
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

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          {/* CTA WhatsApp */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 flex flex-col gap-3 sticky top-24">
            <h3 className="font-semibold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Entre em contato
            </h3>
            <p className="text-muted-foreground text-sm">
              Fale diretamente com {prestador.nomeProfissional} via WhatsApp para solicitar um orçamento.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl bg-emerald-500 text-white font-semibold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chamar no WhatsApp
            </a>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Phone className="w-4 h-4 shrink-0" />
              <span>({prestador.whatsapp.slice(0,2)}) {prestador.whatsapp.slice(2,7)}-{prestador.whatsapp.slice(7)}</span>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-1">
              A mensagem será enviada automaticamente ao clicar
            </p>
          </div>

          {/* Stats rápidas */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-5 flex flex-col gap-3">
            <h3 className="font-semibold text-foreground text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Estatísticas
            </h3>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground text-sm flex items-center gap-1.5">
                <Users className="w-4 h-4" /> Pessoas atendidas
              </span>
              <span className="font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {prestador.totalAtendidos}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground text-sm flex items-center gap-1.5">
                <Star className="w-4 h-4" /> Avaliações recebidas
              </span>
              <span className="font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {avals.length}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground text-sm">Nota média</span>
              <div className="flex items-center gap-1.5">
                <StarRating value={mediaAtual} size="sm" />
                <span className="font-bold text-foreground text-sm">{mediaAtual.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* Localização */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
            <h3 className="font-semibold text-foreground text-sm mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Região de atendimento
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>{prestador.bairro} — Arinos, MG</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
