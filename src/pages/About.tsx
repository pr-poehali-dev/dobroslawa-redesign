import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Layout from "@/components/Layout";

const HERO = "https://cdn.poehali.dev/projects/def34d81-8ae3-4796-b4f0-8d6f47877d59/files/fd53e119-1024-4815-af52-a6c62dae9184.jpg";
const ROOM = "https://cdn.poehali.dev/projects/def34d81-8ae3-4796-b4f0-8d6f47877d59/files/22d5d92c-7866-4bac-9056-5da5d6ccb273.jpg";

const values = [
  { icon: "Heart", title: "Забота о гостях", text: "Каждый гость для нас — особенный. Мы стараемся предвосхитить каждое ваше пожелание." },
  { icon: "Leaf", title: "Чистота", text: "Ежедневная уборка, свежее постельное бельё, стерильные санузлы — наш стандарт." },
  { icon: "Home", title: "Домашняя атмосфера", text: "Мы создаём ощущение дома: уютно, тепло, без излишней формальности." },
  { icon: "Star", title: "Качество", text: "10 лет опыта позволяют нам знать, что важно для гостей, и постоянно совершенствоваться." },
];

const reviews = [
  { name: "Анна К.", city: "Москва", stars: 5, text: "Чудесное место! Приезжаю уже в третий раз — всегда радушный приём и чистые номера.", date: "Март 2026" },
  { name: "Дмитрий Р.", city: "Краснодар", stars: 5, text: "Идеальное соотношение цена/качество. Очень удобное расположение, рядом всё необходимое.", date: "Февраль 2026" },
  { name: "Елена В.", city: "СПб", stars: 5, text: "Останавливались на неделю в командировке. Очень понравилось — как дома, только лучше!", date: "Январь 2026" },
  { name: "Сергей М.", city: "Воронеж", stars: 4, text: "Хорошее место. Тихо, уютно, хозяева отзывчивые. Буду рекомендовать друзьям.", date: "Декабрь 2025" },
];

export default function About() {
  return (
    <Layout>
      {/* HEADER */}
      <div className="pt-32 pb-16 relative overflow-hidden" style={{ background: "var(--dark-card)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 60% 50%, rgba(74,124,69,0.08) 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <nav className="text-xs flex items-center gap-2 mb-6" style={{ opacity: 0.45 }}>
            <Link to="/" className="text-white no-underline">Главная</Link>
            <Icon name="ChevronRight" size={12} />
            <span>О нас</span>
          </nav>
          <div className="section-label">О гостевом доме</div>
          <h1 className="font-black" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}>
            О Доброславии
          </h1>
        </div>
      </div>

      {/* STORY */}
      <section className="py-20" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label">Наша история</div>
              <h2 className="font-black mb-6" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}>
                Более 10 лет<br />
                <span style={{ color: "var(--green-light)", fontStyle: "italic" }}>гостеприимства</span>
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ opacity: 0.65, fontWeight: 300 }}>
                <p>
                  Гостевой дом «Доброславия» открылся в Ростове-на-Дону более 10 лет назад. Идея была простой — создать место, где каждый гость чувствует себя как дома: уютно, безопасно и без лишних хлопот.
                </p>
                <p>
                  За эти годы у нас побывали тысячи гостей — туристы, командировочные, семьи. Каждый из них стал частью нашей истории, и именно благодаря им мы продолжаем совершенствоваться.
                </p>
                <p>
                  Мы гордимся тем, что многие гости возвращаются снова и снова, и рекомендуют нас своим друзьям и коллегам. Это лучшая оценка нашего труда.
                </p>
              </div>
              <div className="flex gap-8 mt-8 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                {[["10+", "лет работы"], ["5000+", "гостей"], ["4.8★", "рейтинг"]].map(([v, l]) => (
                  <div key={l}>
                    <div className="font-black text-2xl" style={{ color: "var(--green-light)" }}>{v}</div>
                    <div className="text-xs mt-1" style={{ opacity: 0.45 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={HERO} alt="Доброславия" className="w-full rounded-2xl object-cover" style={{ height: "480px" }} />
              <div
                className="absolute -bottom-6 -left-6 px-6 py-4 rounded-2xl shadow-2xl"
                style={{ background: "var(--dark-card)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  {[1,2,3,4,5].map(i => <span key={i} style={{ color: "var(--amber)" }}>★</span>)}
                </div>
                <div className="font-black text-2xl" style={{ color: "var(--amber)" }}>4.8</div>
                <div className="text-xs mt-0.5" style={{ opacity: 0.5 }}>Средний рейтинг</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20" style={{ background: "var(--dark-card)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-label justify-center">Наши принципы</div>
            <h2 className="font-black" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}>
              Что нас отличает
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(v => (
              <div
                key={v.title}
                className="hover-card p-6 rounded-2xl text-center"
                style={{ background: "var(--dark-2)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(74,124,69,0.15)", color: "var(--green-light)" }}
                >
                  <Icon name={v.icon as never} size={22} />
                </div>
                <h3 className="font-bold text-base mb-2">{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ opacity: 0.5 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITY */}
      <section className="py-20" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <img src={ROOM} alt="Номер" className="w-full rounded-2xl object-cover" style={{ height: "400px" }} />
            </div>
            <div className="order-1 lg:order-2">
              <div className="section-label">Инфраструктура</div>
              <h2 className="font-black mb-6" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}>
                Всё включено
              </h2>
              <div className="space-y-4">
                {[
                  ["Wifi", "Бесплатный интернет", "Высокоскоростной Wi-Fi по всему дому без ограничений"],
                  ["Car", "Парковка", "Охраняемая стоянка на территории для всех гостей"],
                  ["UtensilsCrossed", "Кухня", "Полностью оборудованная общая кухня: плита, холодильник, посуда"],
                  ["Washing Machine", "Прачечная", "Стиральная машина доступна по запросу"],
                  ["MapPin", "Расположение", "В 5 минутах от центра, остановки транспорта рядом"],
                ].map(([icon, title, text]) => (
                  <div key={title} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(74,124,69,0.15)", color: "var(--green-light)" }}
                    >
                      <Icon name={icon as never} size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-sm mb-0.5">{title}</div>
                      <div className="text-sm" style={{ opacity: 0.5 }}>{text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20" style={{ background: "var(--dark-card)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-label justify-center">Отзывы</div>
            <h2 className="font-black" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}>
              Что говорят гости
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {reviews.map(r => (
              <div
                key={r.name}
                className="hover-card p-6 rounded-2xl"
                style={{ background: "var(--dark-2)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(r.stars)].map((_, i) => (
                    <span key={i} style={{ color: "var(--amber)" }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ opacity: 0.75 }}>"{r.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{ background: "var(--green)", color: "#fff" }}
                    >
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{r.name}</div>
                      <div className="text-xs" style={{ opacity: 0.4 }}>{r.city}</div>
                    </div>
                  </div>
                  <span className="text-xs" style={{ opacity: 0.3 }}>{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
