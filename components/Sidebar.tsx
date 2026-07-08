"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  ArrowLeftRight,
  Settings,
  Percent,
  Crown,
  LogOut,
} from "lucide-react";

const links = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/anunciantes", icon: Users, label: "Anunciantes" },
  { href: "/admin/campanhas", icon: Megaphone, label: "Campanhas" },
  { href: "/admin/transacoes", icon: ArrowLeftRight, label: "Transações" },
  { href: "/admin/taxas", icon: Percent, label: "Taxas" },
  { href: "/admin/assinaturas", icon: Crown, label: "Assinaturas" },
];

export default function Sidebar() {
  const pathname = usePathname();

  if (pathname === "/admin/login") return null;

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center font-bold text-sm">
            VP
          </div>
          <div>
            <p className="font-bold text-sm leading-tight">VibePrive</p>
            <p className="text-xs text-gray-400">Plataforma de Anúncios</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-violet-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <Link
          href="/admin/configuracoes"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <Settings size={18} />
          Configurações
        </Link>
        <Link
          href="/admin/logout"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut size={18} />
          Sair
        </Link>
        <div className="mt-3 px-3 py-2 bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-400">Modelo de receita</p>
          <p className="text-xs font-medium text-violet-400 mt-0.5">
            Taxa de processamento
          </p>
          <p className="text-xs text-gray-500">Sem comissão sobre vendas</p>
        </div>
      </div>
    </aside>
  );
}
