import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const navLinks = [
  { to: "/", label: "Главная" },
  { to: "/rooms", label: "Номера" },
  { to: "/gallery", label: "Галерея" },
  { to: "/about", label: "О нас" },
  { to: "/booking", label: "Бронирование" },
  { to: "/contacts", label: "Контакты" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled || !isHome
            ? "rgba(14,22,12,0.97)"
            : "transparent",
          backdropFilter: scrolled || !isHome ? "blur(24px)" : "none",
          borderBottom: scrolled || !isHome ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: "72px" }}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline group">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-lg transition-transform group-hover:scale-105"
              style={{ background: "var(--green)", color: "#fff" }}
            >
              Д
            </div>
            <div>
              <div className="font-black text-base leading-none tracking-wide text-white">
                ДОБРОСЛАВИЯ
              </div>
              <div className="text-xs tracking-[0.2em] font-light mt-0.5" style={{ color: "var(--green-light)", opacity: 0.8 }}>
                гостевой дом · ростов-на-дону
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="nav-link"
                style={{ color: location.pathname === l.to ? "var(--green-light)" : undefined }}
              >
                {l.label}
                {location.pathname === l.to && (
                  <span
                    className="absolute bottom-[-4px] left-0 w-full h-0.5 rounded"
                    style={{ background: "var(--green)" }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+78632614444" className="flex items-center gap-2 text-sm font-semibold opacity-70 hover:opacity-100 transition-opacity text-white no-underline">
              <Icon name="Phone" size={14} />
              +7 (863) 261-44-44
            </a>
            <Link to="/booking" className="btn-green px-5 py-2.5 rounded-xl text-xs no-underline">
              Забронировать
            </Link>
          </div>

          {/* Burger */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileOpen((v) => !v)}
            style={{ background: "transparent", border: "none" }}
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="lg:hidden px-6 py-6 space-y-1 border-t animate-fadeIn"
            style={{ background: "rgba(14,22,12,0.99)", borderColor: "rgba(255,255,255,0.06)" }}
          >
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="block py-3 text-base font-semibold border-b no-underline transition-colors"
                style={{
                  color: location.pathname === l.to ? "var(--green-light)" : "rgba(255,255,255,0.75)",
                  borderColor: "rgba(255,255,255,0.05)",
                }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="tel:+78632614444"
              className="flex items-center gap-2 pt-4 text-sm font-bold no-underline"
              style={{ color: "var(--green-light)" }}
            >
              <Icon name="Phone" size={16} />
              +7 (863) 261-44-44
            </a>
          </div>
        )}
      </nav>

      {/* PAGE CONTENT */}
      <main>{children}</main>

      {/* FOOTER */}
      <footer
        className="py-14 border-t"
        style={{ background: "var(--dark-deep)", borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black" style={{ background: "var(--green)", color: "#fff" }}>Д</div>
                <div>
                  <div className="font-black text-sm text-white">ДОБРОСЛАВИЯ</div>
                  <div className="text-xs opacity-40 font-light">Гостевой дом</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed opacity-50 font-light">
                Уютные гостевые комнаты в Ростове-на-Дону. Домашняя атмосфера, удобное расположение, внимательный сервис.
              </p>
            </div>
            {/* Links */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-4 opacity-40">Навигация</div>
              <div className="space-y-2">
                {navLinks.map((l) => (
                  <Link key={l.to} to={l.to} className="block text-sm opacity-60 hover:opacity-100 transition-opacity no-underline text-white">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
            {/* Contacts */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-4 opacity-40">Контакты</div>
              <div className="space-y-3">
                <a href="tel:+78632614444" className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity no-underline text-white">
                  <Icon name="Phone" size={14} style={{ color: "var(--green-light)" }} />
                  +7 (863) 261-44-44
                </a>
                <a href="mailto:info@dobroslawa.ru" className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity no-underline text-white">
                  <Icon name="Mail" size={14} style={{ color: "var(--green-light)" }} />
                  info@dobroslawa.ru
                </a>
                <div className="flex items-start gap-2 text-sm opacity-70">
                  <Icon name="MapPin" size={14} style={{ color: "var(--green-light)", marginTop: 2 }} />
                  <span>Ростов-на-Дону,<br />ул. Доброславы</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <div className="text-xs opacity-20">© 2026 Гостевой дом «Доброславия». Все права защищены.</div>
            <div className="text-xs opacity-20">Ростов-на-Дону</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
