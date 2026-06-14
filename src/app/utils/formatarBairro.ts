export function formatarBairro(valor: string) {
  if (!valor) return "";

  // Remove espaços duplicados e trim
  let v = valor.replace(/\s+/g, " ").trim();

  // Converter para Title Case (cada palavra com inicial maiúscula)
  v = v
    .toLowerCase()
    .split(" ")
    .map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");

  return v;
}

export function normalizarBairroParaComparacao(valor: string) {
  return (valor || "").replace(/\s+/g, " ").trim().toLowerCase();
}
