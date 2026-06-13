import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  /** Valor atual (0-5) */
  value: number;
  /** Se true, o usuário pode interagir */
  interactive?: boolean;
  onChange?: (nota: number) => void;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export function StarRating({ value, interactive = false, onChange, size = "md" }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  const display = interactive && hovered > 0 ? hovered : value;
  const cls = sizeMap[size];

  return (
    <div
      className="flex items-center gap-0.5"
      onMouseLeave={() => interactive && setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= display;
        const halfFilled = !filled && n - 0.5 <= display;
        return (
          <button
            key={n}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(n)}
            onMouseEnter={() => interactive && setHovered(n)}
            className={`transition-transform ${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
          >
            <Star
              className={`${cls} transition-colors ${
                filled
                  ? "fill-amber-400 text-amber-400"
                  : halfFilled
                  ? "fill-amber-200 text-amber-400"
                  : "fill-none text-muted/40"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

interface RatingBarProps {
  estrela: number;
  count: number;
  total: number;
}

export function RatingBar({ estrela, count, total }: RatingBarProps) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground w-2 text-right shrink-0">{estrela}</span>
      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-muted-foreground w-6 text-right shrink-0">{count}</span>
    </div>
  );
}
