import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Percent, CheckCircle, Info } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Taxas() {
  const [taxas, receitaTotal] = await Promise.all([
    prisma.taxaProcessamento.findMany({ orderBy: { criadoEm: "desc" } }),
    prisma.transacao.aggregate({
      _sum: { taxaProcessamento: true },
      where: { status: "aprovada" },
    }),
  ]);

  return (
    <>
      <Header
        title="Taxas de Processamento"
        subtitle="Modelo de receita sem comissão sobre vendas"
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
          <Info size={18} className="text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-amber-900 text-sm">
              Por que apenas taxa de processamento?
            </p>
            <p className="text-xs text-amber-800 mt-1 leading-relaxed">
              Diferente de plataformas que cobram comissão sobre as vendas ou resultados dos anunciantes,
              o VibePrive adota um modelo justo: cobra apenas uma taxa fixa ou percentual sobre cada
              transação <strong>processada</strong> — não sobre o sucesso da campanha.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs text-gray-500">Taxas Ativas</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {taxas.filter((t) => t.ativo).length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs text-gray-500">Receita Total Arrecadada</p>
            <p className="text-3xl font-bold text-violet-700 mt-1">
              {formatCurrency(receitaTotal._sum.taxaProcessamento ?? 0)}
            </p>
            <p className="text-xs text-gray-400 mt-1">Apenas taxas — zero comissão</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs text-gray-500">Modelo</p>
            <p className="text-lg font-bold text-gray-900 mt-1">Taxa por Transação</p>
            <p className="text-xs text-gray-400 mt-1">Sem comissão sobre orçamento ou resultados</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {taxas.map((taxa) => (
            <div key={taxa.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                    <Percent size={18} className="text-violet-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{taxa.nome}</p>
                    <p className="text-xs text-gray-400 capitalize">{taxa.tipo}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-violet-700">
                    {taxa.tipo === "fixo"
                      ? formatCurrency(taxa.valor)
                      : `${taxa.valor}%`}
                  </span>
                  <p className="text-xs text-gray-400">
                    {taxa.tipo === "fixo" ? "por transação" : "do valor processado"}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600">{taxa.descricao}</p>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs">
                  <CheckCircle
                    size={14}
                    className={taxa.ativo ? "text-green-500" : "text-gray-300"}
                  />
                  <span className={taxa.ativo ? "text-green-700 font-medium" : "text-gray-400"}>
                    {taxa.ativo ? "Ativa" : "Inativa"}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  Criada em {formatDate(taxa.criadoEm)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-xl p-6 text-white">
          <h3 className="font-bold text-lg mb-2">Comparativo: Taxa vs. Comissão</h3>
          <div className="grid grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-green-400 font-semibold text-sm mb-2">✓ VibePrive — Taxa de Processamento</p>
              <ul className="space-y-1 text-xs text-gray-300">
                <li>• Custo fixo e previsível por transação</li>
                <li>• Plataforma não lucra mais com seu sucesso</li>
                <li>• Transparente: anunciante sabe exatamente o custo</li>
                <li>• Incentivo alinhado com volume, não extração de margem</li>
              </ul>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-red-400 font-semibold text-sm mb-2">✗ Modelo de Comissão (outros)</p>
              <ul className="space-y-1 text-xs text-gray-300">
                <li>• Custo variável e imprevisível</li>
                <li>• Plataforma extrai percentual de cada venda</li>
                <li>• Percentual oculto no resultado final</li>
                <li>• Conflito de interesses ao escalar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
