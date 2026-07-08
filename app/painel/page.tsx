"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Briefcase,
  Calendar,
  Camera,
  Plus,
  Save,
  DollarSign,
  Upload,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
import { ESTADOS, CIDADES_POR_ESTADO } from "@/lib/brazil-locations";

type Tab = "perfil" | "servicos" | "disponibilidade" | "fotos";

const SERVICE_CATEGORIES = [
  "Acompanhante VIP",
  "Massoterapia Premium",
  "Venda de Conteúdo",
  "Sugar Baby",
];

interface ServiceCategoryState {
  name: string;
  enabled: boolean;
  price: string;
}

const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const PERIODS = [
  { key: "manha", label: "Manhã", sub: "06h – 12h" },
  { key: "tarde", label: "Tarde", sub: "12h – 18h" },
  { key: "noite", label: "Noite", sub: "18h – 00h" },
];

const CELL = (day: string, period: string) => `${day}-${period}`;

export default function PainelAnunciante() {
  const [activeTab, setActiveTab] = useState<Tab>("perfil");

  // Profile state
  const [profile, setProfile] = useState({
    name: "Cleia M.",
    estado: "",
    cidade: "",
    bio: "Perfil verificado com badge Vídeo-Check ativo. Disponível para sessões ao vivo e agendamentos.",
    phone: "",
    age: "",
  });
  const [profileSaved, setProfileSaved] = useState(false);

  // Services state
  const [serviceCategories, setServiceCategories] = useState<ServiceCategoryState[]>(
    SERVICE_CATEGORIES.map((name) => ({ name, enabled: false, price: "" }))
  );

  // Availability state
  const [availability, setAvailability] = useState<Set<string>>(
    new Set([
      "Seg-noite", "Ter-tarde", "Ter-noite",
      "Qua-noite", "Sex-noite", "Sáb-tarde", "Sáb-noite",
    ])
  );
  const [availSaved, setAvailSaved] = useState(false);

  function toggleCell(day: string, period: string) {
    const key = CELL(day, period);
    setAvailability((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
    setAvailSaved(false);
  }

  function toggleServiceCategory(name: string) {
    setServiceCategories((prev) =>
      prev.map((s) => (s.name === name ? { ...s, enabled: !s.enabled } : s))
    );
  }

  function setServicePrice(name: string, price: string) {
    setServiceCategories((prev) =>
      prev.map((s) => (s.name === name ? { ...s, price } : s))
    );
  }

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "perfil", label: "Meu Perfil", icon: User },
    { key: "servicos", label: "Serviços & Preços", icon: Briefcase },
    { key: "disponibilidade", label: "Disponibilidade", icon: Calendar },
    { key: "fotos", label: "Fotos", icon: Camera },
  ];

  const GOLD = "#c9a84c";
  const CARD = "#1a2a1a";
  const DARK = "#0d1a0d";
  const BORDER = "#243424";

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-sm"
        style={{ backgroundColor: "rgba(10,10,10,0.95)", borderColor: BORDER }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
              style={{ backgroundColor: CARD, color: GOLD }}
            >
              VP
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ color: GOLD }}>
              Vibe Privê
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">Painel da Anunciante</span>
            <Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors">
              Ver site →
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Profile summary bar */}
        <div
          className="rounded-2xl p-5 border flex items-center gap-4 mb-8"
          style={{ backgroundColor: CARD, borderColor: BORDER }}
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl shrink-0"
            style={{ backgroundColor: DARK, color: GOLD }}
          >
            {profile.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-bold text-white">{profile.name}</p>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-900/60 text-green-400 border border-green-800">
                <ShieldCheck size={9} />
                Vídeo Verificado
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {profile.cidade && profile.estado
                ? `${profile.cidade} - ${profile.estado}`
                : "Localização não definida"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600">Perfil ativo</p>
            <div className="flex items-center gap-1.5 justify-end mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-green-400 font-bold">ONLINE</span>
            </div>
          </div>
        </div>

        {/* Tab nav */}
        <div
          className="flex gap-1 p-1 rounded-xl mb-8"
          style={{ backgroundColor: CARD, border: `1px solid ${BORDER}` }}
        >
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={
                activeTab === key
                  ? { backgroundColor: GOLD, color: "#0a0a0a" }
                  : { color: "#6b7280" }
              }
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* TAB: Perfil */}
        {activeTab === "perfil" && (
          <div
            className="rounded-2xl p-6 border space-y-5"
            style={{ backgroundColor: CARD, borderColor: BORDER }}
          >
            <h2 className="font-bold text-base" style={{ color: GOLD }}>
              Meu Perfil
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Nome de exibição</label>
                <input
                  value={profile.name}
                  onChange={(e) => { setProfile((p) => ({ ...p, name: e.target.value })); setProfileSaved(false); }}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none focus:ring-1 border"
                  style={{ backgroundColor: DARK, borderColor: BORDER, "--tw-ring-color": GOLD } as React.CSSProperties}
                  placeholder="Seu nome de exibição"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Localização</label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={profile.estado}
                    onChange={(e) => {
                      const estado = e.target.value;
                      setProfile((p) => ({ ...p, estado, cidade: "" }));
                      setProfileSaved(false);
                    }}
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none border"
                    style={{ backgroundColor: DARK, borderColor: BORDER }}
                  >
                    <option value="">Estado</option>
                    {ESTADOS.map((uf) => (
                      <option key={uf.sigla} value={uf.sigla}>
                        {uf.nome}
                      </option>
                    ))}
                  </select>
                  <select
                    value={profile.cidade}
                    onChange={(e) => {
                      setProfile((p) => ({ ...p, cidade: e.target.value }));
                      setProfileSaved(false);
                    }}
                    disabled={!profile.estado}
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none border disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ backgroundColor: DARK, borderColor: BORDER }}
                  >
                    <option value="">Cidade</option>
                    {(CIDADES_POR_ESTADO[profile.estado] ?? []).map((cidade) => (
                      <option key={cidade} value={cidade}>
                        {cidade}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Idade</label>
                <input
                  value={profile.age}
                  onChange={(e) => { setProfile((p) => ({ ...p, age: e.target.value })); setProfileSaved(false); }}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border"
                  style={{ backgroundColor: DARK, borderColor: BORDER }}
                  placeholder="Sua idade"
                  type="number"
                  min={18}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">WhatsApp (privado)</label>
                <input
                  value={profile.phone}
                  onChange={(e) => { setProfile((p) => ({ ...p, phone: e.target.value })); setProfileSaved(false); }}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border"
                  style={{ backgroundColor: DARK, borderColor: BORDER }}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Bio / Apresentação</label>
              <textarea
                value={profile.bio}
                onChange={(e) => { setProfile((p) => ({ ...p, bio: e.target.value })); setProfileSaved(false); }}
                rows={4}
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none resize-none border"
                style={{ backgroundColor: DARK, borderColor: BORDER }}
                placeholder="Escreva uma apresentação atraente sobre você..."
              />
              <p className="text-[10px] text-gray-600 mt-1">{profile.bio.length}/300 caracteres</p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setProfileSaved(true)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                style={{ backgroundColor: GOLD, color: "#0a0a0a" }}
              >
                <Save size={14} />
                Salvar Perfil
              </button>
              {profileSaved && (
                <span className="flex items-center gap-1.5 text-xs text-green-400">
                  <CheckCircle size={13} />
                  Salvo com sucesso
                </span>
              )}
            </div>
          </div>
        )}

        {/* TAB: Serviços */}
        {activeTab === "servicos" && (
          <div
            className="rounded-2xl p-6 border"
            style={{ backgroundColor: CARD, borderColor: BORDER }}
          >
            <h2 className="font-bold text-base mb-1" style={{ color: GOLD }}>
              Serviços & Preços
            </h2>
            <p className="text-xs text-gray-500 mb-5">
              Selecione as categorias de serviço que você oferece e defina seu preço para cada uma.
            </p>

            {/* Service category selector */}
            <div className="space-y-2">
              {serviceCategories.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-4 p-4 rounded-xl border transition-colors"
                  style={{
                    backgroundColor: DARK,
                    borderColor: s.enabled ? GOLD : BORDER,
                  }}
                >
                  <button
                    onClick={() => toggleServiceCategory(s.name)}
                    className="w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors"
                    style={
                      s.enabled
                        ? { backgroundColor: GOLD, borderColor: GOLD }
                        : { backgroundColor: "transparent", borderColor: BORDER }
                    }
                    aria-label={`Selecionar categoria ${s.name}`}
                    aria-pressed={s.enabled}
                  >
                    {s.enabled && <CheckCircle size={13} color="#0a0a0a" />}
                  </button>

                  <p className="flex-1 font-semibold text-white text-sm">{s.name}</p>

                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-500">R$</span>
                    <input
                      value={s.price}
                      onChange={(e) => setServicePrice(s.name, e.target.value)}
                      disabled={!s.enabled}
                      type="number"
                      min={0}
                      placeholder="0"
                      className="w-24 px-3 py-2 rounded-lg text-sm text-white outline-none border disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ backgroundColor: "#0a0a0a", borderColor: BORDER }}
                    />
                  </div>
                </div>
              ))}

              {/* Fixed platform benefit — no price field */}
              <div
                className="flex items-center gap-4 p-4 rounded-xl border"
                style={{ backgroundColor: DARK, borderColor: BORDER }}
              >
                <ShieldCheck size={18} style={{ color: GOLD }} className="shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-white text-sm">Vídeo-Check</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Benefício da plataforma para assinantes — sem preço definido por você
                  </p>
                </div>
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: GOLD + "22", color: GOLD }}
                >
                  Incluso
                </span>
              </div>
            </div>

            <p className="text-[11px] text-gray-600 mt-4 flex items-center gap-1.5">
              <DollarSign size={11} />
              Você define seus próprios preços. A plataforma cobra apenas uma taxa de processamento por transação.
            </p>
          </div>
        )}

        {/* TAB: Disponibilidade */}
        {activeTab === "disponibilidade" && (
          <div
            className="rounded-2xl p-6 border"
            style={{ backgroundColor: CARD, borderColor: BORDER }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-base" style={{ color: GOLD }}>
                Disponibilidade
              </h2>
              {availSaved && (
                <span className="flex items-center gap-1.5 text-xs text-green-400">
                  <CheckCircle size={13} />
                  Salvo
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mb-6">
              Clique nas células para marcar quando você está disponível.
            </p>

            {/* Grid */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="w-20 pb-3" />
                    {DAYS.map((d) => (
                      <th
                        key={d}
                        className="pb-3 text-center text-xs font-bold text-gray-400"
                      >
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PERIODS.map(({ key, label, sub }) => (
                    <tr key={key}>
                      <td className="pr-4 py-1.5">
                        <p className="text-xs font-semibold text-gray-400">{label}</p>
                        <p className="text-[10px] text-gray-600">{sub}</p>
                      </td>
                      {DAYS.map((day) => {
                        const active = availability.has(CELL(day, key));
                        return (
                          <td key={day} className="px-1 py-1.5">
                            <button
                              onClick={() => toggleCell(day, key)}
                              className="w-full aspect-square rounded-lg border transition-all duration-100"
                              style={
                                active
                                  ? { backgroundColor: GOLD + "33", borderColor: GOLD, outlineColor: GOLD }
                                  : { backgroundColor: DARK, borderColor: BORDER }
                              }
                              title={`${day} — ${label}`}
                            >
                              {active && (
                                <div
                                  className="w-2 h-2 rounded-full mx-auto"
                                  style={{ backgroundColor: GOLD }}
                                />
                              )}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center gap-5 mt-5">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: GOLD + "33", border: `1px solid ${GOLD}` }}
                />
                <span className="text-[11px] text-gray-400">Disponível</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: DARK, border: `1px solid ${BORDER}` }}
                />
                <span className="text-[11px] text-gray-400">Indisponível</span>
              </div>
              <button
                onClick={() => setAvailSaved(true)}
                className="ml-auto flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                style={{ backgroundColor: GOLD, color: "#0a0a0a" }}
              >
                <Save size={13} />
                Salvar
              </button>
            </div>
          </div>
        )}

        {/* TAB: Fotos */}
        {activeTab === "fotos" && (
          <div
            className="rounded-2xl p-6 border"
            style={{ backgroundColor: CARD, borderColor: BORDER }}
          >
            <h2 className="font-bold text-base mb-5" style={{ color: GOLD }}>
              Fotos do Perfil
            </h2>

            {/* Upload area */}
            <div
              className="border-2 border-dashed rounded-2xl p-10 text-center mb-6 cursor-pointer hover:border-opacity-70 transition-colors"
              style={{ borderColor: GOLD + "55" }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: DARK }}
              >
                <Upload size={22} style={{ color: GOLD }} />
              </div>
              <p className="font-semibold text-white text-sm mb-1">
                Arraste fotos aqui ou clique para fazer upload
              </p>
              <p className="text-xs text-gray-500">JPG, PNG · Máx 5MB por foto · Até 12 fotos</p>
              <button
                className="mt-4 px-5 py-2 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                style={{ backgroundColor: GOLD, color: "#0a0a0a" }}
              >
                Selecionar fotos
              </button>
            </div>

            {/* Photo grid placeholders */}
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl border flex flex-col items-center justify-center cursor-pointer hover:border-opacity-70 transition-colors"
                  style={{ backgroundColor: DARK, borderColor: BORDER }}
                >
                  {i === 0 ? (
                    <>
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-base mb-1"
                        style={{ backgroundColor: CARD, color: GOLD }}
                      >
                        CM
                      </div>
                      <p className="text-[10px] text-gray-500">Foto de perfil</p>
                    </>
                  ) : (
                    <>
                      <Plus size={16} className="text-gray-700 mb-1" />
                      <p className="text-[10px] text-gray-700">Adicionar</p>
                    </>
                  )}
                </div>
              ))}
            </div>

            <p className="text-[11px] text-gray-600 mt-4">
              A primeira foto é usada como foto de perfil principal. Fotos são revisadas antes de serem publicadas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
