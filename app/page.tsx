"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Video, Star, MapPin, ShieldCheck, ArrowRight, Users, Crown, Lock, Heart, Gift } from "lucide-react";

const categories = [
  { id: 1, name: "Acompanhantes VIP", icon: Crown, count: 89, desc: "Perfis premium verificados", vip: false, bgImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600" },
  { id: 2, name: "Massoterapia Premium", icon: Heart, count: 47, desc: "Terapeutas certificadas", vip: false, bgImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600" },
  { id: 3, name: "Conteúdo Exclusivo", icon: Lock, count: 124, desc: "Fotos e vídeos privados", vip: false, bgImage: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=600" },
  { id: 4, name: "Sugar Baby", icon: Gift, count: 32, desc: "Exclusivo assinantes VIP", vip: true, bgImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600" },
];

const anunciantes = [
  { id: 1, name: "Cleia M.", location: "Banibarra", rating: 4.9, initials: "CM", sessions: 142, photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" },
  { id: 2, name: "Frianca A.", location: "Banicarria", rating: 4.9, initials: "FA", sessions: 98, photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" },
  { id: 3, name: "Tatiana B.", location: "Barra", rating: 4.8, initials: "TB", sessions: 203, photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200" },
  { id: 4, name: "Renata S.", location: "Centro", rating: 4.9, initials: "RS", sessions: 167, photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200" },
  { id: 5, name: "Vanessa K.", location: "Cerita", rating: 4.7, initials: "VK", sessions: 85, photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200" },
  { id: 6, name: "Priscila M.", location: "Banibarra", rating: 5.0, initials: "PM", sessions: 231, photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" },
  { id: 7, name: "Camila R.", location: "Pituba", rating: 4.8, initials: "CR", sessions: 76, photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200" },
  { id: 8, name: "Leticia M.", location: "Ondina", rating: 4.7, initials: "LM", sessions: 53, photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200" },
  { id: 9, name: "Sabrina V.", location: "Graça", rating: 4.9, initials: "SV", sessions: 118, photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200" },
  { id: 10, name: "Daniela F.", location: "Itaigara", rating: 4.8, initials: "DF", sessions: 89, photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200" },
];

const aoVivo = [
  { id: 1, name: "Mariana L.", location: "Barra", initials: "ML" },
  { id: 2, name: "Carla T.", location: "Cerita", initials: "CT" },
  { id: 3, name: "Juliana F.", location: "Barra", initials: "JF" },
];

const CIDADES: Record<string, string[]> = {
  BA: ["Salvador", "Feira de Santana", "Vitória da Conquista", "Ilhéus", "Itabuna"],
  SP: ["São Paulo", "Campinas", "Santos", "Ribeirão Preto", "São José dos Campos"],
  RJ: ["Rio de Janeiro", "Niterói", "Petrópolis", "Volta Redonda"],
  MG: ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora"],
  PE: ["Recife", "Olinda", "Caruaru", "Petrolina"],
  CE: ["Fortaleza", "Caucaia", "Juazeiro do Norte"],
  RS: ["Porto Alegre", "Caxias do Sul", "Canoas"],
  PR: ["Curitiba", "Londrina", "Maringá"],
};

export default function PublicHome() {
  const router = useRouter();
  const [estado, setEstado] = useState("BA");
  const [cidade, setCidade] = useState("");
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-sm"
        style={{ backgroundColor: "rgba(10,10,10,0.95)", borderColor: "#1a2a1a" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
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

          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            <Link href="#explorar" className="hover:text-white transition-colors">
              Explorar
            </Link>
            <Link href="#ao-vivo" className="hover:text-white transition-colors">
              Ao Vivo
            </Link>
            <Link href="/premium" className="hover:text-white transition-colors">
              Premium
            </Link>
            <Link href="/painel" className="hover:text-white transition-colors">
              Sou Anunciante
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/premium"
              className="text-sm font-bold px-4 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: "#c9a84c", color: "#0a0a0a" }}
            >
              Seja Premium
            </Link>
          </div>
        </div>
      </header>

      {/* Stats bar */}
      <div className="border-b" style={{ borderColor: "#1a2a1a" }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-center gap-12">
          <div className="text-center">
            <p className="text-2xl font-black" style={{ color: "#c9a84c" }}>312+</p>
            <p className="text-xs text-gray-500 mt-0.5">Anunciantes</p>
          </div>
          <div className="w-px h-8" style={{ backgroundColor: "#1a2a1a" }} />
          <div className="text-center">
            <p className="text-2xl font-black" style={{ color: "#c9a84c" }}>15k+</p>
            <p className="text-xs text-gray-500 mt-0.5">Sessões realizadas</p>
          </div>
          <div className="w-px h-8" style={{ backgroundColor: "#1a2a1a" }} />
          <div className="text-center">
            <p className="text-2xl font-black" style={{ color: "#c9a84c" }}>4.9★</p>
            <p className="text-xs text-gray-500 mt-0.5">Avaliação média</p>
          </div>
        </div>
      </div>

      {/* Hero + Categories */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-2">
        <div className="mb-6">
          <h1 className="text-3xl font-black leading-tight">
            Encontre a companhia perfeita
          </h1>
          <p className="text-sm text-gray-500 mt-1.5">
            Perfis verificados com Vídeo-Check ao vivo
          </p>

          {/* Estado / Cidade selectors */}
          <div className="flex gap-3 mt-4 max-w-xl">
            <select
              value={estado}
              onChange={(e) => { setEstado(e.target.value); setCidade(""); }}
              className="flex-1 rounded-xl px-4 py-3 text-sm font-medium border outline-none cursor-pointer"
              style={{ backgroundColor: "#1a2a1a", borderColor: "#243424", color: "white" }}
            >
              <option value="">Estado</option>
              {Object.keys(CIDADES).map((uf) => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>

            <select
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              className="flex-1 rounded-xl px-4 py-3 text-sm font-medium border outline-none cursor-pointer"
              style={{ backgroundColor: "#1a2a1a", borderColor: "#243424", color: "white" }}
            >
              <option value="">Cidade</option>
              {(CIDADES[estado] ?? []).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="rounded-2xl p-5 border cursor-pointer hover:border-[#c9a84c]/40 transition-all duration-150 group"
              style={{
                backgroundImage: `url('${cat.bgImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                overflow: "hidden",
                borderColor: "#243424",
              }}
            >
              {/* Overlay */}
              <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.65)" }} />

              {/* Content above overlay */}
              <div style={{ position: "relative", zIndex: 10 }}>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 border"
                  style={{ backgroundColor: "rgba(13,26,13,0.8)", borderColor: "rgba(36,52,36,0.8)" }}
                >
                  <cat.icon size={18} style={{ color: "#c9a84c" }} />
                </div>
                <div style={{ position: "relative", zIndex: 10 }} className="flex items-start justify-between gap-1 mb-0.5">
                  <p className="font-bold text-white text-sm group-hover:text-[#c9a84c] transition-colors leading-tight">
                    {cat.name}
                  </p>
                  {cat.vip && (
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded shrink-0 bg-violet-900/60 text-violet-400 border border-violet-800">
                      VIP
                    </span>
                  )}
                </div>
                <p style={{ position: "relative", zIndex: 10 }} className="text-xs text-gray-300">{cat.count} anunciantes</p>
                <p style={{ position: "relative", zIndex: 10 }} className="text-[11px] text-gray-400 mt-0.5">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main content */}
      <section id="explorar" className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex gap-7">
          {/* Cards grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold" style={{ color: "#c9a84c" }}>
                  Anunciantes Verificados
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Vídeo-Check disponível em 1 minuto
                </p>
              </div>
              <div
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border"
                style={{ borderColor: "#1a2a1a", color: "#c9a84c" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: "#c9a84c" }}
                />
                {anunciantes.length} disponíveis
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {anunciantes.map((a) => (
                <div
                  key={a.id}
                  onClick={() => router.push(`/perfil/${a.id}`)}
                  className="rounded-2xl overflow-hidden cursor-pointer group relative"
                  style={{
                    backgroundImage:
                      "photo" in a && a.photo
                        ? `url('${(a.photo as string).replace("?w=200", "?w=400&q=80")}')`
                        : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    aspectRatio: "3 / 4",
                    backgroundColor: "#1a2a1a",
                  }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity group-hover:from-black/80" />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-4">
                    {/* Top: badge + live dot */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border border-green-800/60 backdrop-blur-sm" style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "#4ade80" }}>
                        <ShieldCheck size={9} />
                        Verificada
                      </span>
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    </div>

                    {/* Bottom: name, location, rating, CTA */}
                    <div style={{ position: "relative", zIndex: 10 }}>
                      <p className="font-bold text-white text-base leading-tight">{a.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin size={10} className="text-gray-400 shrink-0" />
                        <span className="text-xs text-gray-300">{a.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Star size={11} style={{ color: "#c9a84c", fill: "#c9a84c" }} />
                        <span className="text-xs font-bold" style={{ color: "#c9a84c" }}>
                          {a.rating.toFixed(1)}
                        </span>
                        <span className="text-[10px] text-gray-400">· {a.sessions} sessões</span>
                      </div>
                      <Link
                        href="/premium"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-opacity hover:opacity-90 active:opacity-80"
                        style={{ backgroundColor: "#c9a84c", color: "#0a0a0a" }}
                      >
                        <Video size={12} />
                        Solicitar Vídeo-Check
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AO VIVO sidebar */}
          <div id="ao-vivo" className="w-72 shrink-0">
            <div
              className="rounded-2xl border overflow-hidden sticky top-24"
              style={{ backgroundColor: "#1a2a1a", borderColor: "#243424" }}
            >
              {/* Sidebar header */}
              <div
                className="px-5 py-4 flex items-center justify-between border-b"
                style={{ borderColor: "#243424" }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <h3 className="font-bold text-white text-sm">Hub Ao Vivo</h3>
                </div>
                <span className="text-[9px] bg-red-600 text-white px-2 py-0.5 rounded font-black tracking-widest">
                  AO VIVO
                </span>
              </div>

              {/* Live profiles */}
              <div className="p-3 space-y-2">
                {aoVivo.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-xl p-3.5 flex items-center gap-3 border cursor-pointer hover:border-[#c9a84c]/30 transition-colors"
                    style={{ backgroundColor: "#0d1a0d", borderColor: "#1a2a1a" }}
                  >
                    {/* Avatar */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm"
                      style={{ backgroundColor: "#1a2a1a", color: "#c9a84c" }}
                    >
                      {p.initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm leading-tight">{p.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin size={9} className="text-gray-600 shrink-0" />
                        <span className="text-[11px] text-gray-500">{p.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.5 rounded font-black tracking-wider">
                        AO VIVO
                      </span>
                      <span className="text-[9px] font-bold text-green-400">
                        DISPONÍVEL AGORA
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 pb-4">
                <button
                  className="w-full py-2.5 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-colors hover:opacity-80"
                  style={{ borderColor: "#c9a84c", color: "#c9a84c" }}
                >
                  Ver todos ao vivo
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section id="sua-vibe" className="max-w-7xl mx-auto px-6 py-10">
        <div
          className="rounded-2xl p-10 text-center border"
          style={{ backgroundColor: "#1a2a1a", borderColor: "#243424" }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 border"
            style={{ backgroundColor: "#0d1a0d", borderColor: "#243424" }}
          >
            <Users size={24} style={{ color: "#c9a84c" }} />
          </div>
          <h2 className="text-2xl font-black mb-2" style={{ color: "#c9a84c" }}>
            Quer anunciar na plataforma?
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8 text-sm leading-relaxed">
            Cadastre-se e conecte-se com clientes em tempo real via Vídeo-Check.
            Taxa de processamento transparente, sem comissão sobre seus resultados.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/painel"
              className="flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl transition-opacity hover:opacity-90 text-sm"
              style={{ backgroundColor: "#c9a84c", color: "#0a0a0a" }}
            >
              Cadastrar agora
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/painel"
              className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
            >
              Acessar painel →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-4" style={{ borderColor: "#1a2a1a" }}>
        <div className="max-w-7xl mx-auto px-6 py-7 flex items-center justify-between text-xs text-gray-600">
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
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Termos</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Privacidade</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Suporte</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
