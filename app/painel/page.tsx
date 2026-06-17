"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Briefcase,
  Calendar,
  Camera,
  Plus,
  Trash2,
  Save,
  Clock,
  DollarSign,
  Upload,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";

type Tab = "perfil" | "servicos" | "disponibilidade" | "fotos";

interface Service {
  id: number;
  name: string;
  duration: string;
  price: number;
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
    location: "Banibarra",
    bio: "Perfil verificado com badge Vídeo-Check ativo. Disponível para sessões ao vivo e agendamentos.",
    phone: "",
    age: "",
  });
  const [profileSaved, setProfileSaved] = useState(false);

  // Services state
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: "Vídeo-Check (1 min)", duration: "1 min", price: 50 },
    { id: 2, name: "Vídeo Privado", duration: "15 min", price: 120 },
    { id: 3, name: "Sessão Premium", duration: "30 min", price: 200 },
  ]);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [newService, setNewService] = useState({ name: "", duration: "", price: "" });

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

  function addService() {
    if (!newService.name || !newService.price) return;
    setServices((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newService.name,
        duration: newService.duration || "—",
        price: Number(newService.price),
      },
    ]);
    setNewService({ name: "", duration: "", price: "" });
    setShowServiceForm(false);
  }

  function removeService(id: number) {
    setServices((prev) => prev.filter((s) => s.id !== id));
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
            <p className="text-xs text-gray-500 mt-0.5">{profile.location}</p>
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
                <input
                  value={profile.location}
                  onChange={(e) => { setProfile((p) => ({ ...p, location: e.target.value })); setProfileSaved(false); }}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border"
                  style={{ backgroundColor: DARK, borderColor: BORDER }}
                  placeholder="Bairro / Cidade"
                />
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
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-base" style={{ color: GOLD }}>
                Serviços & Preços
              </h2>
              <button
                onClick={() => setShowServiceForm((v) => !v)}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg transition-opacity hover:opacity-80"
                style={{ backgroundColor: GOLD, color: "#0a0a0a" }}
              >
                <Plus size={13} />
                Novo Serviço
              </button>
            </div>

            {/* Add form */}
            {showServiceForm && (
              <div
                className="rounded-xl p-4 border mb-4 grid grid-cols-3 gap-3"
                style={{ backgroundColor: DARK, borderColor: BORDER }}
              >
                <div>
                  <label className="block text-[10px] text-gray-500 mb-1">Nome do serviço</label>
                  <input
                    value={newService.name}
                    onChange={(e) => setNewService((s) => ({ ...s, name: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg text-xs text-white outline-none border"
                    style={{ backgroundColor: "#0a0a0a", borderColor: BORDER }}
                    placeholder="Ex: Vídeo-Check"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 mb-1">Duração</label>
                  <input
                    value={newService.duration}
                    onChange={(e) => setNewService((s) => ({ ...s, duration: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg text-xs text-white outline-none border"
                    style={{ backgroundColor: "#0a0a0a", borderColor: BORDER }}
                    placeholder="Ex: 30 min"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 mb-1">Preço (R$)</label>
                  <input
                    value={newService.price}
                    onChange={(e) => setNewService((s) => ({ ...s, price: e.target.value }))}
                    type="number"
                    className="w-full px-3 py-2 rounded-lg text-xs text-white outline-none border"
                    style={{ backgroundColor: "#0a0a0a", borderColor: BORDER }}
                    placeholder="0"
                  />
                </div>
                <div className="col-span-3 flex gap-2">
                  <button
                    onClick={addService}
                    className="px-4 py-2 rounded-lg text-xs font-bold transition-opacity hover:opacity-90"
                    style={{ backgroundColor: GOLD, color: "#0a0a0a" }}
                  >
                    Adicionar
                  </button>
                  <button
                    onClick={() => setShowServiceForm(false)}
                    className="px-4 py-2 rounded-lg text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Services list */}
            <div className="space-y-2">
              {services.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-4 p-4 rounded-xl border"
                  style={{ backgroundColor: DARK, borderColor: BORDER }}
                >
                  <div className="flex-1">
                    <p className="font-semibold text-white text-sm">{s.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="flex items-center gap-1 text-[11px] text-gray-500">
                        <Clock size={10} />
                        {s.duration}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-black text-lg" style={{ color: GOLD }}>
                      R$ {s.price}
                    </span>
                    <button
                      onClick={() => removeService(s.id)}
                      className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
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
