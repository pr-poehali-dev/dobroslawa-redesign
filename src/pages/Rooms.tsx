import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Layout from "@/components/Layout";

const ROOM1 = "https://cdn.poehali.dev/projects/def34d81-8ae3-4796-b4f0-8d6f47877d59/files/22d5d92c-7866-4bac-9056-5da5d6ccb273.jpg";
const ROOM2 = "https://cdn.poehali.dev/projects/def34d81-8ae3-4796-b4f0-8d6f47877d59/files/30b818f8-7206-4968-8856-54964bc7e0b1.jpg";
const ROOM3 = "https://cdn.poehali.dev/projects/def34d81-8ae3-4796-b4f0-8d6f47877d59/files/d06acce6-0da8-4834-8e8a-36dd510689ee.jpg";

const rooms = [
  {
    id: 1,
    name: "Стандарт",
    price: 2500,
    priceWeekend: 2900,
    guests: 2,
    size: "16 м²",
    img: ROOM1,
    badge: "Хит",
    desc: "Уютная комната для одного или двух гостей. Всё необходимое для комфортного проживания: удобная кровать, рабочий стол, шкаф для одежды.",
    amenities: ["Wi-Fi", "Кондиционер", "ТВ", "Душ", "Фен", "Полотенца"],
    bedType: "Двуспальная кровать",
  },
  {
    id: 2,
    name: "Комфорт",
    price: 3800,
    priceWeekend: 4300,
    guests: 3,
    size: "22 м²",
    img: ROOM2,
    badge: "Популярный",
    desc: "Просторная комната с дополнительным спальным местом. Идеально для небольшой семьи или коллег в командировке.",
    amenities: ["Wi-Fi", "Кондиционер", "ТВ", "Душ", "Фен", "Полотенца", "Мини-холодильник"],
    bedType: "2 раздельные кровати + диван",
  },
  {
    id: 3,
    name: "Люкс",
    price: 5500,
    priceWeekend: 6200,
    guests: 4,
    size: "32 м²",
    img: ROOM3,
    badge: "Премиум",
    desc: "Наш лучший номер с просторной гостиной зоной и отдельной спальней. Максимальный комфорт для требовательных гостей.",
    amenities: ["Wi-Fi", "Кондиционер", "ТВ", "Ванна", "Фен", "Полотенца", "Мини-холодильник", "Кофемашина", "Балкон"],
    bedType: "Двуспальная кровать + диван-кровать",
  },
];

const rules = [
  { icon: "Clock", title: "Заезд с 14:00", text: "Выезд до 12:00. Ранний заезд/поздний выезд по согласованию." },
  { icon: "Users", title: "Гости", text: "Посещение посторонних лиц необходимо согласовывать заранее." },
  { icon: "Volume2", title: "Тихий час", text: "С 23:00 до 07:00 просим соблюдать тишину." },
  { icon: "Cigarette", title: "Курение", text: "Курение разрешено только в специальных зонах на улице." },
  { icon: "PawPrint", title: "Животные", text: "Проживание с питомцами — по предварительному согласованию." },
  { icon: "CreditCard", title: "Оплата", text: "Предоплата 30% при бронировании, остаток при заезде." },
];

export default function Rooms() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <Layout>
      {/* PAGE HEADER */}
      <div
        className="pt-32 pb-16 relative overflow-hidden"
        style={{ background: "var(--dark-card)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 70% 50%, rgba(74,124,69,0.08) 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <nav className="text-xs flex items-center gap-2 mb-6" style={{ opacity: 0.45 }}>
            <Link to="/" className="text-white no-underline hover:opacity-100 transition-opacity">Главная</Link>
            <Icon name="ChevronRight" size={12} />
            <span>Номера</span>
          </nav>
          <div className="section-label">Размещение</div>
          <h1 className="font-black" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}>
            Наши номера
          </h1>
          <p className="mt-4 max-w-xl text-base" style={{ opacity: 0.55, fontWeight: 300 }}>
            3 категории номеров на любой вкус и бюджет. Каждый номер оборудован всем необходимым для комфортного отдыха.
          </p>
        </div>
      </div>

      {/* ROOMS LIST */}
      <section className="py-16" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          {rooms.map((room, i) => (
            <div
              key={room.id}
              className="rounded-2xl overflow-hidden"
              style={{ background: "var(--dark-card)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className={`grid lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>:first-child]:order-2" : ""}`}>
                {/* Image */}
                <div className="relative overflow-hidden" style={{ minHeight: "320px" }}>
                  <img src={room.img} alt={room.name} className="w-full h-full object-cover absolute inset-0" style={{ transition: "transform 0.5s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 60%, rgba(20,30,18,0.8))" }} />
                  <div
                    className="absolute top-5 left-5 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: "var(--green)", color: "#fff" }}
                  >
                    {room.badge}
                  </div>
                </div>
                {/* Info */}
                <div className="p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                      <h2 className="font-black text-3xl">{room.name}</h2>
                      <div className="text-right">
                        <div className="font-black text-2xl" style={{ color: "var(--green-light)" }}>
                          {room.price.toLocaleString("ru")} ₽
                        </div>
                        <div className="text-xs" style={{ opacity: 0.4 }}>за ночь</div>
                        <div className="text-xs mt-0.5" style={{ opacity: 0.4 }}>
                          выходные: {room.priceWeekend.toLocaleString("ru")} ₽
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-4 text-sm" style={{ opacity: 0.6 }}>
                      <span className="flex items-center gap-1.5"><Icon name="Users" size={14} /> до {room.guests} гостей</span>
                      <span className="flex items-center gap-1.5"><Icon name="Square" size={14} /> {room.size}</span>
                      <span className="flex items-center gap-1.5"><Icon name="Bed" size={14} /> {room.bedType}</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-5" style={{ opacity: 0.6 }}>{room.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {room.amenities.map(a => (
                        <span key={a} className="amenity-chip">{a}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link to="/booking" className="btn-green px-7 py-3 rounded-xl text-xs">
                      Забронировать этот номер
                    </Link>
                    <button
                      onClick={() => setSelected(selected === room.id ? null : room.id)}
                      className="btn-outline px-7 py-3 rounded-xl text-xs"
                    >
                      {selected === room.id ? "Скрыть" : "Подробнее"}
                    </button>
                  </div>
                  {selected === room.id && (
                    <div className="mt-5 pt-5 border-t text-sm" style={{ borderColor: "rgba(255,255,255,0.08)", opacity: 0.7 }}>
                      <p>Все номера включают: постельное бельё, полотенца, туалетные принадлежности, доступ на общую кухню, бесплатную парковку.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RULES */}
      <section className="py-20" style={{ background: "var(--dark-card)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-label">Правила</div>
          <h2 className="font-black mb-10" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.02em" }}>
            Правила проживания
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rules.map(r => (
              <div
                key={r.title}
                className="p-5 rounded-2xl flex items-start gap-4"
                style={{ background: "var(--dark-2)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(74,124,69,0.15)", color: "var(--green-light)" }}
                >
                  <Icon name={r.icon as never} size={18} />
                </div>
                <div>
                  <div className="font-bold text-sm mb-1">{r.title}</div>
                  <div className="text-xs leading-relaxed" style={{ opacity: 0.5 }}>{r.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
