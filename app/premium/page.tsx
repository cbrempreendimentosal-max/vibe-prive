"use client";

import Link from "next/link";
import { Video, ShieldCheck, MessageCircle, Star, Lock, Crown, Zap, ArrowRight, Check } from "lucide-react";

const benefits = [
  {
    icon: Video,
    title: "Vídeo-Check de 1 minuto",
    desc: "Solicite um vídeo ao vivo de qualquer anunciante verificada para confirmar que é real, antes de qualquer contato.",
  },
  {
    icon: ShieldCheck,
    title: "Perfis 100% verificados",
    desc: "Acesse perfis com badge de verificação ativa — fotos reais confirmadas pela plataforma.",
  },
  {
    icon: MessageCircle,
    title: "Contato direto via WhatsApp",
    desc: "Desbloqueie o número de WhatsApp das anunciantes para agendamento direto e rápido.",
  },
  {
    icon: Star,
    title: "Perfis exclusivos Premium & VIP",
    desc: "Acesse anunciantes com perfil Premium e VIP, visíveis apenas para assinantes.",
  },
  {
    icon: Zap,
    title: "Prioridade no atendimento",
    desc: "Seu contato é destacado para as anunciantes — resposta mais rápida garantida.",
  },
  {
    icon: Lock,
    title: "Conteúdo exclusivo desbloqueado",
    desc: "Galeria de fotos completa e conteúdo privado disponível apenas para membros premium.",
  },
];

const plans = [
  {
    id: "premium",
    label: "Premium",
    price: "49,90",
    period: "/mês",
    highlight: true,
    badge: "MAIS POPULAR",
    features: [
      "Acesso a todas as anunciantes",
      "Vídeo-Check ilimitado (1 min)",
      "WhatsApp direto com anunciantes",
      "Perfis Premium verificados",
      "Conteúdo exclusivo desbloqueado",
      "Prioridade no atendimento",
    ],
  },
  {
    id: "vip",
    label: "VIP",
    price: "249,00",
    period: "/mês",
    highlight: false,
    badge: "ACESSO TOTAL",
    features: [
      "Todos os benefícios Premium",
      "Acesso à categoria Sugar Baby",
      "Perfis VIP exclusivos",
      "Atendimento prioritário 24h",
      "Acesso antecipado a novos perfis",
      "Suporte dedicado",
    ],
  },
];

export default function PremiumPage() {
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-sm"
        style={{ backgroundColor: "rgba(10,10,10,0.95)", borderColor: "#1a2a1a" }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
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
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            ← Voltar
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-10 text-center">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 border"
          style={{ backgroundColor: "#1a2a1a", borderColor: "#243424" }}
        >
          <Crown size={13} style={{ color: "#c9a84c" }} />
          <span className="text-xs font-bold tracking-wider" style={{ color: "#c9a84c" }}>
            ACESSO PREMIUM
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
          Desbloqueie o{" "}
          <span style={{ color: "#c9a84c" }}>Vibe Privê</span>
          <br />
          completo
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
          Acesse o <strong className="text-white">Vídeo-Check de 1 minuto</strong> com qualquer
          anunciante verificada e todos os recursos exclusivos da plataforma.
        </p>
      </section>

      {/* Benefits grid */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-lg font-bold mb-6" style={{ color: "#c9a84c" }}>
          O que você desbloqueia
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl p-5 border"
              style={{ backgroundColor: "#1a2a1a", borderColor: "#243424" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border"
                style={{ backgroundColor: "#0d1a0d", borderColor: "#1a2a1a" }}
              >
                <Icon size={18} style={{ color: "#c9a84c" }} />
              </div>
              <p className="font-bold text-white text-sm mb-1">{title}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlight: Vídeo-Check */}
      <section className="max-w-5xl mx-auto px-6 py-6">
        <div
          className="rounded-2xl p-7 border flex gap-6 items-center"
          style={{ backgroundColor: "#1a2a1a", borderColor: "#c9a84c33" }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border"
            style={{ backgroundColor: "#0d1a0d", borderColor: "#c9a84c33" }}
          >
            <Video size={28} style={{ color: "#c9a84c" }} />
          </div>
          <div className="flex-1">
            <p className="font-black text-lg text-white mb-1">
              Vídeo-Check de 1 minuto — o diferencial do Vibe Privê
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Antes de qualquer contato, solicite um vídeo ao vivo de 1 minuto com a anunciante.
              Você vê que é real, ela confirma disponibilidade. Zero catfish, zero surpresa.
              Exclusivo para assinantes Premium.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-lg font-bold mb-6 text-center" style={{ color: "#c9a84c" }}>
          Escolha seu plano
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-2xl p-6 border flex flex-col relative"
              style={{
                backgroundColor: plan.highlight ? "#1a2a1a" : "#111811",
                borderColor: plan.highlight ? "#c9a84c" : "#1a2a1a",
              }}
            >
              {plan.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black px-3 py-1 rounded-full tracking-widest"
                  style={{
                    backgroundColor: plan.highlight ? "#c9a84c" : "#1a2a1a",
                    color: plan.highlight ? "#0a0a0a" : "#c9a84c",
                    border: plan.highlight ? "none" : "1px solid #c9a84c",
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <p className="font-bold text-gray-300 text-sm mb-3">{plan.label}</p>
              <div className="flex items-end gap-1 mb-5">
                <span className="text-xs text-gray-500 mb-1">R$</span>
                <span className="text-4xl font-black" style={{ color: "#c9a84c" }}>
                  {plan.price}
                </span>
                <span className="text-xs text-gray-500 mb-1">{plan.period}</span>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-gray-300">
                    <Check size={13} className="text-green-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: plan.highlight ? "#c9a84c" : "#1a2a1a",
                  color: plan.highlight ? "#0a0a0a" : "#c9a84c",
                  border: plan.highlight ? "none" : "1px solid #c9a84c44",
                }}
              >
                {plan.highlight && <Crown size={14} />}
                Assinar {plan.label}
                {!plan.highlight && <ArrowRight size={13} />}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-600 mt-5">
          Cancele a qualquer momento · Pagamento seguro · Privacidade garantida
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t mt-4" style={{ borderColor: "#1a2a1a" }}>
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-gray-600">
          <Link href="/" className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded flex items-center justify-center font-black text-[9px]"
              style={{ backgroundColor: "#1a2a1a", color: "#c9a84c" }}
            >
              VP
            </div>
            <span>© 2026 Vibe Privê</span>
          </Link>
          <div className="flex items-center gap-5">
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Termos</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">Privacidade</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
