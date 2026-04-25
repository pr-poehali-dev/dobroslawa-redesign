import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Layout from "@/components/Layout";

const HERO = "https://cdn.poehali.dev/projects/def34d81-8ae3-4796-b4f0-8d6f47877d59/files/fd53e119-1024-4815-af52-a6c62dae9184.jpg";
const ROOM1 = "https://cdn.poehali.dev/projects/def34d81-8ae3-4796-b4f0-8d6f47877d59/files/22d5d92c-7866-4bac-9056-5da5d6ccb273.jpg";
const ROOM2 = "https://cdn.poehali.dev/projects/def34d81-8ae3-4796-b4f0-8d6f47877d59/files/30b818f8-7206-4968-8856-54964bc7e0b1.jpg";
const ROOM3 = "https://cdn.poehali.dev/projects/def34d81-8ae3-4796-b4f0-8d6f47877d59/files/d06acce6-0da8-4834-8e8a-36dd510689ee.jpg";

const rooms = [
  { name: "Стандарт", price: 2500, guests: 2, img: ROOM1, badge: "Хит" },
  { name: "Комфорт", price: 3800, guests: 3, img: ROOM2, badge: "Популярный" },
  { name: "Люкс", price: 5500, guests: 4, img: ROOM3, badge: "Премиум" },
];

const perks = [
  { icon: "MapPin", title: "Центр города", text: "5 минут до делового центра Ростова-на-Дону" },
  { icon: "Wifi", title: "Бесплатный Wi-Fi", text: "Высокоскоростной интернет по всему дому" },
  { icon: "Car", title: "Парковка", text: "Охраняемая парковка для гостей бесплатно" },
  { icon: "Coffee", title: "Кухня", text: "Оборудованная общая кухня с холодильником" },
  { icon: "Shield", title: "Безопасность", text: "Видеонаблюдение и охрана круглосуточно" },
  { icon: "Thermometer", title: "Климат", text: "Кондиционер и отопление в каждом номере" },
];

export default function Index() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO} alt="Доброславия" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(120deg, rgba(8,14,7,0.9) 0%, rgba(8,14,7,0.6) 60%, rgba(74,124,69,0.1) 100%)" }}
          />
        </div>
        <div
          className="absolute top-24 right-16 w-80 h-80 rounded-full hidden lg:block pointer-events-none"
          style={{ border: "1px solid rgba(74,124,69,0.12)" }}
        />
        <div
          className="absolute top-40 right-32 w-48 h-48 rounded-full hidden lg:block pointer-events-none"
          style={{ border: "1px solid rgba(74,124,69,0.08)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20">
          <div className="max-w-2xl">
            <div className="section-label animate-fadeInUp mb-6">Ростов-на-Дону</div>
            <h1
              className="font-black leading-none mb-6 animate-fadeInUp delay-100"
              style={{ fontSize: "clamp(3.2rem, 7vw, 6.5rem)", letterSpacing: "-0.03em" }}
            >
              Гостевой<br />
              <span style={{ color: "var(--green-light)", fontStyle: "italic" }}>дом</span><br />
              Доброславия
            </h1>
            <p
              className="text-lg mb-8 leading-relaxed animate-fadeInUp delay-200"
              style={{ opacity: 0.65, fontWeight: 300 }}
            >
              Уютные гостевые комнаты в самом сердце Ростова. Домашняя атмосфера, чистота и забота о каждом госте.
            </p>
            <div className="flex flex-wrap gap-4 animate-fadeInUp delay-300">
              <Link to="/booking" className="btn-green px-8 py-4 rounded-2xl text-sm">
                Забронировать
              </Link>
              <Link to="/rooms" className="btn-outline px-8 py-4 rounded-2xl text-sm">
                Посмотреть номера
              </Link>
            </div>
            <div
              className="flex gap-8 mt-14 pt-8 border-t animate-fadeInUp delay-400"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              {[["10+", "лет работы"], ["500+", "гостей в год"], ["4.8★", "рейтинг"], ["3", "типа номеров"]].map(([v, l]) => (
                <div key={l}>
                  <div className="font-black text-2xl leading-none" style={{ color: "var(--green-light)" }}>{v}</div>
                  <div className="text-xs mt-1 font-medium" style={{ opacity: 0.45 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <a
          href="tel:+78632614444"
          className="absolute bottom-8 right-6 lg:right-12 flex items-center gap-3 px-5 py-3 rounded-2xl no-underline"
          style={{
            background: "rgba(74,124,69,0.2)",
            border: "1px solid rgba(74,124,69,0.4)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--green)" }}>
            <Icon name="Phone" size={15} color="#fff" />
          </div>
          <div>
            <div className="text-xs font-medium leading-none" style={{ opacity: 0.5 }}>Звонок бесплатно</div>
            <div className="font-bold text-sm leading-none mt-0.5 text-white">+7 (863) 261-44-44</div>
          </div>
        </a>
      </section>

      {/* PERKS */}
      <section className="py-24" style={{ background: "var(--dark-card)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="section-label justify-center">Почему выбирают нас</div>
            <h2 className="font-black" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}>
              Всё для вашего комфорта
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {perks.map((p) => (
              <div
                key={p.title}
                className="hover-card p-6 rounded-2xl group"
                style={{ background: "var(--dark-2)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                  style={{ background: "rgba(74,124,69,0.15)", color: "var(--green-light)" }}
                >
                  <Icon name={p.icon as never} size={20} />
                </div>
                <h3 className="font-bold text-base mb-1.5">{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ opacity: 0.5 }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROOMS PREVIEW */}
      <section className="py-24" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="section-label">Номера</div>
              <h2 className="font-black" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}>
                Выберите номер
              </h2>
            </div>
            <Link to="/rooms" className="btn-outline px-6 py-3 rounded-xl text-xs">
              Все номера →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {rooms.map((r) => (
              <div key={r.name} className="room-card">
                <div className="room-img relative" style={{ height: "220px" }}>
                  <img src={r.img} alt={r.name} className="w-full h-full object-cover" />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(8,14,7,0.9) 0%, transparent 60%)" }}
                  />
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: "var(--green)", color: "#fff" }}
                  >
                    {r.badge}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-black text-xl text-white">{r.name}</h3>
                    <div className="text-xs text-white flex items-center gap-1 mt-0.5" style={{ opacity: 0.6 }}>
                      <Icon name="Users" size={12} /> до {r.guests} гостей
                    </div>
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <span className="font-black text-xl" style={{ color: "var(--green-light)" }}>{r.price.toLocaleString("ru")}</span>
                    <span className="text-xs ml-1" style={{ opacity: 0.4 }}>₽/ночь</span>
                  </div>
                  <Link to="/booking" className="btn-green px-5 py-2.5 rounded-xl text-xs">
                    Забронировать
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="py-20" style={{ background: "var(--green-dark)" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-black mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.02em" }}>
            Готовы к отдыху?
          </h2>
          <p className="mb-8 max-w-lg mx-auto" style={{ opacity: 0.7, fontWeight: 300 }}>
            Забронируйте номер прямо сейчас — без посредников и скрытых комиссий
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/booking"
              className="px-10 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider no-underline transition-all"
              style={{ background: "#fff", color: "var(--green-dark)" }}
            >
              Забронировать онлайн
            </Link>
            <a
              href="tel:+78632614444"
              className="btn-outline px-10 py-4 rounded-2xl text-sm flex items-center gap-2 no-underline"
            >
              <Icon name="Phone" size={16} /> Позвонить
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
