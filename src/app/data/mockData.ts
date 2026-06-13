export interface Categoria {
  id: string;
  nome: string;
  icone: string;
  cor: string;
  totalPrestadores: number;
}

export interface Prestador {
  id: string;
  nomeCompleto: string;
  nomeProfissional: string;
  email: string;
  whatsapp: string;
  categoria: string;
  categoriaId: string;
  descricao: string;
  servicos: string[];
  bairro: string;
  avaliacao: number;          // média calculada (0-5)
  totalAvaliacoes: number;    // quantos usuários avaliaram
  totalAtendidos: number;     // quantos usuários já usaram o serviço
  status: "aguardando" | "aprovado" | "bloqueado";
  destaque: boolean;
}

export interface Avaliacao {
  id: string;
  prestadorId: string;
  usuarioId: string;         // para controle de "já avaliou"
  nomeUsuario: string;
  nota: number;              // 1-5 estrelas (sem comentário)
  data: string;
}

export interface Usuario {
  id: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  tipo: "usuario" | "prestador" | "admin";
}

export const categorias: Categoria[] = [
  { id: "encanador",      nome: "Encanador",          icone: "🔧", cor: "#1a5eb8", totalPrestadores: 5 },
  { id: "eletricista",    nome: "Eletricista",         icone: "⚡", cor: "#f59e0b", totalPrestadores: 7 },
  { id: "jardineiro",     nome: "Jardineiro",          icone: "🌱", cor: "#16a34a", totalPrestadores: 4 },
  { id: "diarista",       nome: "Diarista",            icone: "🏠", cor: "#7c3aed", totalPrestadores: 9 },
  { id: "pedreiro",       nome: "Pedreiro",            icone: "🧱", cor: "#b45309", totalPrestadores: 6 },
  { id: "pintor",         nome: "Pintor",              icone: "🎨", cor: "#db2777", totalPrestadores: 4 },
  { id: "montador",       nome: "Montador de Móveis",  icone: "🪑", cor: "#0891b2", totalPrestadores: 3 },
  { id: "tecnico-celular",nome: "Técnico de Celular",  icone: "📱", cor: "#4f46e5", totalPrestadores: 5 },
  { id: "mecanico",       nome: "Mecânico",            icone: "🚗", cor: "#dc2626", totalPrestadores: 4 },
  { id: "geral",          nome: "Serviços Gerais",     icone: "🛠️", cor: "#64748b", totalPrestadores: 8 },
];

export const bairros = [
  "Centro", "Bairro Alto", "Vila Nova", "Jardim das Flores",
  "Santa Luzia", "São José", "Ipiranga", "Progresso",
];

export const prestadores: Prestador[] = [
  {
    id: "p1",
    nomeCompleto: "Carlos Alberto Ferreira",
    nomeProfissional: "Carlos Encanador",
    email: "carlos.encanador@email.com",
    whatsapp: "38991234567",
    categoria: "Encanador",
    categoriaId: "encanador",
    descricao: "Profissional com mais de 12 anos de experiência em encanamento residencial e comercial. Atendo emergências, instalações, reparos e manutenção preventiva. Trabalho com seriedade e preço justo.",
    servicos: ["Conserto de vazamentos", "Instalação de torneiras", "Desentupimento", "Troca de canos", "Instalação de chuveiro"],
    bairro: "Centro",
    avaliacao: 4.8,
    totalAvaliacoes: 47,
    totalAtendidos: 112,
    status: "aprovado",
    destaque: true,
  },
  {
    id: "p2",
    nomeCompleto: "João Marcos Silva",
    nomeProfissional: "João Eletricista",
    email: "joao.eletricista@email.com",
    whatsapp: "38992345678",
    categoria: "Eletricista",
    categoriaId: "eletricista",
    descricao: "Eletricista certificado com NR-10, especializado em instalações residenciais, comerciais e industriais. Serviços com nota fiscal e garantia. Disponível para emergências.",
    servicos: ["Instalação elétrica completa", "Troca de disjuntores", "Instalação de tomadas", "Iluminação", "Chuveiro elétrico"],
    bairro: "Bairro Alto",
    avaliacao: 4.9,
    totalAvaliacoes: 63,
    totalAtendidos: 178,
    status: "aprovado",
    destaque: true,
  },
  {
    id: "p3",
    nomeCompleto: "Maria das Graças Oliveira",
    nomeProfissional: "Graça Diarista",
    email: "graca.diarista@email.com",
    whatsapp: "38993456789",
    categoria: "Diarista",
    categoriaId: "diarista",
    descricao: "Diarista experiente com 8 anos no mercado. Ofereço serviços de limpeza completa, organização de ambientes e lavagem de roupas. Pontual, confiável e responsável.",
    servicos: ["Limpeza completa", "Faxina geral", "Organização", "Lavagem de roupas", "Passar roupas"],
    bairro: "Vila Nova",
    avaliacao: 4.7,
    totalAvaliacoes: 89,
    totalAtendidos: 241,
    status: "aprovado",
    destaque: true,
  },
  {
    id: "p4",
    nomeCompleto: "Roberto Augusto Santos",
    nomeProfissional: "Roberto Pedreiro",
    email: "roberto.pedreiro@email.com",
    whatsapp: "38994567890",
    categoria: "Pedreiro",
    categoriaId: "pedreiro",
    descricao: "Pedreiro com vasta experiência em construção, reformas e acabamentos. Faço desde pequenos reparos até construções completas. Trabalho com materiais de qualidade.",
    servicos: ["Construção", "Reforma", "Assentamento de piso", "Revestimento cerâmico", "Reboco e massa"],
    bairro: "Jardim das Flores",
    avaliacao: 4.6,
    totalAvaliacoes: 34,
    totalAtendidos: 87,
    status: "aprovado",
    destaque: true,
  },
  {
    id: "p5",
    nomeCompleto: "Ana Paula Costa",
    nomeProfissional: "Ana Jardins",
    email: "ana.jardins@email.com",
    whatsapp: "38995678901",
    categoria: "Jardineiro",
    categoriaId: "jardineiro",
    descricao: "Especialista em paisagismo e manutenção de jardins. Criação de jardins personalizados, poda, plantio e cuidado de plantas. Transformo seu espaço com muito amor e dedicação.",
    servicos: ["Criação de jardins", "Poda", "Plantio", "Manutenção", "Paisagismo"],
    bairro: "Santa Luzia",
    avaliacao: 4.9,
    totalAvaliacoes: 28,
    totalAtendidos: 65,
    status: "aprovado",
    destaque: false,
  },
  {
    id: "p6",
    nomeCompleto: "Luís Henrique Alves",
    nomeProfissional: "Luís Pintor",
    email: "luis.pintor@email.com",
    whatsapp: "38996789012",
    categoria: "Pintor",
    categoriaId: "pintor",
    descricao: "Pintor profissional especializado em pintura interna e externa, textura, grafiato e lavagem de fachadas. Trabalho com tintas de alta qualidade e acabamento impecável.",
    servicos: ["Pintura interna", "Pintura externa", "Textura", "Grafiato", "Lavagem de fachada"],
    bairro: "São José",
    avaliacao: 4.5,
    totalAvaliacoes: 21,
    totalAtendidos: 49,
    status: "aprovado",
    destaque: false,
  },
  {
    id: "p7",
    nomeCompleto: "Fernando Lima",
    nomeProfissional: "Fernando Montador",
    email: "fernando.montador@email.com",
    whatsapp: "38997890123",
    categoria: "Montador de Móveis",
    categoriaId: "montador",
    descricao: "Especialista em montagem e desmontagem de móveis de todos os tipos. Armários, camas, mesas, cadeiras, racks e muito mais. Serviço rápido e sem estresse para você.",
    servicos: ["Montagem de armário", "Montagem de cama", "Montagem de rack", "Desmontagem", "Cozinha planejada"],
    bairro: "Ipiranga",
    avaliacao: 4.7,
    totalAvaliacoes: 55,
    totalAtendidos: 143,
    status: "aprovado",
    destaque: false,
  },
  {
    id: "p8",
    nomeCompleto: "Diego Ferraz",
    nomeProfissional: "Diego Tech Celular",
    email: "diego.tech@email.com",
    whatsapp: "38998901234",
    categoria: "Técnico de Celular",
    categoriaId: "tecnico-celular",
    descricao: "Técnico especializado em conserto e manutenção de celulares de todas as marcas. Troca de tela, bateria, conector e muito mais. Orçamento gratuito e garantia nos serviços.",
    servicos: ["Troca de tela", "Troca de bateria", "Conector de carregamento", "Câmera", "Software"],
    bairro: "Progresso",
    avaliacao: 4.8,
    totalAvaliacoes: 112,
    totalAtendidos: 307,
    status: "aprovado",
    destaque: true,
  },
  {
    id: "p9",
    nomeCompleto: "Antônio Borges",
    nomeProfissional: "Antônio Mecânico",
    email: "antonio.mecanico@email.com",
    whatsapp: "38999012345",
    categoria: "Mecânico",
    categoriaId: "mecanico",
    descricao: "Mecânico automotivo com oficina própria em Arinos. Atendo carros, motos e caminhonetes. Revisão completa, troca de óleo, freios, suspensão e serviços gerais.",
    servicos: ["Revisão geral", "Troca de óleo", "Freios", "Suspensão", "Elétrica automotiva"],
    bairro: "Centro",
    avaliacao: 4.6,
    totalAvaliacoes: 78,
    totalAtendidos: 195,
    status: "aprovado",
    destaque: false,
  },
  {
    id: "p10",
    nomeCompleto: "Patrícia Nascimento",
    nomeProfissional: "Patrícia Serviços Gerais",
    email: "patricia.geral@email.com",
    whatsapp: "38990123456",
    categoria: "Serviços Gerais",
    categoriaId: "geral",
    descricao: "Prestadora de serviços gerais com experiência em diversos tipos de manutenção e reparos residenciais. Prática, rápida e confiável. Faça seu orçamento sem compromisso.",
    servicos: ["Pequenos reparos", "Instalações", "Montagem", "Limpeza especializada", "Outros"],
    bairro: "Vila Nova",
    avaliacao: 4.4,
    totalAvaliacoes: 19,
    totalAtendidos: 38,
    status: "aguardando",
    destaque: false,
  },
];

// Avaliações: apenas estrelas, sem comentário obrigatório
export const avaliacoes: Avaliacao[] = [
  { id: "av1",  prestadorId: "p1", usuarioId: "u1", nomeUsuario: "Fernanda Rocha",    nota: 5, data: "2025-11-15" },
  { id: "av2",  prestadorId: "p1", usuarioId: "u2", nomeUsuario: "Marcos Teixeira",   nota: 5, data: "2025-10-28" },
  { id: "av3",  prestadorId: "p1", usuarioId: "u3", nomeUsuario: "Juliana Freitas",   nota: 4, data: "2025-09-12" },
  { id: "av4",  prestadorId: "p2", usuarioId: "u1", nomeUsuario: "Ricardo Mendes",    nota: 5, data: "2025-11-20" },
  { id: "av5",  prestadorId: "p2", usuarioId: "u4", nomeUsuario: "Camila Souza",      nota: 5, data: "2025-10-05" },
  { id: "av6",  prestadorId: "p3", usuarioId: "u5", nomeUsuario: "Paulo Cardoso",     nota: 5, data: "2025-11-18" },
  { id: "av7",  prestadorId: "p3", usuarioId: "u2", nomeUsuario: "Beatriz Lima",      nota: 4, data: "2025-11-02" },
  { id: "av8",  prestadorId: "p4", usuarioId: "u3", nomeUsuario: "Rafael Borges",     nota: 5, data: "2025-10-15" },
  { id: "av9",  prestadorId: "p4", usuarioId: "u6", nomeUsuario: "Larissa Moura",     nota: 4, data: "2025-09-30" },
  { id: "av10", prestadorId: "p7", usuarioId: "u4", nomeUsuario: "Thiago Nunes",      nota: 5, data: "2025-11-08" },
  { id: "av11", prestadorId: "p7", usuarioId: "u7", nomeUsuario: "Isabela Costa",     nota: 5, data: "2025-10-22" },
  { id: "av12", prestadorId: "p8", usuarioId: "u5", nomeUsuario: "Aline Castro",      nota: 5, data: "2025-12-01" },
  { id: "av13", prestadorId: "p8", usuarioId: "u1", nomeUsuario: "Rodrigo Alves",     nota: 4, data: "2025-11-25" },
  { id: "av14", prestadorId: "p9", usuarioId: "u6", nomeUsuario: "Natália Ferreira",  nota: 5, data: "2025-11-30" },
  { id: "av15", prestadorId: "p9", usuarioId: "u3", nomeUsuario: "Guilherme Santos",  nota: 4, data: "2025-10-18" },
];

/** Calcula distribuição de estrelas (1 a 5) para um prestador */
export function calcularDistribuicao(prestadorId: string, lista: Avaliacao[]) {
  const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  lista.filter((a) => a.prestadorId === prestadorId).forEach((a) => { dist[a.nota]++; });
  return dist;
}

export const getWhatsAppLink = (whatsapp: string, _nomeProfissional: string): string => {
  const numero = whatsapp.replace(/\D/g, "");
  const mensagem = encodeURIComponent(
    "Olá! Encontrei seu perfil no Serviços Arinos e gostaria de solicitar um orçamento."
  );
  return `https://wa.me/55${numero}?text=${mensagem}`;
};
