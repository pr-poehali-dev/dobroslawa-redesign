import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/def34d81-8ae3-4796-b4f0-8d6f47877d59/files/d06acce6-0da8-4834-8e8a-36dd510689ee.jpg";
const ROOM_IMG = "https://cdn.poehali.dev/projects/def34d81-8ae3-4796-b4f0-8d6f47877d59/files/22d5d92c-7866-4bac-9056-5da5d6ccb273.jpg";
const POOL_IMG = "https://cdn.poehali.dev/projects/def34d81-8ae3-4796-b4f0-8d6f47877d59/files/30b818f8-7206-4968-8856-54964bc7e0b1.jpg";

// --- CALENDAR LOGIC ---
const BOOKED_DAYS: Record<string, number[]> = {
  "2026-04": [5, 6, 7, 12, 13, 20, 21],
  "2026-05": [1, 2, 3, 10, 11, 18, 19, 25, 26],
  "2026-06": [6, 7, 14, 15, 22, 23],
};
const MONTH_NAMES = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const DAY_NAMES = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];

function getMonthKey(y: number, m: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}`;
}
function getDaysInMonth(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate();
}
function getFirstDayOfWeek(y: number, m: number) {
  const d = new Date(y, m, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

// --- ROOMS DATA ---
const rooms = [
  { id: 1, name: "Стандарт", price: 3500, size: "18 м²", guests: 2, img: ROOM_IMG, features: ["Wi-Fi", "Кондиционер", "Душ"], badge: "Хит" },
  { id: 2, name: "Комфорт", price: 5200, size: "26 м²", guests: 3, img: POOL_IMG, features: ["Wi-Fi", "Кондиционер", "Ванна", "Мини-бар"], badge: "Популярный" },
  { id: 3, name: "Люкс", price: 8900, size: "38 м²", guests: 4, img: HERO_IMG, features: ["Wi-Fi", "Кондиционер", "Джакузи", "Балкон", "Завтрак"], badge: "Премиум" },
];

// --- REVIEWS DATA ---
const reviews = [
  { name: "Анна К.", city: "Москва", text: "Отличное место для отдыха! Чистые номера, вежливый персонал. Обязательно вернёмся снова.", stars: 5, date: "Март 2026" },
  { name: "Сергей М.", city: "Санкт-Петербург", text: "Прекрасный гостевой дом. Уютная атмосфера, вкусный завтрак. Расположение просто идеальное.", stars: 5, date: "Февраль 2026" },
  { name: "Лидия В.", city: "Казань", text: "Очень понравилось! Номер Люкс превзошёл все ожидания. Территория ухоженная, есть всё необходимое.", stars: 5, date: "Январь 2026" },
  { name: "Дмитрий Р.", city: "Екатеринбург", text: "Бронировал для корпоратива — всё организовано на высшем уровне. Рекомендую всем!", stars: 4, date: "Декабрь 2025" },
];

// --- RULES DATA ---
const rules = [
  { icon: "Clock", title: "Заезд и выезд", text: "Заезд с 14:00, выезд до 12:00. Ранний/поздний выезд по согласованию." },
  { icon: "Users", title: "Гости", text: "Максимальное количество гостей соответствует вместимости номера. Посторонние лица не допускаются." },
  { icon: "Volume2", title: "Тихие часы", text: "С 22:00 до 08:00 просьба соблюдать тишину. Уважайте других гостей." },
  { icon: "Cigarette", title: "Курение", text: "Курение разрешено только в специально отведённых местах на открытом воздухе." },
  { icon: "PawPrint", title: "Животные", text: "Проживание с домашними животными допускается по предварительному согласованию (+500₽/сутки)." },
  { icon: "CreditCard", title: "Оплата", text: "Предоплата 50% при бронировании. Остаток при заезде. Принимаются карты и наличные." },
];

// --- GALLERY IMAGES ---
const galleryItems = [
  { img: HERO_IMG, label: "Территория" },
  { img: ROOM_IMG, label: "Номера" },
  { img: POOL_IMG, label: "Бассейн" },
  { img: ROOM_IMG, label: "Интерьер" },
  { img: HERO_IMG, label: "Вечер" },
  { img: POOL_IMG, label: "Зоны отдыха" },
];

// --- CALENDAR COMPONENT ---
function BookingCalendar() {
  const now = new Date();
  const [curYear, setCurYear] = useState(now.getFullYear());
  const [curMonth, setCurMonth] = useState(now.getMonth());
  const [checkIn, setCheckIn] = useState<number | null>(null);
  const [checkOut, setCheckOut] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState(1);
  const [guests, setGuests] = useState(2);
  const [step, setStep] = useState<"pick" | "confirm">("pick");

  const key = getMonthKey(curYear, curMonth);
  const booked = BOOKED_DAYS[key] || [];
  const daysInMonth = getDaysInMonth(curYear, curMonth);
  const firstDay = getFirstDayOfWeek(curYear, curMonth);
  const today = now.getDate();
  const isCurrentMonth = curYear === now.getFullYear() && curMonth === now.getMonth();

  const prevMonth = () => {
    if (curMonth === 0) { setCurYear(y => y - 1); setCurMonth(11); }
    else setCurMonth(m => m - 1);
    setCheckIn(null); setCheckOut(null);
  };
  const nextMonth = () => {
    if (curMonth === 11) { setCurYear(y => y + 1); setCurMonth(0); }
    else setCurMonth(m => m + 1);
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
  const roomPrice = rooms.find(r => r.id === selectedRoom)?.price || 0;
  const total = nights * roomPrice;

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {step === "pick" ? (
        <div className="space-y-6">
          {/* Month nav */}
          <div className="flex items-center justify-between">
            <button onClick={prevMonth} className="w-10 h-10 rounded-full bg-white/10 hover:bg-coral/20 flex items-center justify-center transition-all">
              <Icon name="ChevronLeft" size={18} />
            </button>
            <h3 className="font-bold text-xl tracking-wide" style={{ fontFamily: 'Montserrat' }}>
              {MONTH_NAMES[curMonth]} {curYear}
            </h3>
            <button onClick={nextMonth} className="w-10 h-10 rounded-full bg-white/10 hover:bg-coral/20 flex items-center justify-center transition-all">
              <Icon name="ChevronRight" size={18} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1">
            {DAY_NAMES.map(d => (
              <div key={d} className="cal-day text-xs font-bold opacity-40 cursor-default">{d}</div>
            ))}
            {cells.map((d, i) => {
              if (!d) return <div key={`e-${i}`} />;
              const isPast = isCurrentMonth && d < today;
              const isBooked = booked.includes(d);
              const isToday = isCurrentMonth && d === today;
              const isSelected = d === checkIn || d === checkOut;
              const inRange = checkIn && checkOut && d > checkIn && d < checkOut;
              let cls = "cal-day";
              if (isPast) cls += " past";
              else if (isBooked) cls += " booked";
              else if (inRange) cls += " in-range";
              else if (isSelected) cls += " selected";
              else cls += " available";
              if (isToday && !isSelected) cls += " today";
              return (
                <div key={d} className={cls} onClick={() => handleDay(d)}>{d}</div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex gap-4 text-xs opacity-60 justify-center flex-wrap">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-teal-400/20 border border-teal-400/40 inline-block" />Свободно</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-coral/20 border border-coral/40 inline-block" />Занято</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-coral inline-block" />Выбрано</span>
          </div>

          {/* Room & guests */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest opacity-50 block mb-2">Номер</label>
              <select
                value={selectedRoom}
                onChange={e => setSelectedRoom(Number(e.target.value))}
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white font-semibold focus:outline-none focus:border-coral transition-colors"
                style={{ fontFamily: 'Montserrat' }}
              >
                {rooms.map(r => <option key={r.id} value={r.id} className="bg-gray-900">{r.name} — {r.price}₽/ночь</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest opacity-50 block mb-2">Гостей</label>
              <select
                value={guests}
                onChange={e => setGuests(Number(e.target.value))}
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white font-semibold focus:outline-none focus:border-coral transition-colors"
                style={{ fontFamily: 'Montserrat' }}
              >
                {[1,2,3,4].map(n => <option key={n} value={n} className="bg-gray-900">{n} {n === 1 ? 'гость' : n < 5 ? 'гостя' : 'гостей'}</option>)}
              </select>
            </div>
          </div>

          {/* Summary */}
          {checkIn && checkOut && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 animate-fadeInUp">
              <div className="flex justify-between text-sm">
                <span className="opacity-60">Заезд:</span>
                <span className="font-bold">{checkIn} {MONTH_NAMES[curMonth]}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-60">Выезд:</span>
                <span className="font-bold">{checkOut} {MONTH_NAMES[curMonth]}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-60">Ночей:</span>
                <span className="font-bold">{nights}</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between">
                <span className="font-bold">Итого:</span>
                <span className="font-black text-xl" style={{ color: 'var(--coral)' }}>{total.toLocaleString('ru')} ₽</span>
              </div>
              <button onClick={() => setStep("confirm")} className="btn-coral w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest">
                Продолжить бронирование
              </button>
            </div>
          )}
          {!checkIn && (
            <p className="text-center text-sm opacity-40 italic" style={{ fontFamily: 'Cormorant Garamond' }}>
              Выберите дату заезда на календаре
            </p>
          )}
          {checkIn && !checkOut && (
            <p className="text-center text-sm opacity-40 italic" style={{ fontFamily: 'Cormorant Garamond' }}>
              Теперь выберите дату выезда
            </p>
          )}
        </div>
      ) : (
        /* Confirm step */
        <div className="space-y-6 animate-fadeInUp">
          <button onClick={() => setStep("pick")} className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity">
            <Icon name="ArrowLeft" size={16} /> Назад к выбору дат
          </button>
          <h3 className="text-2xl font-black">Подтвердите бронирование</h3>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between"><span className="opacity-60">Номер:</span><span className="font-bold">{rooms.find(r=>r.id===selectedRoom)?.name}</span></div>
            <div className="flex justify-between"><span className="opacity-60">Заезд:</span><span className="font-bold">{checkIn} {MONTH_NAMES[curMonth]}</span></div>
            <div className="flex justify-between"><span className="opacity-60">Выезд:</span><span className="font-bold">{checkOut} {MONTH_NAMES[curMonth]}</span></div>
            <div className="flex justify-between"><span className="opacity-60">Гостей:</span><span className="font-bold">{guests}</span></div>
            <div className="flex justify-between"><span className="opacity-60">Ночей:</span><span className="font-bold">{nights}</span></div>
            <div className="border-t border-white/10 pt-4 flex justify-between items-center">
              <span className="font-bold text-lg">Итого к оплате:</span>
              <span className="font-black text-2xl" style={{ color: 'var(--coral)' }}>{total.toLocaleString('ru')} ₽</span>
            </div>
          </div>
          <div className="space-y-3">
            <input placeholder="Ваше имя" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-coral transition-colors" style={{ fontFamily: 'Montserrat' }} />
            <input placeholder="Телефон" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-coral transition-colors" style={{ fontFamily: 'Montserrat' }} />
            <input placeholder="Email" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-coral transition-colors" style={{ fontFamily: 'Montserrat' }} />
          </div>
          <button className="btn-coral w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest animate-pulse-glow">
            Забронировать и оплатить 50%
          </button>
          <p className="text-xs text-center opacity-40">Нажимая кнопку, вы соглашаетесь с правилами проживания</p>
        </div>
      )}
    </div>
  );
}

// --- MAIN PAGE ---
export default function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Главная" },
    { id: "about", label: "О нас" },
    { id: "rooms", label: "Номера" },
    { id: "gallery", label: "Галерея" },
    { id: "rules", label: "Порядок" },
    { id: "reviews", label: "Отзывы" },
    { id: "booking", label: "Бронирование" },
    { id: "contacts", label: "Контакты" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
    setActiveSection(id);
  };

  return (
    <div style={{ background: 'var(--dark)', color: '#fff', fontFamily: 'Montserrat, sans-serif' }}>

      {/* ===== NAVBAR ===== */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(13,13,13,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg"
              style={{ background: 'var(--coral)', color: '#fff' }}>
              Г
            </div>
            <div>
              <div className="font-black text-base leading-none tracking-wide">ГОСТЕВОЙ</div>
              <div className="font-light text-xs tracking-[0.3em] opacity-60 leading-none mt-0.5">ДОМ</div>
            </div>
          </div>
          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="nav-link bg-transparent border-none p-0">{l.label}</button>
            ))}
          </div>
          {/* CTA */}
          <div className="hidden lg:block">
            <button onClick={() => scrollTo("booking")} className="btn-coral px-6 py-2.5 rounded-xl text-xs">
              Забронировать
            </button>
          </div>
          {/* Mobile burger */}
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(v => !v)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {/* Mobile menu */}
        {mobileOpen && (
          <div className="mobile-menu lg:hidden px-6 py-6 space-y-4 border-t border-white/5 animate-fadeIn">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="block w-full text-left text-base font-semibold py-2 border-b border-white/5 opacity-80 hover:opacity-100 transition-opacity bg-transparent border-x-0 border-t-0">
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* BG */}
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.5) 50%, rgba(255,94,58,0.15) 100%)' }} />
        </div>
        {/* Geo decorations */}
        <div className="absolute top-20 right-20 w-64 h-64 geo-circle animate-spin-slow opacity-20 hidden lg:block" />
        <div className="absolute bottom-40 right-40 w-32 h-32 geo-circle animate-spin-slow opacity-10 hidden lg:block" style={{ animationDirection: 'reverse', animationDuration: '8s' }} />
        {/* Diagonal stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-32 hidden lg:block" style={{ background: 'linear-gradient(to right, var(--coral) 0%, var(--teal) 100%)', clipPath: 'polygon(0 100%, 100% 100%, 100% 30%, 0 100%)' }} />
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 animate-fadeInUp"
              style={{ background: 'rgba(255,94,58,0.2)', border: '1px solid rgba(255,94,58,0.4)', color: 'var(--coral)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--coral)' }} />
              Есть свободные номера
            </div>
            <h1 className="font-black leading-none mb-4 animate-fadeInUp delay-100"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.02em' }}>
              ЛУЧШИЙ<br/>
              <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontFamily: 'Cormorant Garamond' }}>Отдых</span><br/>
              НАЧИНАЕТСЯ
            </h1>
            <p className="text-lg opacity-70 mb-8 max-w-xl animate-fadeInUp delay-200 font-light leading-relaxed">
              Уютный гостевой дом для незабываемого отдыха. Современные номера, внимательный сервис и атмосфера домашнего тепла.
            </p>
            <div className="flex flex-wrap gap-4 animate-fadeInUp delay-300">
              <button onClick={() => scrollTo("booking")} className="btn-coral px-8 py-4 rounded-2xl text-sm animate-pulse-glow">
                Забронировать номер
              </button>
              <button onClick={() => scrollTo("rooms")} className="px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all"
                style={{ border: '2px solid rgba(255,255,255,0.3)', color: '#fff', background: 'transparent' }}
                onMouseEnter={e => { (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.background = 'transparent'; }}>
                Смотреть номера
              </button>
            </div>
            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-white/10 animate-fadeInUp delay-400">
              {[["150+", "Гостей в месяц"], ["4.9★", "Рейтинг"], ["3", "Типа номеров"], ["7", "Лет работы"]].map(([val, lab]) => (
                <div key={lab}>
                  <div className="font-black text-2xl" style={{ color: 'var(--coral)' }}>{val}</div>
                  <div className="text-xs opacity-50 font-medium mt-0.5">{lab}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-float">
          <span className="text-xs font-bold uppercase tracking-widest">Скролл</span>
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="relative py-32 overflow-hidden" style={{ background: 'var(--dark-card)' }}>
        {/* Big BG number */}
        <div className="absolute top-0 right-0 font-black opacity-[0.03] select-none pointer-events-none"
          style={{ fontSize: '20rem', lineHeight: 1, color: 'var(--coral)' }}>О</div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left text */}
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                style={{ background: 'rgba(255,94,58,0.15)', color: 'var(--coral)' }}>
                О нас
              </div>
              <h2 className="font-black mb-6 leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}>
                Место, где<br/>
                <span style={{ color: 'var(--coral)', fontFamily: 'Cormorant Garamond', fontStyle: 'italic' }}>чувствуешь</span><br/>
                себя дома
              </h2>
              <p className="text-base opacity-60 leading-relaxed mb-6 font-light">
                Наш гостевой дом открылся 7 лет назад с одной целью — создать пространство, где каждый гость чувствует себя как дома. Мы тщательно продумали каждую деталь: от уютных интерьеров до завтраков с домашней выпечкой.
              </p>
              <p className="text-base opacity-60 leading-relaxed mb-8 font-light">
                Расположенный в тихом районе, наш дом окружён зелёным садом. Здесь можно по-настоящему отдохнуть от городской суеты, насладиться свежим воздухом и природой.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Heart", text: "Семейная атмосфера" },
                  { icon: "Leaf", text: "Экологически чистое место" },
                  { icon: "Coffee", text: "Завтрак включён (Люкс)" },
                  { icon: "Shield", text: "Безопасная территория" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm opacity-80">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(255,94,58,0.15)', color: 'var(--coral)' }}>
                      <Icon name={icon as never} size={16} />
                    </div>
                    <span className="font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right image collage */}
            <div className="relative h-96 lg:h-[500px]">
              <img src={HERO_IMG} alt="about" className="absolute inset-0 w-full h-full object-cover rounded-3xl" />
              <div className="absolute inset-0 rounded-3xl" style={{ background: 'linear-gradient(135deg, transparent 60%, rgba(255,94,58,0.3))' }} />
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 px-6 py-4 rounded-2xl shadow-2xl"
                style={{ background: 'var(--dark)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="font-black text-3xl" style={{ color: 'var(--amber)' }}>4.9</div>
                <div className="text-xs opacity-50 mt-0.5">Средний рейтинг</div>
                <div className="flex gap-0.5 mt-1">
                  {[1,2,3,4,5].map(i => <span key={i} style={{ color: 'var(--amber)' }}>★</span>)}
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full flex flex-col items-center justify-center text-center shadow-xl animate-float"
                style={{ background: 'var(--coral)', color: '#fff' }}>
                <div className="font-black text-xl leading-none">7</div>
                <div className="text-xs font-bold leading-none mt-0.5">лет</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ROOMS ===== */}
      <section id="rooms" className="py-32 relative overflow-hidden" style={{ background: 'var(--dark)' }}>
        {/* Diagonal top */}
        <div className="absolute top-0 left-0 right-0 h-16"
          style={{ background: 'var(--dark-card)', clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 100%)' }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(0,201,177,0.15)', color: 'var(--teal)' }}>
              Номера
            </div>
            <h2 className="font-black leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}>
              Выберите <span style={{ color: 'var(--coral)', fontFamily: 'Cormorant Garamond', fontStyle: 'italic' }}>идеальный</span> номер
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room, i) => (
              <div key={room.id} className="room-card" style={{ background: 'var(--dark-card)', animationDelay: `${i * 0.1}s` }}>
                <div className="relative h-56">
                  <img src={room.img} alt={room.name} className="w-full h-full object-cover" />
                  <div className="overlay" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                    style={{ background: 'var(--coral)', color: '#fff' }}>
                    {room.badge}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-black text-2xl text-white">{room.name}</h3>
                    <div className="flex gap-3 text-xs text-white/60 mt-1">
                      <span className="flex items-center gap-1"><Icon name="Square" size={12} />{room.size}</span>
                      <span className="flex items-center gap-1"><Icon name="Users" size={12} />{room.guests} гостя</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.features.map(f => (
                      <span key={f} className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                        style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)' }}>
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-black text-2xl" style={{ color: 'var(--coral)' }}>{room.price.toLocaleString('ru')}</span>
                      <span className="text-sm opacity-40 ml-1">₽/ночь</span>
                    </div>
                    <button onClick={() => scrollTo("booking")} className="btn-coral px-5 py-2.5 rounded-xl text-xs">
                      Забронировать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section id="gallery" className="py-32" style={{ background: 'var(--dark-card)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                style={{ background: 'rgba(255,184,48,0.15)', color: 'var(--amber)' }}>
                Галерея
              </div>
              <h2 className="font-black leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}>
                Атмосфера<br/>
                <span style={{ color: 'var(--coral)', fontFamily: 'Cormorant Garamond', fontStyle: 'italic' }}>нашего</span> дома
              </h2>
            </div>
          </div>
          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryItems.map((item, i) => (
              <div key={i} className={`gallery-item ${i === 0 || i === 3 ? "row-span-1 md:col-span-1" : ""}`}
                style={{ height: i % 3 === 0 ? '280px' : '200px' }}>
                <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
                <div className="gal-overlay">
                  <span className="text-white font-bold text-sm opacity-0 group-hover:opacity-100">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RULES ===== */}
      <section id="rules" className="py-32 relative overflow-hidden" style={{ background: 'var(--dark)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,94,58,0.05) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(0,201,177,0.05) 0%, transparent 60%)`
        }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(255,94,58,0.15)', color: 'var(--coral)' }}>
              Порядок проживания
            </div>
            <h2 className="font-black leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}>
              Правила <span style={{ color: 'var(--coral)', fontFamily: 'Cormorant Garamond', fontStyle: 'italic' }}>нашего</span> дома
            </h2>
            <p className="mt-4 opacity-50 max-w-xl mx-auto font-light">
              Соблюдение этих простых правил помогает нам поддерживать комфортную атмосферу для всех гостей
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rules.map((rule, i) => (
              <div key={rule.title} className="p-6 rounded-2xl transition-all duration-300 hover:translate-y-[-4px] group"
                style={{ background: 'var(--dark-card)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                  style={{ background: 'rgba(255,94,58,0.15)', color: 'var(--coral)' }}>
                  <Icon name={rule.icon as never} size={22} />
                </div>
                <h3 className="font-bold text-base mb-2">{rule.title}</h3>
                <p className="text-sm opacity-50 leading-relaxed font-light">{rule.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section id="reviews" className="py-32" style={{ background: 'var(--dark-card)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(0,201,177,0.15)', color: 'var(--teal)' }}>
              Отзывы
            </div>
            <h2 className="font-black leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}>
              Что говорят<br/>
              <span style={{ color: 'var(--coral)', fontFamily: 'Cormorant Garamond', fontStyle: 'italic' }}>наши гости</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <div key={r.name} className="review-card p-6">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(r.stars)].map((_, j) => (
                    <span key={j} style={{ color: 'var(--amber)' }}>★</span>
                  ))}
                </div>
                {/* Quote icon */}
                <div className="text-5xl leading-none mb-3 font-serif opacity-20" style={{ color: 'var(--coral)' }}>"</div>
                <p className="text-base opacity-80 leading-relaxed font-light mb-6">{r.text}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{ background: 'linear-gradient(135deg, var(--coral), var(--teal))', color: '#fff' }}>
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{r.name}</div>
                      <div className="text-xs opacity-40">{r.city}</div>
                    </div>
                  </div>
                  <span className="text-xs opacity-30 font-medium">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
          {/* Big rating callout */}
          <div className="mt-12 p-8 rounded-3xl text-center"
            style={{ background: 'linear-gradient(135deg, rgba(255,94,58,0.15), rgba(0,201,177,0.1))', border: '1px solid rgba(255,94,58,0.2)' }}>
            <div className="font-black text-6xl" style={{ color: 'var(--amber)' }}>4.9</div>
            <div className="flex justify-center gap-1 my-2 text-2xl" style={{ color: 'var(--amber)' }}>★★★★★</div>
            <p className="opacity-50 text-sm font-medium">Средний рейтинг по 200+ отзывам</p>
          </div>
        </div>
      </section>

      {/* ===== BOOKING ===== */}
      <section id="booking" className="py-32 relative overflow-hidden" style={{ background: 'var(--dark)' }}>
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, var(--coral) 0%, transparent 70%)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left info */}
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                style={{ background: 'rgba(255,94,58,0.15)', color: 'var(--coral)' }}>
                Бронирование
              </div>
              <h2 className="font-black mb-6 leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}>
                Забронируйте<br/>
                <span style={{ color: 'var(--coral)', fontFamily: 'Cormorant Garamond', fontStyle: 'italic' }}>свой</span> номер
              </h2>
              <p className="opacity-60 mb-8 leading-relaxed font-light">
                Выберите удобные даты на интерактивном календаре. Зелёные дни — свободны, красные — заняты. Минимальный срок проживания: 1 ночь.
              </p>
              {/* How it works */}
              <div className="space-y-5">
                {[
                  { n: "01", title: "Выберите даты", text: "Кликайте на свободные даты в календаре" },
                  { n: "02", title: "Выберите номер", text: "Выберите тип номера и количество гостей" },
                  { n: "03", title: "Заполните данные", text: "Укажите контактную информацию" },
                  { n: "04", title: "Оплатите 50%", text: "Предоплата подтверждает бронирование" },
                ].map(step => (
                  <div key={step.n} className="flex gap-4 items-start">
                    <div className="font-black text-3xl opacity-20 w-12 flex-shrink-0 leading-none" style={{ color: 'var(--coral)' }}>{step.n}</div>
                    <div>
                      <div className="font-bold text-sm">{step.title}</div>
                      <div className="text-xs opacity-50 font-light mt-0.5">{step.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right calendar */}
            <div className="p-8 rounded-3xl" style={{ background: 'var(--dark-card)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <BookingCalendar />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACTS ===== */}
      <section id="contacts" className="py-32" style={{ background: 'var(--dark-card)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: 'rgba(255,184,48,0.15)', color: 'var(--amber)' }}>
              Контакты
            </div>
            <h2 className="font-black leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}>
              Свяжитесь <span style={{ color: 'var(--coral)', fontFamily: 'Cormorant Garamond', fontStyle: 'italic' }}>с нами</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: "Phone", label: "Телефон", value: "+7 (900) 000-00-00", sub: "Ежедневно 8:00–22:00" },
              { icon: "Mail", label: "Email", value: "info@guestdом.ru", sub: "Ответим в течение часа" },
              { icon: "MapPin", label: "Адрес", value: "ул. Садовая, 15", sub: "г. Краснодар" },
              { icon: "MessageCircle", label: "WhatsApp", value: "+7 (900) 000-00-00", sub: "Быстрые ответы" },
            ].map(c => (
              <div key={c.label} className="p-6 rounded-2xl text-center transition-all hover:translate-y-[-4px]"
                style={{ background: 'var(--dark)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(255,94,58,0.15)', color: 'var(--coral)' }}>
                  <Icon name={c.icon as never} size={22} />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2">{c.label}</div>
                <div className="font-bold text-sm mb-1">{c.value}</div>
                <div className="text-xs opacity-40 font-light">{c.sub}</div>
              </div>
            ))}
          </div>
          {/* Contact form */}
          <div className="max-w-2xl mx-auto p-8 rounded-3xl" style={{ background: 'var(--dark)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="font-black text-2xl mb-6">Напишите нам</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Ваше имя" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-coral transition-colors text-sm" style={{ fontFamily: 'Montserrat' }} />
                <input placeholder="Телефон" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-coral transition-colors text-sm" style={{ fontFamily: 'Montserrat' }} />
              </div>
              <input placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-coral transition-colors text-sm" style={{ fontFamily: 'Montserrat' }} />
              <textarea rows={4} placeholder="Ваш вопрос или пожелание..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-coral transition-colors resize-none text-sm" style={{ fontFamily: 'Montserrat' }} />
              <button className="btn-coral w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest">
                Отправить сообщение
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-12 border-t" style={{ background: 'var(--dark)', borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg"
                style={{ background: 'var(--coral)', color: '#fff' }}>Г</div>
              <div>
                <div className="font-black text-base leading-none">ГОСТЕВОЙ ДОМ</div>
                <div className="text-xs opacity-30 mt-0.5">Уютный отдых с 2018 года</div>
              </div>
            </div>
            <div className="flex gap-6">
              {navLinks.map(l => (
                <button key={l.id} onClick={() => scrollTo(l.id)} className="text-xs opacity-40 hover:opacity-80 transition-opacity font-semibold uppercase tracking-wider bg-transparent border-none cursor-pointer">
                  {l.label}
                </button>
              ))}
            </div>
            <div className="text-xs opacity-20 font-medium">© 2026 Гостевой дом. Все права защищены.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}