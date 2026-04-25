import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Layout from "@/components/Layout";

const IMG1 = "https://cdn.poehali.dev/projects/def34d81-8ae3-4796-b4f0-8d6f47877d59/files/fd53e119-1024-4815-af52-a6c62dae9184.jpg";
const IMG2 = "https://cdn.poehali.dev/projects/def34d81-8ae3-4796-b4f0-8d6f47877d59/files/22d5d92c-7866-4bac-9056-5da5d6ccb273.jpg";
const IMG3 = "https://cdn.poehali.dev/projects/def34d81-8ae3-4796-b4f0-8d6f47877d59/files/30b818f8-7206-4968-8856-54964bc7e0b1.jpg";
const IMG4 = "https://cdn.poehali.dev/projects/def34d81-8ae3-4796-b4f0-8d6f47877d59/files/d06acce6-0da8-4834-8e8a-36dd510689ee.jpg";

const categories = ["Все", "Снаружи", "Номера", "Территория", "Кухня"];

const photos = [
  { id: 1, src: IMG1, cat: "Снаружи", label: "Фасад дома", span: "col-span-2" },
  { id: 2, src: IMG2, cat: "Номера", label: "Номер Стандарт", span: "" },
  { id: 3, src: IMG3, cat: "Территория", label: "Зона отдыха", span: "" },
  { id: 4, src: IMG4, cat: "Снаружи", label: "Вечерний вид", span: "" },
  { id: 5, src: IMG2, cat: "Номера", label: "Номер Комфорт", span: "" },
  { id: 6, src: IMG3, cat: "Территория", label: "Сад", span: "col-span-2" },
  { id: 7, src: IMG1, cat: "Кухня", label: "Общая кухня", span: "" },
  { id: 8, src: IMG4, cat: "Номера", label: "Номер Люкс", span: "" },
  { id: 9, src: IMG2, cat: "Территория", label: "Парковка", span: "" },
];

export default function Gallery() {
  const [cat, setCat] = useState("Все");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = cat === "Все" ? photos : photos.filter(p => p.cat === cat);
  const lbPhoto = lightbox !== null ? photos.find(p => p.id === lightbox) : null;

  return (
    <Layout>
      {/* HEADER */}
      <div className="pt-32 pb-16 relative overflow-hidden" style={{ background: "var(--dark-card)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 30% 50%, rgba(74,124,69,0.08) 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <nav className="text-xs flex items-center gap-2 mb-6" style={{ opacity: 0.45 }}>
            <Link to="/" className="text-white no-underline">Главная</Link>
            <Icon name="ChevronRight" size={12} />
            <span>Галерея</span>
          </nav>
          <div className="section-label">Фотографии</div>
          <h1 className="font-black" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}>
            Галерея
          </h1>
          <p className="mt-4 max-w-xl text-base" style={{ opacity: 0.55, fontWeight: 300 }}>
            Посмотрите на наш гостевой дом изнутри и снаружи — чистые, уютные номера и ухоженная территория.
          </p>
        </div>
      </div>

      {/* FILTER */}
      <section className="py-10" style={{ background: "var(--bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className="px-5 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: cat === c ? "var(--green)" : "rgba(255,255,255,0.05)",
                  color: cat === c ? "#fff" : "rgba(255,255,255,0.6)",
                  border: cat === c ? "none" : "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer",
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]">
            {filtered.map((p, i) => (
              <div
                key={p.id}
                className={`gal-item ${i === 0 || i === 5 ? "md:col-span-2" : ""}`}
                onClick={() => setLightbox(p.id)}
              >
                <img src={p.src} alt={p.label} />
                <div className="gal-overlay">
                  <div>
                    <div className="text-white font-bold text-sm">{p.label}</div>
                    <div className="text-white text-xs mt-0.5" style={{ opacity: 0.6 }}>{p.cat}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lbPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-white"
            style={{ background: "rgba(255,255,255,0.1)" }}
            onClick={() => setLightbox(null)}
          >
            <Icon name="X" size={20} />
          </button>
          <img
            src={lbPhoto.src}
            alt={lbPhoto.label}
            className="max-w-full max-h-[85vh] rounded-2xl object-contain"
            onClick={e => e.stopPropagation()}
          />
          <div className="absolute bottom-8 text-white text-center">
            <div className="font-bold">{lbPhoto.label}</div>
            <div className="text-xs mt-1" style={{ opacity: 0.5 }}>{lbPhoto.cat}</div>
          </div>
        </div>
      )}
    </Layout>
  );
}
