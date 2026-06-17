import Header from "@/components/Header";
import { Crown, TrendingUp, Users, DollarSign } from "lucide-react";

const assinaturas = [
  { id: 1, usuario: "marcos_barra", plano: "Mensal", valor: 49.90, status: "ativa", inicio: "2026-06-01", fim: "2026-07-01" },
  { id: 2, usuario: "pedro_k92", plano: "Trimestral", valor: 119.90, status: "ativa", inicio: "2026-05-15", fim: "2026-08-15" },
  { id: 3, usuario: "rafael_vip", plano: "Mensal", valor: 49.90, status: "ativa", inicio: "2026-06-10", fim: "2026-07-10" },
  { id: 4, usuario: "lucas_c", plano: "Diário", valor: 9.90, status: "expirada", inicio: "2026-06-15", fim: "2026-06-16" },
  { id: 5, usuario: "andre_m", plano: "Mensal", valor: 49.90, status: "ativa", inicio: "2026-06-05", fim: "2026-07-05" },
  { id: 6, usuario: "thiago_bh", plano: "Trimestral", valor: 119.90, status: "cancelada", inicio: "2026-04-01", fim: "2026-07-01" },
  { id: 7, usuario: "vitor_rj", plano: "Mensal", valor: 49.90, status: "ativa", inicio: "2026-06-12", fim: "2026-07-12" },
  { id: 8, usuario: "caio_sp", plano: "Diário", valor: 9.90, status: "expirada", inicio: "2026-06-16", fim: "2026-06-17" },
];

const statusStyle: Record<string, string> = {
  ativa: "bg-green-900/50 text-green-400 border border-green-800",
  expirada: "bg-gray-800 text-gray-400 border border-gray-700",
  cancelada: "bg-red-900/50 text-red-400 border border-red-900",
};

const planoStyle: Record<string, string> = {
  Diário: "bg-gray-800 text-gray-300",
  Mensal: "bg-violet-900/60 text-violet-300",
  Trimestral: "bg-amber-900/50 text-amber-300",
};

export default function Assinaturas() {
  const ativas = assinaturas.filter((a) => a.status === "ativa").length;
  const receita = assinaturas
    .filter((a) => a.status === "ativa")
    .reduce((s, a) => s + a.valor, 0);
  const mensal = assinaturas.filter((a) => a.plano === "Mensal" && a.status === "ativa").length;
  const trimestral = assinaturas.filter((a) => a.plano === "Trimestral" && a.status === "ativa").length;

  return (
    <>
      <Header
        title="Assinaturas"
        subtitle="Controle de planos Premium ativos na plataforma"
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPI cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                <Users size={15} className="text-violet-600" />
              </div>
              <p className="text-xs text-gray-500">Assinaturas Ativas</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{ativas}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <DollarSign size={15} className="text-emerald-600" />
              </div>
              <p className="text-xs text-gray-500">Receita Ativa (MRR)</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              R$ {receita.toFixed(2).replace(".", ",")}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                <Crown size={15} className="text-violet-600" />
              </div>
              <p className="text-xs text-gray-500">Plano Mensal</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{mensal}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <TrendingUp size={15} className="text-amber-600" />
              </div>
              <p className="text-xs text-gray-500">Plano Trimestral</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{trimestral}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center gap-2">
            <Crown size={17} className="text-violet-500" />
            <h2 className="font-semibold text-gray-900">Lista de Assinaturas</h2>
          </div>

          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Usuário
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Plano
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Valor
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Início
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Vencimento
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {assinaturas.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-violet-700">
                          {a.usuario.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{a.usuario}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${planoStyle[a.plano]}`}>
                      {a.plano}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-semibold text-gray-900">
                      R$ {a.valor.toFixed(2).replace(".", ",")}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">
                    {new Date(a.inicio).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">
                    {new Date(a.fim).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${statusStyle[a.status]}`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
