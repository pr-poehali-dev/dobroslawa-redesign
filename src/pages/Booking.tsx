import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Layout from "@/components/Layout";

const MONTH_NAMES = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const DAY_NAMES = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];

const BOOKED: Record<string, number[]> = {
  "2026-04": [5, 6, 12, 13, 20],
  "2026-05": [1, 2, 3, 10, 11, 18, 25, 26],
  "2026-06": [6, 7, 14, 15],
};

const rooms = [
  { id: 1, name: "Стандарт", price: 2500, guests: 2 },
  { id: 2, name: "Комфорт", price: 3800, guests: 3 },
  { id: 3, name: "Люкс", price: 5500, guests: 4 },
];

function getKey(y: number, m: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}`;
}
function daysInMonth(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate();
}
function firstDow(y: number, m: number) {
  const d = new Date(y, m, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

export default function Booking() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [checkIn, setCheckIn] = useState<number | null>(null);
  const [checkOut, setCheckOut] = useState<number | null>(null);
  const [roomId, setRoomId] = useState(1);
  const [guests, setGuests] = useState(1);
  const [step, setStep] = useState<"dates" | "form" | "done">("dates");
  const [form, setForm] = useState({ name: "", phone: "", email: "", comment: "" });

  const key = getKey(year, month);
  const booked = BOOKED[key] || [];
  const days = daysInMonth(year, month);
  const first = firstDow(year, month);
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();
  const today = now.getDate();

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
    setCheckIn(null); setCheckOut(null);
  };
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
    setCheckIn(null); setCheckOut(null);
  };

  const handleDay = (d: number) => {
    if (booked.includes(d)) return;
    if (isCurrentMonth && d < today) return;
    if (!checkIn || (checkIn && checkOut)) { setCheckIn(d); setCheckOut(null); }
    else if (d > checkIn) setCheckOut(d);
    else { setCheckIn(d); setCheckOut(null); }
  };

  const nights = checkIn && checkOut ? checkOut - checkIn : 0;
  const price = rooms.find(r => r.id === roomId)?.price || 0;
  const total = nights * price;

  const cells: (number | null)[] = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);

  return (
    <Layout>
      {/* HEADER */}
      <div className="pt-32 pb-16 relative overflow-hidden" style={{ background: "var(--dark-card)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(74,124,69,0.1) 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <nav className="text-xs flex items-center gap-2 mb-6" style={{ opacity: 0.45 }}>
            <Link to="/" className="text-white no-underline">Главная</Link>
            <Icon name="ChevronRight" size={12} />
            <span>Бронирование</span>
          </nav>
          <div className="section-label">Онлайн бронирование</div>
          <h1 className="font-black" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}>
            Забронировать номер
          </h1>
          <p className="mt-4 max-w-xl text-base" style={{ opacity: 0.55, fontWeight: 300 }}>
            Выберите даты, номер и заполните форму — мы свяжемся с вами в течение 30 минут для подтверждения.
          </p>
        </div>
      </div>

      <section className="py-16" style={{ background: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto px-6">
          {step === "done" ? (
            /* SUCCESS */
            <div className="max-w-xl mx-auto text-center py-16">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-ring"
                style={{ background: "rgba(74,124,69,0.2)", border: "2px solid var(--green)" }}
              >
                <Icon name="Check" size={36} color="var(--green-light)" />
              </div>
              <h2 className="font-black text-3xl mb-3">Заявка отправлена!</h2>
              <p className="mb-2" style={{ opacity: 0.6 }}>
                Мы получили вашу заявку и свяжемся с вами по номеру <strong>{form.phone}</strong> в течение 30 минут.
              </p>
              <p className="text-sm mb-8" style={{ opacity: 0.4 }}>
                Номер: {rooms.find(r => r.id === roomId)?.name} · {checkIn}–{checkOut} {MONTH_NAMES[month]} · {nights} ночей
              </p>
              <Link to="/" className="btn-green px-8 py-4 rounded-2xl text-sm">
                На главную
              </Link>
            </div>
          ) : step === "form" ? (
            /* FORM */
            <div className="max-w-2xl mx-auto">
              <button
                onClick={() => setStep("dates")}
                className="flex items-center gap-2 text-sm mb-8 transition-opacity"
                style={{ opacity: 0.6, background: "transparent", border: "none", color: "var(--text)", cursor: "pointer" }}
              >
                <Icon name="ArrowLeft" size={16} /> Изменить даты
              </button>

              {/* Summary */}
              <div
                className="p-5 rounded-2xl mb-8"
                style={{ background: "rgba(74,124,69,0.1)", border: "1px solid rgba(74,124,69,0.25)" }}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div><div className="opacity-40 text-xs mb-1">Заезд</div><strong>{checkIn} {MONTH_NAMES[month]}</strong></div>
                  <div><div className="opacity-40 text-xs mb-1">Выезд</div><strong>{checkOut} {MONTH_NAMES[month]}</strong></div>
                  <div><div className="opacity-40 text-xs mb-1">Номер</div><strong>{rooms.find(r => r.id === roomId)?.name}</strong></div>
                  <div>
                    <div className="opacity-40 text-xs mb-1">Итого</div>
                    <strong className="text-lg" style={{ color: "var(--green-light)" }}>{total.toLocaleString("ru")} ₽</strong>
                  </div>
                </div>
              </div>

              <h2 className="font-black text-2xl mb-6">Контактные данные</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ opacity: 0.4 }}>Имя *</label>
                    <input
                      className="field"
                      placeholder="Ваше имя"
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
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ opacity: 0.4 }}>Email</label>
                  <input
                    className="field"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ opacity: 0.4 }}>Пожелания</label>
                  <textarea
                    className="field"
                    rows={3}
                    placeholder="Особые пожелания, вопросы..."
                    value={form.comment}
                    onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                    style={{ resize: "none" }}
                  />
                </div>
                <button
                  onClick={() => { if (form.name && form.phone) setStep("done"); }}
                  className="btn-green w-full py-4 rounded-2xl text-sm"
                >
                  Отправить заявку
                </button>
                <p className="text-xs text-center" style={{ opacity: 0.35 }}>
                  Нажимая кнопку, вы соглашаетесь с правилами проживания и политикой конфиденциальности
                </p>
              </div>
            </div>
          ) : (
            /* DATES */
            <div className="grid lg:grid-cols-[1fr_360px] gap-10">
              {/* Calendar */}
              <div>
                <h2 className="font-black text-2xl mb-6">Выберите даты</h2>
                <div
                  className="p-6 rounded-2xl"
                  style={{ background: "var(--dark-card)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {/* Month nav */}
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={prevMonth}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                      style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", cursor: "pointer" }}
                    >
                      <Icon name="ChevronLeft" size={16} />
                    </button>
                    <span className="font-bold text-base">{MONTH_NAMES[month]} {year}</span>
                    <button
                      onClick={nextMonth}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                      style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", cursor: "pointer" }}
                    >
                      <Icon name="ChevronRight" size={16} />
                    </button>
                  </div>
                  {/* Days of week */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {DAY_NAMES.map(d => (
                      <div key={d} className="cal-day text-xs font-bold" style={{ opacity: 0.35, cursor: "default" }}>{d}</div>
                    ))}
                  </div>
                  {/* Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {cells.map((d, i) => {
                      if (!d) return <div key={`e${i}`} />;
                      const isPast = isCurrentMonth && d < today;
                      const isBooked = booked.includes(d);
                      const isToday = isCurrentMonth && d === today;
                      const isSel = d === checkIn || d === checkOut;
                      const inRange = !!(checkIn && checkOut && d > checkIn && d < checkOut);
                      let cls = "cal-day";
                      if (isPast) cls += " past";
                      else if (isBooked) cls += " booked";
                      else if (inRange) cls += " in-range";
                      else if (isSel) cls += " selected";
                      else cls += " available";
                      if (isToday && !isSel) cls += " today";
                      return <div key={d} className={cls} onClick={() => handleDay(d)}>{d}</div>;
                    })}
                  </div>
                  {/* Legend */}
                  <div className="flex gap-4 mt-5 text-xs justify-center flex-wrap" style={{ opacity: 0.5 }}>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded inline-block" style={{ background: "rgba(74,124,69,0.2)", border: "1px solid rgba(74,124,69,0.4)" }} />
                      Свободно
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded inline-block" style={{ background: "rgba(200,151,60,0.15)" }} />
                      Занято
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded inline-block" style={{ background: "var(--green)" }} />
                      Выбрано
                    </span>
                  </div>
                </div>

                {/* Hint */}
                <p className="mt-4 text-sm text-center" style={{ opacity: 0.4 }}>
                  {!checkIn ? "Нажмите на дату заезда" : !checkOut ? "Теперь выберите дату выезда" : `Выбрано: ${checkIn}–${checkOut} ${MONTH_NAMES[month]}`}
                </p>
              </div>

              {/* Options sidebar */}
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest block mb-3" style={{ opacity: 0.4 }}>Тип номера</label>
                  <div className="space-y-2">
                    {rooms.map(r => (
                      <button
                        key={r.id}
                        onClick={() => setRoomId(r.id)}
                        className="w-full flex items-center justify-between p-4 rounded-xl transition-all text-left"
                        style={{
                          background: roomId === r.id ? "rgba(74,124,69,0.15)" : "var(--dark-card)",
                          border: roomId === r.id ? "1px solid rgba(74,124,69,0.4)" : "1px solid rgba(255,255,255,0.06)",
                          color: "var(--text)",
                          cursor: "pointer",
                        }}
                      >
                        <div>
                          <div className="font-bold text-sm">{r.name}</div>
                          <div className="text-xs mt-0.5" style={{ opacity: 0.45 }}>до {r.guests} гостей</div>
                        </div>
                        <div className="text-right">
                          <div className="font-black" style={{ color: "var(--green-light)" }}>{r.price.toLocaleString("ru")} ₽</div>
                          <div className="text-xs" style={{ opacity: 0.4 }}>за ночь</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ opacity: 0.4 }}>Количество гостей</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGuests(g => Math.max(1, g - 1))}
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "var(--dark-card)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", cursor: "pointer" }}
                    >
                      <Icon name="Minus" size={16} />
                    </button>
                    <span className="font-black text-2xl w-8 text-center">{guests}</span>
                    <button
                      onClick={() => setGuests(g => Math.min(rooms.find(r => r.id === roomId)?.guests || 4, g + 1))}
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "var(--dark-card)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", cursor: "pointer" }}
                    >
                      <Icon name="Plus" size={16} />
                    </button>
                    <span className="text-sm" style={{ opacity: 0.45 }}>гостей</span>
                  </div>
                </div>

                {/* Price summary */}
                {checkIn && checkOut && (
                  <div
                    className="p-5 rounded-2xl"
                    style={{ background: "var(--dark-card)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span style={{ opacity: 0.5 }}>{price.toLocaleString("ru")} ₽ × {nights} ночей</span>
                        <span className="font-bold">{(price * nights).toLocaleString("ru")} ₽</span>
                      </div>
                    </div>
                    <div className="border-t pt-4 flex justify-between items-center" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                      <span className="font-bold">Итого</span>
                      <span className="font-black text-2xl" style={{ color: "var(--green-light)" }}>{total.toLocaleString("ru")} ₽</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => { if (checkIn && checkOut) setStep("form"); }}
                  className="btn-green w-full py-4 rounded-2xl text-sm"
                  style={{ opacity: checkIn && checkOut ? 1 : 0.5, cursor: checkIn && checkOut ? "pointer" : "not-allowed" }}
                >
                  {checkIn && checkOut ? "Продолжить" : "Выберите даты"}
                </button>

                <a
                  href="tel:+78632614444"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-semibold no-underline transition-all"
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  <Icon name="Phone" size={15} /> Забронировать по телефону
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
