import Header from "@/components/Header";
import { Users, DollarSign, Crown, TrendingUp, UserCheck } from "lucide-react";

const TOTAL_ANUNCIANTES = 6;
const TOTAL_CLIENTES = 1247;
const RECEITA_TAXAS = 23.92;

const PREMIUM_ATIVOS = 4;
const VIP_ATIVOS = 1;
const PREMIUM_PRICE = 49.9;
const VIP_PRICE = 249.0;

const mrr_premium = PREMIUM_ATIVOS * PREMIUM_PRICE;
const mrr_vip = VIP_ATIVOS * VIP_PRICE;
const mrr_total = mrr_premium + mrr_vip;

function fmt(n: number) {
  return n.toFixed(2).replace(".", ",");
}

export default function AdminDashboard() {
  return (
    <>
      <Header title="Dashboard" subtitle="Visão geral da plataforma Vibe Privê" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                <Users size={15} className="text-violet-600" />
              </div>
              <p className="text-xs text-gray-500">Total Anunciantes</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{TOTAL_ANUNCIANTES}</p>
            <p className="text-xs text-gray-400 mt-1">perfis ativos na plataforma</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserCheck size={15} className="text-blue-600" />
              </div>
              <p className="text-xs text-gray-500">Total Clientes</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {TOTAL_CLIENTES.toLocaleString("pt-BR")}
            </p>
            <p className="text-xs text-gray-400 mt-1">usuários cadastrados</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <DollarSign size={15} className="text-emerald-600" />
              </div>
              <p className="text-xs text-gray-500">Receita em Taxas</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">R$ {fmt(RECEITA_TAXAS)}</p>
            <p className="text-xs text-gray-400 mt-1">taxas processadas (aprovadas)</p>
          </div>
        </div>

        {/* Assinaturas */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown size={17} className="text-amber-500" />
              <h2 className="font-semibold text-gray-900">Assinaturas</h2>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp size={13} className="text-emerald-500" />
              <span className="text-xs text-emerald-600 font-semibold">
                MRR total R$ {fmt(mrr_total)}
              </span>
            </div>
          </div>

          <div className="p-5 grid grid-cols-2 gap-4">
            {/* Premium card */}
            <div className="rounded-xl p-5 border border-violet-200 bg-violet-50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-bold text-violet-700 uppercase tracking-wide">
                    Assinantes Premium
                  </p>
                  <p className="text-xs text-violet-500 mt-0.5">R$ 49,90 / mês</p>
                </div>
                <div className="w-8 h-8 bg-violet-200 rounded-lg flex items-center justify-center">
                  <Crown size={14} className="text-violet-700" />
                </div>
              </div>

              <p className="text-4xl font-black text-violet-700">{PREMIUM_ATIVOS}</p>
              <p className="text-xs text-violet-500 mt-1">assinantes ativos</p>

              <div className="mt-4 pt-4 border-t border-violet-200">
                <p className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">MRR</p>
                <p className="text-lg font-black text-violet-700 mt-0.5">
                  R$ {fmt(mrr_premium)}
                </p>
              </div>
            </div>

            {/* VIP card */}
            <div className="rounded-xl p-5 border border-amber-200 bg-amber-50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                    Assinantes VIP
                  </p>
                  <p className="text-xs text-amber-600 mt-0.5">R$ 249,00 / mês</p>
                </div>
                <div className="w-8 h-8 bg-amber-200 rounded-lg flex items-center justify-center">
                  <Crown size={14} className="text-amber-700" />
                </div>
              </div>

              <p className="text-4xl font-black text-amber-700">{VIP_ATIVOS}</p>
              <p className="text-xs text-amber-600 mt-1">assinantes ativos</p>

              <div className="mt-4 pt-4 border-t border-amber-200">
                <p className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">MRR</p>
                <p className="text-lg font-black text-amber-700 mt-0.5">
                  R$ {fmt(mrr_vip)}
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 pb-5">
            <div className="rounded-xl bg-gray-50 border border-gray-100 px-5 py-4 flex items-center justify-between">
              <span className="text-sm text-gray-500 font-medium">MRR Total (assinaturas)</span>
              <span className="text-xl font-black text-gray-900">R$ {fmt(mrr_total)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
