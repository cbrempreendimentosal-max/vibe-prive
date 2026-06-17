import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Badge from "@/components/Badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Building2, Mail, Phone, Megaphone, ArrowLeftRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AnunciantePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const anunciante = await prisma.anunciante.findUnique({
    where: { id },
    include: {
      campanhas: { orderBy: { criadoEm: "desc" } },
      transacoes: { orderBy: { criadoEm: "desc" }, take: 10 },
    },
  });

  if (!anunciante) notFound();

  const totalGasto = anunciante.campanhas.reduce((s, c) => s + c.gasto, 0);
  const totalTaxas = anunciante.transacoes.reduce(
    (s, t) => s + t.taxaProcessamento,
    0
  );

  return (
    <>
      <Header title={anunciante.nome} subtitle={anunciante.empresa} />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-violet-700">
                  {anunciante.nome.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{anunciante.nome}</p>
                <Badge status={anunciante.status} />
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building2 size={14} className="text-gray-400" />
                {anunciante.empresa}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={14} className="text-gray-400" />
                {anunciante.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={14} className="text-gray-400" />
                {anunciante.telefone}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-400">Segmento</p>
              <p className="text-sm font-medium text-gray-900">{anunciante.segmento}</p>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-400">Cadastrado em</p>
              <p className="text-sm font-medium text-gray-900">
                {formatDate(anunciante.criadoEm)}
              </p>
            </div>
          </div>

          <div className="col-span-2 grid grid-cols-3 gap-4 content-start">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-xs text-gray-500">Saldo Disponível</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(anunciante.saldo)}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-xs text-gray-500">Total Gasto em Campanhas</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(totalGasto)}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-xs text-gray-500">Total em Taxas (processamento)</p>
              <p className="text-2xl font-bold text-violet-700 mt-1">
                {formatCurrency(totalTaxas)}
              </p>
              <p className="text-xs text-gray-400 mt-1">Sem comissão cobrada</p>
            </div>

            <div className="col-span-3 bg-white rounded-xl border border-gray-200">
              <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                <Megaphone size={16} className="text-gray-500" />
                <h3 className="font-semibold text-gray-900 text-sm">
                  Campanhas ({anunciante.campanhas.length})
                </h3>
              </div>
              <div className="divide-y divide-gray-50">
                {anunciante.campanhas.length === 0 && (
                  <p className="px-4 py-6 text-sm text-gray-400 text-center">
                    Nenhuma campanha cadastrada.
                  </p>
                )}
                {anunciante.campanhas.map((c) => (
                  <div key={c.id} className="px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{c.titulo}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {c.tipo} · {formatDate(c.criadoEm)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Orçamento</p>
                        <p className="text-sm font-semibold">{formatCurrency(c.orcamento)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Gasto</p>
                        <p className="text-sm font-semibold">{formatCurrency(c.gasto)}</p>
                      </div>
                      <Badge status={c.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-5 border-b border-gray-100 flex items-center gap-2">
            <ArrowLeftRight size={16} className="text-gray-500" />
            <h3 className="font-semibold text-gray-900">Transações Recentes</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Descrição</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Tipo</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Valor</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Taxa</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {anunciante.transacoes.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-sm text-gray-900">{t.descricao}</td>
                  <td className="px-5 py-3 text-sm text-gray-500 capitalize">{t.tipo}</td>
                  <td className="px-5 py-3 text-sm font-medium">{formatCurrency(t.valor)}</td>
                  <td className="px-5 py-3 text-sm text-violet-600">
                    {formatCurrency(t.taxaProcessamento)}
                  </td>
                  <td className="px-5 py-3 text-sm font-semibold">
                    {formatCurrency(t.totalCobrado)}
                  </td>
                  <td className="px-5 py-3">
                    <Badge status={t.status} />
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-400">{formatDate(t.criadoEm)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
