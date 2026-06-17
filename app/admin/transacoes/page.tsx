import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Badge from "@/components/Badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ArrowLeftRight, Info } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Transacoes() {
  const [transacoes, resumo] = await Promise.all([
    prisma.transacao.findMany({
      orderBy: { criadoEm: "desc" },
      include: { anunciante: true, campanha: true },
    }),
    prisma.transacao.aggregate({
      _sum: { valor: true, taxaProcessamento: true, totalCobrado: true },
      _count: true,
      where: { status: "aprovada" },
    }),
  ]);

  const totalTaxas = resumo._sum.taxaProcessamento ?? 0;
  const totalValor = resumo._sum.valor ?? 0;

  return (
    <>
      <Header
        title="Transações"
        subtitle={`${transacoes.length} transações registradas`}
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">Total Aprovadas</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{resumo._count}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">Volume Total</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalValor)}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">Receita em Taxas</p>
            <p className="text-2xl font-bold text-violet-700 mt-1">{formatCurrency(totalTaxas)}</p>
          </div>
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 flex items-start gap-2">
            <Info size={16} className="text-violet-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-violet-900">Modelo sem comissão</p>
              <p className="text-xs text-violet-700 mt-0.5">
                A plataforma recebe apenas a taxa de processamento por transação.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center gap-2">
            <ArrowLeftRight size={18} className="text-gray-500" />
            <h2 className="font-semibold text-gray-900">Histórico de Transações</h2>
          </div>

          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Descrição</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Anunciante</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Tipo</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Valor</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">
                  Taxa Processamento
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transacoes.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="text-sm text-gray-900">{t.descricao}</p>
                    {t.campanha && (
                      <p className="text-xs text-gray-400 mt-0.5">{t.campanha.titulo}</p>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm text-gray-700">{t.anunciante.nome}</p>
                    <p className="text-xs text-gray-400">{t.anunciante.empresa}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                      {t.tipo}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-900">
                    {formatCurrency(t.valor)}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-medium text-violet-600">
                      {formatCurrency(t.taxaProcessamento)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-bold text-gray-900">
                    {formatCurrency(t.totalCobrado)}
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge status={t.status} />
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">
                    {formatDate(t.criadoEm)}
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
