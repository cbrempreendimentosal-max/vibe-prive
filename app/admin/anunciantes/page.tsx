import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Badge from "@/components/Badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Users, Building2, Mail, Phone } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Anunciantes() {
  const anunciantes = await prisma.anunciante.findMany({
    orderBy: { criadoEm: "desc" },
    include: {
      _count: { select: { campanhas: true, transacoes: true } },
    },
  });

  return (
    <>
      <Header
        title="Anunciantes"
        subtitle={`${anunciantes.length} anunciantes cadastrados`}
      />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-gray-500" />
              <h2 className="font-semibold text-gray-900">Lista de Anunciantes</h2>
            </div>
            <button className="bg-violet-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors">
              + Novo Anunciante
            </button>
          </div>

          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Anunciante
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Segmento
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Contato
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Saldo
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Campanhas
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Cadastro
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {anunciantes.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <Link href={`/admin/anunciantes/${a.id}`} className="group">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-violet-100 rounded-lg flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-violet-700">
                            {a.nome.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 group-hover:text-violet-700">
                            {a.nome}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Building2 size={11} />
                            {a.empresa}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-600">{a.segmento}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Mail size={11} />
                        {a.email}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Phone size={11} />
                        {a.telefone}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(a.saldo)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-600">
                      {a._count.campanhas} campanha{a._count.campanhas !== 1 ? "s" : ""}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge status={a.status} />
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-gray-400">
                      {formatDate(a.criadoEm)}
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
