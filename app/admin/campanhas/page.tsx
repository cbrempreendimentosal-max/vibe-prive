import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Badge from "@/components/Badge";
import { formatCurrency, formatDate, formatNumber } from "@/lib/utils";
import { Megaphone, MousePointerClick, Eye } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Campanhas() {
  const campanhas = await prisma.campanha.findMany({
    orderBy: { criadoEm: "desc" },
    include: { anunciante: true },
  });

  return (
    <>
      <Header
        title="Campanhas"
        subtitle={`${campanhas.length} campanhas cadastradas`}
      />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Megaphone size={18} className="text-gray-500" />
              <h2 className="font-semibold text-gray-900">Lista de Campanhas</h2>
            </div>
            <div className="flex items-center gap-2">
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500">
                <option value="">Todos os status</option>
                <option value="ativa">Ativas</option>
                <option value="pausada">Pausadas</option>
                <option value="encerrada">Encerradas</option>
                <option value="rascunho">Rascunho</option>
              </select>
              <button className="bg-violet-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors">
                + Nova Campanha
              </button>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Campanha
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Anunciante
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Tipo
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Orçamento / Gasto
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Desempenho
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Criada em
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {campanhas.map((c) => {
                const pctGasto = c.orcamento > 0 ? (c.gasto / c.orcamento) * 100 : 0;
                return (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-gray-900">{c.titulo}</p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">{c.descricao}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-gray-700">{c.anunciante.nome}</p>
                      <p className="text-xs text-gray-400">{c.anunciante.empresa}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                        {c.tipo}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(c.gasto)}{" "}
                        <span className="text-gray-400 font-normal">
                          / {formatCurrency(c.orcamento)}
                        </span>
                      </p>
                      <div className="mt-1 w-32 bg-gray-100 rounded-full h-1.5">
                        <div
                          className="bg-violet-500 h-1.5 rounded-full"
                          style={{ width: `${Math.min(pctGasto, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{pctGasto.toFixed(0)}% utilizado</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Eye size={12} />
                        {formatNumber(c.impressoes)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                        <MousePointerClick size={12} />
                        {formatNumber(c.cliques)}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge status={c.status} />
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-gray-400">{formatDate(c.criadoEm)}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
