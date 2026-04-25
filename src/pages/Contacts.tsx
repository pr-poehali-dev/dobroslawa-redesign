import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Layout from "@/components/Layout";

export default function Contacts() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  return (
    <Layout>
      {/* HEADER */}
      <div className="pt-32 pb-16 relative overflow-hidden" style={{ background: "var(--dark-card)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 40% 50%, rgba(74,124,69,0.08) 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <nav className="text-xs flex items-center gap-2 mb-6" style={{ opacity: 0.45 }}>
            <Link to="/" className="text-white no-underline">Главная</Link>
            <Icon name="ChevronRight" size={12} />
            <span>Контакты</span>
          </nav>
          <div className="section-label">Связаться с нами</div>
          <h1 className="font-black" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}>
            Контакты
          </h1>
          <p className="mt-4 max-w-xl text-base" style={{ opacity: 0.55, fontWeight: 300 }}>
            Мы рады ответить на любые вопросы. Позвоните, напишите или заходите в гости!
          </p>
        </div>
      </div>

      <section className="py-16" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14">

            {/* LEFT: Info */}
            <div className="space-y-8">
              {/* Contact cards */}
              {[
                {
                  icon: "Phone",
                  label: "Телефон",
                  primary: "+7 (863) 261-44-44",
                  secondary: "Ежедневно с 8:00 до 22:00",
                  href: "tel:+78632614444",
                },
                {
                  icon: "Mail",
                  label: "Email",
                  primary: "info@dobroslawa.ru",
                  secondary: "Ответим в течение 2 часов",
                  href: "mailto:info@dobroslawa.ru",
                },
                {
                  icon: "MapPin",
                  label: "Адрес",
                  primary: "Ростов-на-Дону",
                  secondary: "Точный адрес — при бронировании",
                  href: undefined,
                },
                {
                  icon: "MessageCircle",
                  label: "WhatsApp / Telegram",
                  primary: "+7 (863) 261-44-44",
                  secondary: "Быстрые ответы в мессенджерах",
                  href: "https://wa.me/78632614444",
                },
              ].map(c => (
                <div
                  key={c.label}
                  className="flex items-start gap-5 p-5 rounded-2xl hover-card"
                  style={{ background: "var(--dark-card)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(74,124,69,0.15)", color: "var(--green-light)" }}
                  >
                    <Icon name={c.icon as never} size={22} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ opacity: 0.4 }}>{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="font-bold text-base no-underline text-white hover:text-green-400 transition-colors">
                        {c.primary}
                      </a>
                    ) : (
                      <div className="font-bold text-base">{c.primary}</div>
                    )}
                    <div className="text-sm mt-0.5" style={{ opacity: 0.45 }}>{c.secondary}</div>
                  </div>
                </div>
              ))}

              {/* Schedule */}
              <div
                className="p-6 rounded-2xl"
                style={{ background: "var(--dark-card)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                  <Icon name="Clock" size={18} style={{ color: "var(--green-light)" }} />
                  Режим работы
                </h3>
                <div className="space-y-2 text-sm">
                  {[
                    ["Заезд", "с 14:00"],
                    ["Выезд", "до 12:00"],
                    ["Ресепшн", "08:00 – 22:00"],
                    ["Экстренная связь", "круглосуточно"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span style={{ opacity: 0.5 }}>{k}</span>
                      <span className="font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div
                className="rounded-2xl overflow-hidden relative"
                style={{ height: "200px", background: "var(--dark-card)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <Icon name="MapPin" size={32} color="var(--green-light)" />
                  <span className="text-sm font-semibold">Ростов-на-Дону</span>
                  <a
                    href="https://maps.yandex.ru"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs no-underline px-4 py-2 rounded-lg transition-all"
                    style={{ background: "rgba(74,124,69,0.2)", color: "var(--green-light)", border: "1px solid rgba(74,124,69,0.3)" }}
                  >
                    Открыть карту
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div>
              <h2 className="font-black text-2xl mb-2">Напишите нам</h2>
              <p className="text-sm mb-8" style={{ opacity: 0.5 }}>
                Остались вопросы? Оставьте сообщение — ответим в кратчайшие сроки.
              </p>

              {sent ? (
                <div className="text-center py-16">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "rgba(74,124,69,0.2)", border: "2px solid var(--green)" }}
                  >
                    <Icon name="Check" size={28} color="var(--green-light)" />
                  </div>
                  <h3 className="font-black text-xl mb-2">Сообщение отправлено!</h3>
                  <p style={{ opacity: 0.55 }}>Мы свяжемся с вами по номеру {form.phone}</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", phone: "", message: "" }); }}
                    className="btn-outline px-8 py-3 rounded-xl text-sm mt-6"
                  >
                    Отправить ещё
                  </button>
                </div>
              ) : (
                <div
                  className="p-8 rounded-2xl"
                  style={{ background: "var(--dark-card)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="space-y-5">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ opacity: 0.4 }}>Имя *</label>
                      <input
                        className="field"
                        placeholder="Как вас зовут?"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ opacity: 0.4 }}>Телефон *</label>
                      <input
                        className="field"
                        placeholder="+7 (___) ___-__-__"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ opacity: 0.4 }}>Сообщение</label>
                      <textarea
                        className="field"
                        rows={5}
                        placeholder="Ваш вопрос или пожелание..."
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        style={{ resize: "none" }}
                      />
                    </div>
                    <button
                      onClick={() => { if (form.name && form.phone) setSent(true); }}
                      className="btn-green w-full py-4 rounded-2xl text-sm"
                    >
                      Отправить сообщение
                    </button>
                    <p className="text-xs text-center" style={{ opacity: 0.3 }}>
                      Или позвоните нам:{" "}
                      <a href="tel:+78632614444" className="no-underline font-bold" style={{ color: "var(--green-light)" }}>
                        +7 (863) 261-44-44
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
