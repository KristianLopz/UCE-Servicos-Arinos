import { MapPin, MessageCircle, User, Users } from "lucide-react";
import type { Prestador } from "../data/mockData";
import { getWhatsAppLink } from "../data/mockData";
import { StarRating } from "./StarRating";

interface ProviderCardProps {
  prestador: Prestador;
  onVerPerfil: (id: string) => void;
}

export function ProviderCard({ prestador, onVerPerfil }: ProviderCardProps) {
  const whatsappLink = getWhatsAppLink(prestador.whatsapp, prestador.nomeProfissional);

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center shrink-0 text-2xl">
          {prestador.foto ? (
            <img src={prestador.foto} alt={prestador.nomeProfissional} className="w-full h-full rounded-xl object-cover" />
          ) : (
            <User className="w-7 h-7 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-foreground truncate"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {prestador.nomeProfissional}
          </h3>
          <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-primary mt-1">
            {prestador.categoria}
          </span>
        </div>
      </div>

      {/* Avaliação + atendidos */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StarRating value={prestador.avaliacao} size="sm" />
          <span className="text-sm font-semibold text-foreground">{prestador.avaliacao.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">({prestador.totalAvaliacoes})</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Users className="w-3.5 h-3.5" />
          <span>{prestador.totalAtendidos} atendidos</span>
        </div>
      </div>

      {/* Bairro */}
      <div className="flex items-center gap-1 text-sm text-muted-foreground -mt-1">
        <MapPin className="w-3.5 h-3.5 shrink-0" />
        <span>{prestador.bairro}</span>
      </div>

      {/* Descrição */}
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
        {prestador.descricao}
      </p>

      {/* Botões */}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => onVerPerfil(prestador.id)}
          className="flex-1 py-2 rounded-xl border border-primary text-primary text-sm font-medium hover:bg-secondary transition-colors"
        >
          Ver perfil
        </button>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 rounded-xl bg-emerald-500 text-white text-sm font-medium flex items-center justify-center gap-1.5 hover:bg-emerald-600 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
