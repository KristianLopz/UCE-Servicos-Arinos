import type { Categoria } from "../data/mockData";

interface CategoryCardProps {
  categoria: Categoria;
  onClick: (id: string) => void;
}

export function CategoryCard({ categoria, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={() => onClick(categoria.id)}
      className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-4 flex flex-col items-center gap-2 text-center group"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${categoria.cor}15` }}
      >
        {categoria.icone}
      </div>
      <span className="font-medium text-foreground text-sm leading-tight">{categoria.nome}</span>
      <span className="text-xs text-muted-foreground">{categoria.totalPrestadores} prestadores</span>
    </button>
  );
}
