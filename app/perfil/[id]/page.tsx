import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Video,
  Star,
  MapPin,
  ShieldCheck,
  MessageCircle,
  ArrowLeft,
  Clock,
  Lock,
} from "lucide-react";

type Profile = {
  id: number;
  name: string;
  location: string;
  rating: number;
  sessions: number;
  initials: string;
  badge: string;
  age: number;
  bio: string;
  photo?: string;
  services: { name: string; duration: string; price: number }[];
  avail: Record<string, string[]>;
};

const profiles: Profile[] = [
  {
    id: 1,
    name: "Cleia M.",
    location: "Banibarra",
    rating: 4.9,
    sessions: 142,
    initials: "CM",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    badge: "Vídeo Verificado",
    age: 28,
    bio: "Perfil verificado com badge Vídeo-Check ativo. Atendo com discrição e profissionalismo, disponível para sessões ao vivo e agendamentos com antecedência.",
    services: [
      { name: "Vídeo-Check (1 min)", duration: "1 min", price: 50 },
      { name: "Vídeo Privado", duration: "15 min", price: 120 },
      { name: "Sessão Premium", duration: "30 min", price: 200 },
    ],
    avail: {
      Seg: ["tarde", "noite"],
      Ter: ["tarde", "noite"],
      Qua: ["tarde"],
      Qui: ["noite"],
      Sex: ["tarde", "noite"],
      Sáb: ["manhã", "tarde", "noite"],
      Dom: ["manhã"],
    },
  },
  {
    id: 2,
    name: "Frianca A.",
    location: "Banicarria",
    rating: 4.9,
    sessions: 98,
    initials: "FA",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    badge: "Vídeo Verificado",
    age: 25,
    bio: "Anunciante verificada na região de Banicarria. Disponível nas tardes e noites, com foco em atendimento personalizado e discreto.",
    services: [
      { name: "Vídeo-Check (1 min)", duration: "1 min", price: 50 },
      { name: "Vídeo Privado", duration: "15 min", price: 110 },
      { name: "Sessão Premium", duration: "30 min", price: 190 },
    ],
    avail: {
      Seg: [],
      Ter: ["tarde", "noite"],
      Qua: ["tarde", "noite"],
      Qui: ["tarde", "noite"],
      Sex: ["noite"],
      Sáb: ["manhã", "tarde"],
      Dom: [],
    },
  },
  {
    id: 3,
    name: "Tatiana B.",
    location: "Barra",
    rating: 4.8,
    sessions: 203,
    initials: "TB",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200",
    badge: "Premium",
    age: 30,
    bio: "Perfil Premium na Barra com alto índice de satisfação. Mais de 200 sessões concluídas com excelência. Experiente e discreta.",
    services: [
      { name: "Vídeo-Check (1 min)", duration: "1 min", price: 50 },
      { name: "Vídeo Privado", duration: "15 min", price: 140 },
      { name: "Sessão VIP", duration: "45 min", price: 280 },
    ],
    avail: {
      Seg: ["tarde"],
      Ter: ["tarde", "noite"],
      Qua: ["manhã", "tarde", "noite"],
      Qui: ["tarde", "noite"],
      Sex: ["tarde", "noite"],
      Sáb: ["manhã", "tarde", "noite"],
      Dom: ["tarde", "noite"],
    },
  },
  {
    id: 4,
    name: "Renata S.",
    location: "Centro",
    rating: 4.9,
    sessions: 167,
    initials: "RS",
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200",
    badge: "Premium",
    age: 27,
    bio: "Localizada no Centro com fácil acesso. Perfil Premium com agenda flexível e alta taxa de retorno de clientes satisfeitos.",
    services: [
      { name: "Vídeo-Check (1 min)", duration: "1 min", price: 50 },
      { name: "Vídeo Privado", duration: "15 min", price: 130 },
      { name: "Sessão Premium", duration: "30 min", price: 220 },
    ],
    avail: {
      Seg: ["manhã", "tarde"],
      Ter: ["manhã", "tarde"],
      Qua: ["tarde", "noite"],
      Qui: ["manhã", "tarde", "noite"],
      Sex: ["tarde", "noite"],
      Sáb: ["tarde", "noite"],
      Dom: [],
    },
  },
  {
    id: 5,
    name: "Vanessa K.",
    location: "Cerita",
    rating: 4.7,
    sessions: 85,
    initials: "VK",
    photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200",
    badge: "Vídeo Verificado",
    age: 23,
    bio: "Perfil verificado em Cerita. Agenda disponível nos fins de semana e tardes da semana. Atendimento descontraído e atencioso.",
    services: [
      { name: "Vídeo-Check (1 min)", duration: "1 min", price: 50 },
      { name: "Vídeo Privado", duration: "15 min", price: 100 },
      { name: "Sessão Premium", duration: "30 min", price: 180 },
    ],
    avail: {
      Seg: [],
      Ter: ["tarde"],
      Qua: ["tarde"],
      Qui: ["tarde"],
      Sex: ["tarde", "noite"],
      Sáb: ["manhã", "tarde", "noite"],
      Dom: ["manhã", "tarde"],
    },
  },
  {
    id: 6,
    name: "Priscila M.",
    location: "Banibarra",
    rating: 5.0,
    sessions: 231,
    initials: "PM",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    badge: "VIP",
    age: 29,
    bio: "Perfil VIP com avaliação perfeita e maior número de sessões da plataforma. Atendimento exclusivo e completamente personalizado.",
    services: [
      { name: "Vídeo-Check (1 min)", duration: "1 min", price: 50 },
      { name: "Vídeo Privado", duration: "15 min", price: 150 },
      { name: "Sessão VIP Exclusiva", duration: "60 min", price: 350 },
    ],
    avail: {
      Seg: ["noite"],
      Ter: ["tarde", "noite"],
      Qua: ["tarde", "noite"],
      Qui: ["tarde", "noite"],
      Sex: ["tarde", "noite"],
      Sáb: ["manhã", "tarde", "noite"],
      Dom: ["tarde", "noite"],
    },
  },
  {
    id: 7,
    name: "Camila R.",
    location: "Pituba",
    rating: 4.8,
    sessions: 76,
    initials: "CR",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    badge: "Vídeo Verificado",
    age: 26,
    bio: "Perfil verificado em Pituba com ótima avaliação. Atende com simpatia e profissionalismo, agenda disponível durante a semana e fins de semana.",
    services: [
      { name: "Vídeo-Check (1 min)", duration: "1 min", price: 50 },
      { name: "Vídeo Privado", duration: "15 min", price: 115 },
      { name: "Sessão Premium", duration: "30 min", price: 195 },
    ],
    avail: {
      Seg: ["tarde", "noite"],
      Ter: ["tarde"],
      Qua: ["tarde", "noite"],
      Qui: ["tarde", "noite"],
      Sex: ["noite"],
      Sáb: ["manhã", "tarde", "noite"],
      Dom: ["manhã", "tarde"],
    },
  },
  {
    id: 8,
    name: "Leticia M.",
    location: "Ondina",
    rating: 4.7,
    sessions: 53,
    initials: "LM",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
    badge: "Vídeo Verificado",
    age: 24,
    bio: "Verificada em Ondina, próximo à praia. Disponível para sessões ao vivo e agendamentos flexíveis, atendimento descontraído e atencioso.",
    services: [
      { name: "Vídeo-Check (1 min)", duration: "1 min", price: 50 },
      { name: "Vídeo Privado", duration: "15 min", price: 105 },
      { name: "Sessão Premium", duration: "30 min", price: 175 },
    ],
    avail: {
      Seg: [],
      Ter: ["tarde", "noite"],
      Qua: ["tarde", "noite"],
      Qui: ["tarde"],
      Sex: ["tarde", "noite"],
      Sáb: ["manhã", "tarde", "noite"],
      Dom: ["tarde"],
    },
  },
  {
    id: 9,
    name: "Sabrina V.",
    location: "Graça",
    rating: 4.9,
    sessions: 118,
    initials: "SV",
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200",
    badge: "Premium",
    age: 28,
    bio: "Perfil Premium de alta avaliação na Graça. Discreta e atenciosa, com disponibilidade nas tardes e noites e excelente taxa de retorno.",
    services: [
      { name: "Vídeo-Check (1 min)", duration: "1 min", price: 50 },
      { name: "Vídeo Privado", duration: "15 min", price: 135 },
      { name: "Sessão VIP", duration: "45 min", price: 260 },
    ],
    avail: {
      Seg: ["tarde", "noite"],
      Ter: ["tarde", "noite"],
      Qua: ["noite"],
      Qui: ["tarde", "noite"],
      Sex: ["tarde", "noite"],
      Sáb: ["manhã", "tarde", "noite"],
      Dom: ["tarde", "noite"],
    },
  },
  {
    id: 10,
    name: "Daniela F.",
    location: "Itaigara",
    rating: 4.8,
    sessions: 89,
    initials: "DF",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    badge: "Vídeo Verificado",
    age: 27,
    bio: "Anunciante verificada no Itaigara com grande experiência na plataforma. Alta taxa de retorno de clientes e agenda organizada.",
    services: [
      { name: "Vídeo-Check (1 min)", duration: "1 min", price: 50 },
      { name: "Vídeo Privado", duration: "15 min", price: 120 },
      { name: "Sessão Premium", duration: "30 min", price: 210 },
    ],
    avail: {
      Seg: ["tarde"],
      Ter: ["tarde", "noite"],
      Qua: ["tarde", "noite"],
      Qui: ["tarde", "noite"],
      Sex: ["tarde", "noite"],
      Sáb: ["manhã", "tarde", "noite"],
      Dom: ["tarde"],
    },
  },
];

const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const PERIODS = [
  { key: "manhã", label: "Manhã" },
  { key: "tarde", label: "Tarde" },
  { key: "noite", label: "Noite" },
];

const badgeStyle: Record<string, string> = {
  "Vídeo Verificado": "bg-green-900/60 text-green-400 border-green-800",
  Premium: "bg-amber-900/60 text-amber-400 border-amber-800",
  VIP: "bg-violet-900/60 text-violet-400 border-violet-800",
};

export default async function PerfilPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = profiles.find((p) => p.id === Number(id));
  if (!profile) notFound();

  const minPrice = Math.min(...profile.services.map((s) => s.price));

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-sm"
        style={{ backgroundColor: "rgba(10,10,10,0.95)", borderColor: "#1a2a1a" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
              style={{ backgroundColor: "#1a2a1a", color: "#c9a84c" }}
            >
              VP
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ color: "#c9a84c" }}>
              Vibe Privê
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={15} />
            Voltar
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Profile hero */}
        <div
          className="rounded-2xl p-7 border mb-7"
          style={{ backgroundColor: "#1a2a1a", borderColor: "#243424" }}
        >
          <div className="flex items-center gap-6">
            {profile.photo ? (
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-24 h-24 rounded-2xl object-cover shrink-0"
              />
            ) : (
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center shrink-0 font-black text-3xl"
                style={{ backgroundColor: "#0d1a0d", color: "#c9a84c" }}
              >
                {profile.initials}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-black text-white">{profile.name}</h1>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${badgeStyle[profile.badge]}`}
                >
                  <ShieldCheck size={11} />
                  {profile.badge}
                </span>
              </div>

              <div className="flex items-center gap-1.5 mt-1.5">
                <MapPin size={12} className="text-gray-500 shrink-0" />
                <span className="text-sm text-gray-400">{profile.location}</span>
                <span className="text-gray-700 mx-1">·</span>
                <span className="text-sm text-gray-500">{profile.age} anos</span>
              </div>

              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Star size={14} style={{ color: "#c9a84c", fill: "#c9a84c" }} />
                  <span className="font-bold text-sm" style={{ color: "#c9a84c" }}>
                    {profile.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-500">avaliação</span>
                </div>
                <span className="text-gray-700">·</span>
                <span className="text-xs text-gray-500">
                  {profile.sessions} sessões concluídas
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-7">
          {/* Left: content sections */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* Sobre */}
            <div
              className="rounded-2xl p-6 border"
              style={{ backgroundColor: "#1a2a1a", borderColor: "#243424" }}
            >
              <h2 className="font-bold text-white mb-3 text-sm">Sobre</h2>
              <p className="text-sm text-gray-400 leading-relaxed">{profile.bio}</p>
            </div>

            {/* Serviços */}
            <div
              className="rounded-2xl p-6 border"
              style={{ backgroundColor: "#1a2a1a", borderColor: "#243424" }}
            >
              <h2 className="font-bold text-white mb-4 text-sm">Serviços</h2>
              <div className="space-y-3">
                {profile.services.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3.5 rounded-xl border"
                    style={{ backgroundColor: "#0d1a0d", borderColor: "#243424" }}
                  >
                    <div className="flex items-center gap-3">
                      <Clock size={13} className="text-gray-500 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-white">{s.name}</p>
                        <p className="text-xs text-gray-500">{s.duration}</p>
                      </div>
                    </div>
                    <span className="font-black text-sm" style={{ color: "#c9a84c" }}>
                      R$ {s.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Disponibilidade */}
            <div
              className="rounded-2xl p-6 border"
              style={{ backgroundColor: "#1a2a1a", borderColor: "#243424" }}
            >
              <h2 className="font-bold text-white mb-4 text-sm">Disponibilidade</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr>
                      <th className="text-left text-gray-600 font-medium py-2 pr-4 w-16">
                        Período
                      </th>
                      {DAYS.map((d) => (
                        <th
                          key={d}
                          className="text-center text-gray-500 font-medium py-2 px-2"
                        >
                          {d}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PERIODS.map((p) => (
                      <tr key={p.key}>
                        <td className="text-gray-600 py-2 pr-4 whitespace-nowrap">
                          {p.label}
                        </td>
                        {DAYS.map((d) => {
                          const on = (profile.avail[d] ?? []).includes(p.key);
                          return (
                            <td key={d} className="text-center py-2 px-2">
                              <div
                                className="w-7 h-7 rounded-lg mx-auto flex items-center justify-center"
                                style={{
                                  backgroundColor: on ? "#1a3a1a" : "#0d1a0d",
                                  border: `1px solid ${on ? "#2a5a2a" : "#1a2a1a"}`,
                                }}
                              >
                                {on && (
                                  <span
                                    className="w-2.5 h-2.5 rounded-sm"
                                    style={{ backgroundColor: "#c9a84c" }}
                                  />
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right: booking panel */}
          <div className="w-72 shrink-0">
            <div
              className="rounded-2xl border p-5 sticky top-24"
              style={{ backgroundColor: "#1a2a1a", borderColor: "#243424" }}
            >
              <div className="mb-5">
                <p className="text-xs text-gray-500 mb-0.5">A partir de</p>
                <p className="text-3xl font-black" style={{ color: "#c9a84c" }}>
                  R$ {minPrice}
                </p>
                <p className="text-xs text-gray-600 mt-0.5">por sessão</p>
              </div>

              <Link
                href="/premium"
                className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-opacity hover:opacity-90 mb-3"
                style={{ backgroundColor: "#c9a84c", color: "#0a0a0a" }}
              >
                <Video size={15} />
                Solicitar Vídeo-Check (1 min)
              </Link>

              <Link
                href="/premium"
                className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-opacity hover:opacity-80 border"
                style={{ borderColor: "#243424", color: "#c9a84c" }}
              >
                <MessageCircle size={15} />
                Contato via WhatsApp
              </Link>

              <div
                className="mt-4 rounded-xl p-3.5 flex items-start gap-2.5"
                style={{ backgroundColor: "#0d1a0d" }}
              >
                <Lock size={13} className="text-gray-500 mt-0.5 shrink-0" />
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Contato e agendamento disponíveis apenas para assinantes Premium.
                </p>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={12} className="text-green-500 shrink-0" />
                  <span className="text-xs text-gray-500">Identidade verificada</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star
                    size={12}
                    style={{ color: "#c9a84c", fill: "#c9a84c" }}
                  />
                  <span className="text-xs text-gray-500">
                    {profile.sessions} sessões concluídas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-8" style={{ borderColor: "#1a2a1a" }}>
        <div className="max-w-6xl mx-auto px-6 py-7 flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded flex items-center justify-center font-black text-[9px]"
              style={{ backgroundColor: "#1a2a1a", color: "#c9a84c" }}
            >
              VP
            </div>
            <span>© 2026 Vibe Privê</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-gray-400 cursor-pointer transition-colors">
              Termos
            </span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">
              Privacidade
            </span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">
              Suporte
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
