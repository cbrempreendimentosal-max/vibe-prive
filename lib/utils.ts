export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value);
}

export function statusColor(status: string): string {
  const map: Record<string, string> = {
    ativo: "bg-green-100 text-green-800",
    ativa: "bg-green-100 text-green-800",
    pausado: "bg-yellow-100 text-yellow-800",
    pausada: "bg-yellow-100 text-yellow-800",
    encerrada: "bg-gray-100 text-gray-600",
    rascunho: "bg-blue-100 text-blue-700",
    aprovada: "bg-green-100 text-green-800",
    pendente: "bg-yellow-100 text-yellow-800",
    recusada: "bg-red-100 text-red-700",
  };
  return map[status] ?? "bg-gray-100 text-gray-600";
}

export function statusLabel(status: string): string {
  const map: Record<string, string> = {
    ativo: "Ativo",
    ativa: "Ativa",
    pausado: "Pausado",
    pausada: "Pausada",
    encerrada: "Encerrada",
    rascunho: "Rascunho",
    aprovada: "Aprovada",
    pendente: "Pendente",
    recusada: "Recusada",
  };
  return map[status] ?? status;
}
