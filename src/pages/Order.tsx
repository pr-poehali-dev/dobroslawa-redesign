import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Layout from "@/components/Layout";

const sections = [
  {
    icon: "Clock",
    title: "Заезд и выезд",
    items: [
      "Заезд (check-in) гостей — с 14:00 текущего дня по местному времени.",
      "Заселение до 14:00 (ранний заезд) — только при наличии свободного номера, готового к заселению.",
      "Выезд (check-out) — до 12:00.",
      "Выселение гостя производится до 12:00.",
      "Продление срока проживания возможно только при наличии свободных мест.",
      "Продление срока на период менее суток не производится.",
      "При проживании менее суток плата взимается за полные сутки вне зависимости от времени заселения.",
    ],
  },
  {
    icon: "IdCard",
    title: "Регистрация и документы",
    items: [
      "Размещение гостей осуществляется только при предъявлении паспорта, оформленного в соответствии с законодательством РФ.",
      "Дом «Доброславия» предназначен для проживания граждан России и иностранных граждан.",
      "Для подтверждения статуса гостя и свободного входа в здание гость должен иметь при себе «гостевую карту» «Доброславии».",
    ],
  },
  {
    icon: "Users",
    title: "Посетители",
    items: [
      "В целях безопасности проживающих гостей, вход посетителей осуществляется по документу, удостоверяющему личность, и только в сопровождении гостя.",
      "Посетители обязаны покинуть «Доброславию» не позднее 23:00.",
      "При нарушении этого условия с посетителя взимается оплата как за гостя за сутки с дополнительным местом.",
      "Проживание в «Доброславии» незарегистрированных гостей не допускается.",
    ],
  },
  {
    icon: "CreditCard",
    title: "Оплата",
    items: [
      "Бронирование номера производится при внесении гостем предоплаты в размере стоимости всего запланированного срока проживания.",
      "Оплата за проживание в номерах начисляется согласно расчётному часу, положениям настоящего регламента и действующего прейскуранта.",
      "Принимаются наличные и безналичная оплата.",
    ],
  },
  {
    icon: "Cigarette",
    title: "Курение",
    items: [
      "Курение в номерах, а также во всех помещениях «Доброславии» строго запрещено.",
      "Штраф за курение в номере (наличие запаха дыма, следов курения) и в других помещениях — 3 000 рублей.",
      "При систематическом нарушении данного правила администрация вправе произвести досрочное выселение без возврата оплаченной стоимости проживания.",
    ],
  },
  {
    icon: "Shield",
    title: "Безопасность и ответственность",
    items: [
      "«Доброславия» не несёт ответственности за утрату денег, иной валюты, ценных бумаг, кредитных и телефонных карт, ювелирных украшений и других ценностей, не сданных на хранение в сейф на ресепшн.",
      "«Доброславия» вправе расторгнуть договор об оказании гостиничных услуг в одностороннем порядке или отказать в продлении срока проживания в случае нарушения гостем порядка проживания, правил пожарной безопасности, несвоевременной оплаты, причинения ущерба.",
      "При заселении в номер ознакомьтесь с требованиями пожарной безопасности.",
      "Запрещается вносить и хранить в номере легковоспламеняющиеся жидкости, взрывчатые вещества и материалы.",
    ],
  },
];

const quickRules = [
  { icon: "Clock4", label: "Заезд", value: "с 14:00" },
  { icon: "LogOut", label: "Выезд", value: "до 12:00" },
  { icon: "Moon", label: "Тихий час", value: "с 23:00" },
  { icon: "Cigarette", label: "Курение", value: "запрещено" },
  { icon: "PawPrint", label: "Животные", value: "по запросу" },
  { icon: "CreditCard", label: "Предоплата", value: "100%" },
];

export default function Order() {
  return (
    <Layout>
      {/* HEADER */}
      <div className="pt-32 pb-16 relative overflow-hidden" style={{ background: "var(--dark-card)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 70% 50%, rgba(74,124,69,0.08) 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <nav className="text-xs flex items-center gap-2 mb-6" style={{ opacity: 0.45 }}>
            <Link to="/" className="text-white no-underline">Главная</Link>
            <Icon name="ChevronRight" size={12} />
            <span>Порядок проживания</span>
          </nav>
          <div className="section-label">Правила и условия</div>
          <h1 className="font-black" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}>
            Порядок проживания
          </h1>
          <p className="mt-4 max-w-xl text-base" style={{ opacity: 0.55, fontWeight: 300 }}>
            Соблюдение этих правил обеспечивает комфорт и безопасность для всех гостей «Доброславии».
          </p>
        </div>
      </div>

      {/* QUICK RULES */}
      <section className="py-12" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickRules.map(r => (
              <div
                key={r.label}
                className="p-5 rounded-2xl text-center hover-card"
                style={{ background: "var(--dark-card)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: "rgba(74,124,69,0.15)", color: "var(--green-light)" }}
                >
                  <Icon name={r.icon as never} size={18} />
                </div>
                <div className="font-black text-base" style={{ color: "var(--green-light)" }}>{r.value}</div>
                <div className="text-xs mt-0.5" style={{ opacity: 0.45 }}>{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAILED RULES */}
      <section className="py-12 pb-24" style={{ background: "var(--bg)" }}>
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          {sections.map((s, i) => (
            <div
              key={s.title}
              className="rounded-2xl overflow-hidden"
              style={{ background: "var(--dark-card)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Section header */}
              <div
                className="flex items-center gap-4 px-7 py-5 border-b"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(74,124,69,0.15)", color: "var(--green-light)" }}
                >
                  <Icon name={s.icon as never} size={20} />
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="font-black text-xs w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--green)", color: "#fff", fontSize: "0.6rem" }}
                  >
                    {i + 1}
                  </span>
                  <h2 className="font-black text-lg">{s.title}</h2>
                </div>
              </div>
              {/* Section items */}
              <ul className="px-7 py-5 space-y-3">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm leading-relaxed" style={{ opacity: 0.75 }}>
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                      style={{ background: "var(--green-light)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Note */}
          <div
            className="p-6 rounded-2xl flex items-start gap-4"
            style={{
              background: "rgba(200,151,60,0.08)",
              border: "1px solid rgba(200,151,60,0.25)",
            }}
          >
            <Icon name="Info" size={20} style={{ color: "var(--amber)", flexShrink: 0, marginTop: 2 }} />
            <p className="text-sm leading-relaxed" style={{ opacity: 0.75 }}>
              «Доброславия» вправе вносить изменения в настоящий порядок проживания. Актуальная версия всегда доступна
              на сайте и на стойке регистрации. По всем вопросам обращайтесь на ресепшн:{" "}
              <a href="tel:+78632614444" className="font-bold no-underline" style={{ color: "var(--amber)" }}>
                +7 (863) 261-44-44
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 text-center"
        style={{ background: "var(--dark-card)", borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-xl mx-auto px-6">
          <h3 className="font-black text-2xl mb-3">Готовы к заселению?</h3>
          <p className="mb-6 text-sm" style={{ opacity: 0.5 }}>
            Если остались вопросы — позвоните нам или забронируйте номер онлайн
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/booking" className="btn-green px-8 py-3.5 rounded-2xl text-sm">
              Забронировать номер
            </Link>
            <Link to="/contacts" className="btn-outline px-8 py-3.5 rounded-2xl text-sm">
              Контакты
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
