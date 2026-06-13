import type { ReactNode } from "react";

interface DashboardCardProps {
  titulo: string;
  valor: number | string;
  icone: ReactNode;
  cor?: string;
  subtitulo?: string;
}

export function DashboardCard({ titulo, valor, icone, cor = "#1a5eb8", subtitulo }: DashboardCardProps) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm p-6 flex items-center gap-4">
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${cor}15` }}
      >
        <div style={{ color: cor }}>{icone}</div>
      </div>
      <div>
        <p className="text-muted-foreground text-sm">{titulo}</p>
        <p className="font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.75rem", lineHeight: 1 }}>
          {valor}
        </p>
        {subtitulo && <p className="text-xs text-muted-foreground mt-1">{subtitulo}</p>}
      </div>
    </div>
  );
}
