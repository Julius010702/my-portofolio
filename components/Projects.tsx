"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Project = {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  longDesc: string;
  tags: string[];
  color: string;
  github: string;
  demo: string;
  features: string[];
  year: string;
};

const projects: Project[] = [
  {
    id: "01",
    title: "My Portofolio",
    subtitle: "Decision Support System",
    desc: "Sistem pendukung keputusan berbasis metode Simple Additive Weighting untuk evaluasi dan pemilihan alternatif terbaik secara objektif.",
    longDesc: "Sistem ini membantu pengambil keputusan dalam memilih alternatif terbaik menggunakan metode SAW (Simple Additive Weighting). Data kriteria dan bobot dapat dikonfigurasi secara dinamis, hasil perangkingan divisualisasikan dalam tabel dan grafik interaktif.",
    tags: ["Next.js", "JavaScript", "TypeScript"],
    color: "#00f5c4",
    github: "https://github.com/Julius010702/my-portofolio",
    demo: "https://my-portofolio-five-mauve.vercel.app/#about",
    features: ["Input kriteria & bobot dinamis", "Perhitungan SAW otomatis", "Tabel perangkingan alternatif", "Export hasil ke PDF"],
    year: "2024",
  },
  {
    id: "02",
    title: "Sistem Pemesanan Makanan",
    subtitle: "Food Ordering Platform",
    desc: "Aplikasi pemesanan makanan online dengan antarmuka yang intuitif, manajemen menu real-time, dan sistem notifikasi pesanan.",
    longDesc: "Platform full-stack untuk pemesanan makanan secara online. Dilengkapi dengan dashboard admin untuk manajemen menu, sistem notifikasi real-time saat pesanan masuk, dan tampilan cart yang responsif untuk pengguna.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    color: "#7b61ff",
    github: "https://github.com/Julius010702/pekasaran.git",
    demo: "https://sistempemesanan.free.nf/?i=1",
    features: ["Manajemen menu real-time", "Sistem notifikasi pesanan", "Dashboard admin", "Cart & checkout flow"],
    year: "2024",
  },
  {
    id: "03",
    title: "Sistem Penentu Prestasi",
    subtitle: "Student Achievement DSS",
    desc: "Sistem pendukung keputusan untuk menentukan siswa berprestasi berdasarkan kriteria penilaian yang terukur dan terstruktur.",
    longDesc: "Sistem Penentu Prestasi adalah aplikasi berbasis web yang digunakan untuk membantu sekolah dalam menentukan siswa berprestasi secara objektif menggunakan metode SAW berdasarkan nilai akademik, kehadiran, sikap, dan prestasi non-akademik.",
    tags: ["PHP", "MySQL", "JavaScript"],
    color: "#ff61d8",
    github: "https://github.com/Julius010702/Sistem-Penentu-Prestasi",
    demo: "https://webpenentuprestasi.free.nf/",
    features: ["Manajemen data siswa", "Pengelolaan kriteria & bobot", "Perhitungan otomatis SAW", "Perankingan siswa", "Laporan hasil seleksi"],
    year: "2023",
  },
];

// ── Each card manages its own RAF tilt loop ──
function ProjectCard({
  p,
  isActive,
  onToggle,
  isVisible,
  index,
}: {
  p: Project;
  isActive: boolean;
  onToggle: () => void;
  isVisible: boolean;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number>(0);
  const cur     = useRef({ rx: 0, ry: 0 });
  const tgt     = useRef({ rx: 0, ry: 0 });
  const hover   = useRef(false);

  useEffect(() => {
    const tick = () => {
      cur.current.rx += (tgt.current.rx - cur.current.rx) * 0.08;
      cur.current.ry += (tgt.current.ry - cur.current.ry) * 0.08;

      if (cardRef.current) {
        const tz    = isActive ? 40 : hover.current ? 18 : 0;
        const scale = isActive ? 1.04 : hover.current ? 1.02 : 1;
        cardRef.current.style.transform =
          `perspective(900px) rotateX(${cur.current.rx}deg) rotateY(${cur.current.ry}deg) translateZ(${tz}px) scale(${scale})`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isActive]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const dx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
    const dy = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    tgt.current = { rx: -dy * 14, ry: dx * 14 };
  }, []);

  const onMouseEnter = useCallback(() => { hover.current = true; }, []);
  const onMouseLeave = useCallback(() => {
    hover.current = false;
    tgt.current   = { rx: 0, ry: 0 };
  }, []);

  return (
    <div
      ref={cardRef}
      data-id={p.id}
      className={`pc-card${isActive ? " active" : ""}${isVisible ? " visible" : ""}`}
      style={{
        "--c": p.color,
        "--delay": `${index * 0.15}s`,
      } as React.CSSProperties}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* surface effects */}
      <div className="pc-sheen" />
      <div className="pc-bevel-top" />
      <div className="pc-bevel-left" />
      <div className="pc-corner-glow" />
      <div className="pc-floor-shadow" />

      {/* icon */}
      <div className="pc-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          {p.id === "01" ? (
            <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/><path d="m14 17 3 3 4-4"/></>
          ) : p.id === "02" ? (
            <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></>
          ) : (
            <><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></>
          )}
        </svg>
      </div>

      {/* text content */}
      <span className="pc-id">PROJECT {p.id}</span>
      <p  className="pc-subtitle">{p.subtitle}</p>
      <h3 className="pc-title">{p.title}</h3>
      <p  className="pc-desc">{p.desc}</p>
      <div className="pc-tags">
        {p.tags.map(t => <span key={t} className="pc-tag">{t}</span>)}
      </div>

      {/* bottom bar */}
      <div className="pc-bar">
        <span className="pc-year">{p.year}</span>
        <div className="pc-actions" onClick={e => e.stopPropagation()}>
          <a href={p.github} target="_blank" rel="noopener noreferrer" className="pc-btn" title="GitHub">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </a>
          {p.demo !== "#" && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer" className="pc-btn" title="Live Demo">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          )}
        </div>
        <button className="pc-expand" onClick={onToggle}>
          <svg style={{ transition:"transform 0.35s", transform: isActive ? "rotate(180deg)":"rotate(0deg)" }}
            width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m6 9 6 6 6-6"/>
          </svg>
          {isActive ? "Tutup" : "Detail"}
        </button>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const [activeId,      setActiveId]      = useState<string | null>(null);
  const [modalProject,  setModalProject]  = useState<Project | null>(null);
  // ── NEW: track which cards are visible ──
  const [visibleCards, setVisibleCards]   = useState<Set<string>>(new Set());

  // ── NEW: Intersection Observer for scroll-triggered card animation ──
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.id;
            if (id) {
              setVisibleCards((prev) => new Set([...prev, id]));
              observer.unobserve(entry.target); // animate only once
            }
          }
        });
      },
      { threshold: 0.12 }
    );

    const cards = grid.querySelectorAll<HTMLElement>(".pc-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // ── Scroll parallax ──
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const bgText = section.querySelector<HTMLElement>(".ps-bg-text");
    const grid   = section.querySelector<HTMLElement>(".ps-grid");
    const orbs   = section.querySelectorAll<HTMLElement>(".ps-orb");

    const onScroll = () => {
      const top  = section.getBoundingClientRect().top;
      const sy   = -top;

      if (bgText) {
        bgText.style.transform = `translateX(-50%) translateY(${sy * 0.22}px)`;
        bgText.style.opacity   = String(Math.max(0, 1 - (sy / section.offsetHeight) * 2.5));
      }
      if (grid) {
        grid.style.backgroundPositionY = `${sy * 0.18}px`;
      }
      orbs.forEach((orb, i) => {
        const sign = i % 2 === 0 ? 1 : -1;
        orb.style.transform = `translateY(${sy * 0.06 * sign}px)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setModalProject(null); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalProject]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;600;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

        .ps-section{
          position:relative; padding:7rem 2rem 9rem;
          background:#020408; overflow:hidden;
          font-family:'Outfit',sans-serif;
        }

        .ps-grid{
          position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(255,255,255,0.028) 1px,transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,0.028) 1px,transparent 1px);
          background-size:55px 55px;
          transform:perspective(600px) rotateX(60deg) translateY(40%) scaleX(1.6);
          transform-origin:center bottom;
          animation:grid-scroll 14s linear infinite;
          mask-image:linear-gradient(to top,black 0%,transparent 55%);
          pointer-events:none; will-change:background-position-y;
        }
        @keyframes grid-scroll{from{background-position-y:0}to{background-position-y:55px}}

        .ps-orb{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;will-change:transform}
        .ps-orb-1{width:550px;height:550px;top:-100px;left:-150px;background:radial-gradient(circle,rgba(0,245,196,.1),transparent 70%);animation:fl-a 9s ease-in-out infinite}
        .ps-orb-2{width:600px;height:600px;bottom:-150px;right:-150px;background:radial-gradient(circle,rgba(123,97,255,.1),transparent 70%);animation:fl-b 11s ease-in-out infinite}
        .ps-orb-3{width:380px;height:380px;top:45%;left:45%;background:radial-gradient(circle,rgba(255,97,216,.07),transparent 70%);animation:fl-a 7s 2s ease-in-out infinite}
        @keyframes fl-a{0%,100%{transform:translateY(0)}50%{transform:translateY(-24px)}}
        @keyframes fl-b{0%,100%{transform:translateY(0)}50%{transform:translateY(24px)}}

        .ps-bg-text{
          position:absolute;top:6%;left:50%;
          transform:translateX(-50%);
          font-family:'Bebas Neue',sans-serif;
          font-size:clamp(90px,22vw,280px);
          letter-spacing:.12em;color:transparent;
          -webkit-text-stroke:1px rgba(255,255,255,0.038);
          pointer-events:none;user-select:none;white-space:nowrap;
          will-change:transform,opacity;
        }

        .ps-wrap{max-width:1120px;margin:0 auto;position:relative;z-index:2}

        .ps-label{display:inline-flex;align-items:center;gap:.7rem;font-family:'DM Mono',monospace;font-size:.63rem;letter-spacing:.3em;text-transform:uppercase;color:rgba(0,245,196,.75);margin-bottom:1.25rem}
        .ps-label-line{display:block;width:28px;height:1px;background:linear-gradient(90deg,#00f5c4,transparent)}
        .ps-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(3.5rem,11vw,7.5rem);line-height:.88;letter-spacing:.04em;color:white;margin-bottom:.2rem}
        .ps-title-accent{display:block;background:linear-gradient(110deg,#ff61d8 0%,#7b61ff 45%,#00f5c4 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;filter:drop-shadow(0 0 40px rgba(123,97,255,.5))}
        .ps-sub{font-size:.88rem;color:rgba(255,255,255,.28);max-width:400px;line-height:1.65;margin-top:.9rem;margin-bottom:4rem}

        .pc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-bottom:1.5rem}

        /* ── FIXED: card starts hidden, animates in when .visible is added ── */
        .pc-card{
          position:relative; border-radius:1.2rem;
          padding:1.75rem 1.5rem 1.5rem;
          cursor:default; will-change:transform,opacity;
          background:linear-gradient(145deg,rgba(255,255,255,.07) 0%,rgba(255,255,255,.02) 60%,rgba(255,255,255,.04) 100%);
          border:1px solid rgba(255,255,255,.09);
          backdrop-filter:blur(12px);
          transition:
            border-color .4s, box-shadow .4s, background .4s,
            opacity 0.7s cubic-bezier(.16,1,.3,1),
            translate 0.7s cubic-bezier(.16,1,.3,1);
          transition-delay: var(--delay, 0s);

          /* hidden state before scroll */
          opacity: 0;
          translate: 0 60px;
        }

        /* visible state — triggered by Intersection Observer */
        .pc-card.visible{
          opacity: 1;
          translate: 0 0;
        }

        .pc-card:hover{
          border-color:color-mix(in srgb,var(--c) 35%,transparent);
          box-shadow:0 30px 80px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.12);
        }
        .pc-card.active{
          border-color:color-mix(in srgb,var(--c) 55%,transparent);
          background:linear-gradient(145deg,rgba(255,255,255,.1) 0%,rgba(255,255,255,.04) 100%);
          box-shadow:0 40px 100px rgba(0,0,0,.6),0 0 60px color-mix(in srgb,var(--c) 20%,transparent),0 0 0 1px color-mix(in srgb,var(--c) 40%,transparent),inset 0 1px 0 rgba(255,255,255,.15);
        }

        .pc-sheen{position:absolute;inset:0;border-radius:inherit;background:linear-gradient(135deg,rgba(255,255,255,.1) 0%,rgba(255,255,255,0) 35%,rgba(255,255,255,0) 65%,rgba(255,255,255,.04) 100%);pointer-events:none}
        .pc-bevel-top{position:absolute;top:0;left:8%;right:8%;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35) 50%,transparent);border-radius:50%}
        .pc-bevel-left{position:absolute;top:8%;left:0;bottom:8%;width:1px;background:linear-gradient(180deg,transparent,rgba(255,255,255,.18) 50%,transparent)}
        .pc-corner-glow{position:absolute;top:-50px;right:-50px;width:180px;height:180px;background:radial-gradient(circle,color-mix(in srgb,var(--c) 18%,transparent),transparent 70%);pointer-events:none;opacity:.5;transition:opacity .4s}
        .pc-card:hover .pc-corner-glow,.pc-card.active .pc-corner-glow{opacity:1}
        .pc-floor-shadow{position:absolute;bottom:-28px;left:12%;right:12%;height:28px;background:var(--c);filter:blur(30px);opacity:.1;border-radius:50%;pointer-events:none;transition:opacity .4s,transform .4s}
        .pc-card:hover .pc-floor-shadow{opacity:.35;transform:scaleX(1.1)}
        .pc-card.active .pc-floor-shadow{opacity:.48;transform:scaleX(1.18)}

        .pc-icon{position:absolute;top:1.4rem;right:1.4rem;width:42px;height:42px;border-radius:.6rem;background:color-mix(in srgb,var(--c) 12%,rgba(255,255,255,.04));border:1px solid color-mix(in srgb,var(--c) 28%,transparent);display:flex;align-items:center;justify-content:center;color:var(--c);transition:transform .35s cubic-bezier(.34,1.56,.64,1),background .3s}
        .pc-card:hover .pc-icon{transform:rotate(-8deg) scale(1.12);background:color-mix(in srgb,var(--c) 20%,rgba(255,255,255,.05))}
        .pc-card.active .pc-icon{transform:rotate(-12deg) scale(1.18)}

        .pc-id{display:block;font-family:'DM Mono',monospace;font-size:.58rem;letter-spacing:.22em;color:var(--c);opacity:.55;margin-bottom:.8rem}
        .pc-subtitle{font-family:'DM Mono',monospace;font-size:.54rem;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.25);margin-bottom:.35rem}
        .pc-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(1.3rem,2.2vw,1.75rem);letter-spacing:.04em;color:white;line-height:1.1;margin-bottom:.6rem;transition:color .3s}
        .pc-card:hover .pc-title,.pc-card.active .pc-title{color:var(--c)}
        .pc-desc{font-size:.75rem;color:rgba(255,255,255,.35);line-height:1.65;margin-bottom:1rem}
        .pc-tags{display:flex;gap:.3rem;flex-wrap:wrap;margin-bottom:1.25rem}
        .pc-tag{padding:.18rem .45rem;border-radius:.2rem;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);font-family:'DM Mono',monospace;font-size:.54rem;color:rgba(255,255,255,.32);letter-spacing:.04em;transition:border-color .3s,color .3s}
        .pc-card:hover .pc-tag{border-color:color-mix(in srgb,var(--c) 25%,transparent);color:rgba(255,255,255,.5)}

        .pc-bar{display:flex;align-items:center;gap:.5rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,.06);transition:border-color .3s}
        .pc-card:hover .pc-bar{border-color:color-mix(in srgb,var(--c) 20%,transparent)}
        .pc-year{font-family:'DM Mono',monospace;font-size:.56rem;color:rgba(255,255,255,.2);letter-spacing:.1em;flex:1}
        .pc-actions{display:flex;gap:.35rem}
        .pc-btn{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:.4rem;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);color:rgba(255,255,255,.3);text-decoration:none;cursor:pointer;transition:all .25s}
        .pc-btn:hover{background:color-mix(in srgb,var(--c) 18%,transparent);border-color:var(--c);color:var(--c);transform:translateY(-3px);box-shadow:0 8px 20px color-mix(in srgb,var(--c) 35%,transparent)}
        .pc-expand{display:inline-flex;align-items:center;gap:.35rem;padding:.32rem .65rem;border-radius:.35rem;background:color-mix(in srgb,var(--c) 10%,transparent);border:1px solid color-mix(in srgb,var(--c) 28%,transparent);color:var(--c);font-family:'DM Mono',monospace;font-size:.56rem;letter-spacing:.06em;cursor:pointer;transition:all .25s}
        .pc-expand:hover{background:color-mix(in srgb,var(--c) 22%,transparent);transform:translateY(-2px);box-shadow:0 6px 16px color-mix(in srgb,var(--c) 28%,transparent)}

        .ps-panel-outer{overflow:hidden;max-height:0;opacity:0;transition:max-height .55s cubic-bezier(.16,1,.3,1),opacity .4s ease,margin .4s ease;margin-bottom:0}
        .ps-panel-outer.open{max-height:480px;opacity:1;margin-bottom:1.5rem}
        .ps-panel{position:relative;padding:2rem 2.25rem;border-radius:1rem;background:linear-gradient(140deg,rgba(255,255,255,.05),rgba(255,255,255,.01));border:1px solid rgba(255,255,255,.07);overflow:hidden}
        .ps-panel::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--panel-c) 50%,transparent)}
        .ps-panel-glow{position:absolute;top:-60px;left:-60px;width:250px;height:250px;background:radial-gradient(circle,color-mix(in srgb,var(--panel-c) 12%,transparent),transparent 70%);pointer-events:none}
        .ps-panel-inner{display:grid;grid-template-columns:1.2fr 1fr auto;gap:2.5rem;align-items:start;position:relative;z-index:1}
        .ps-panel-label{font-family:'DM Mono',monospace;font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.28);margin-bottom:.6rem}
        .ps-panel-desc{font-size:.82rem;color:rgba(255,255,255,.42);line-height:1.75}
        .ps-features{display:flex;flex-direction:column;gap:.4rem}
        .ps-feat{display:flex;align-items:center;gap:.55rem;font-family:'DM Mono',monospace;font-size:.61rem;color:rgba(255,255,255,.38);padding:.38rem .6rem;border-radius:.3rem;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.04);transition:all .2s}
        .ps-feat:hover{background:color-mix(in srgb,var(--panel-c) 10%,transparent);border-color:color-mix(in srgb,var(--panel-c) 22%,transparent);color:rgba(255,255,255,.6)}
        .ps-feat-dot{width:5px;height:5px;border-radius:50%;background:var(--panel-c);box-shadow:0 0 5px var(--panel-c);flex-shrink:0}
        .ps-panel-btns{display:flex;flex-direction:column;gap:.5rem;flex-shrink:0}
        .ps-pbtn{display:inline-flex;align-items:center;gap:.5rem;padding:.58rem 1.1rem;border-radius:.45rem;font-family:'DM Mono',monospace;font-size:.61rem;letter-spacing:.06em;cursor:pointer;text-decoration:none;transition:all .22s;white-space:nowrap}
        .ps-pbtn-primary{background:var(--panel-c);color:#050810;border:none;font-weight:700;box-shadow:0 4px 18px color-mix(in srgb,var(--panel-c) 40%,transparent)}
        .ps-pbtn-primary:hover{transform:translateY(-3px);filter:brightness(1.1);box-shadow:0 10px 28px color-mix(in srgb,var(--panel-c) 50%,transparent)}
        .ps-pbtn-secondary{background:transparent;color:rgba(255,255,255,.45);border:1px solid rgba(255,255,255,.1)}
        .ps-pbtn-secondary:hover{border-color:rgba(255,255,255,.28);color:white}
        .ps-pbtn.disabled{opacity:.3;pointer-events:none}
        .ps-detail-link{display:inline-flex;align-items:center;gap:.4rem;margin-top:.5rem;background:none;border:none;padding:0;font-family:'DM Mono',monospace;font-size:.58rem;color:var(--panel-c);cursor:pointer;letter-spacing:.07em;opacity:.6;transition:opacity .2s}
        .ps-detail-link:hover{opacity:1}

        .ps-modal-overlay{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.9);backdrop-filter:blur(14px);display:flex;align-items:center;justify-content:center;padding:1rem;animation:ov-in .2s ease}
        @keyframes ov-in{from{opacity:0}to{opacity:1}}
        .ps-modal{position:relative;width:min(700px,100%);background:#020408;border:1px solid rgba(255,255,255,.08);border-radius:1.4rem;overflow:hidden;max-height:90vh;overflow-y:auto;animation:modal-in .4s cubic-bezier(.16,1,.3,1)}
        @keyframes modal-in{from{opacity:0;transform:perspective(1000px) rotateX(18deg) translateY(50px) scale(.94)}to{opacity:1;transform:perspective(1000px) rotateX(0deg) translateY(0) scale(1)}}
        .ps-modal::-webkit-scrollbar{width:3px}
        .ps-modal::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:99px}
        .ps-modal-hdr{position:relative;padding:2.5rem 2rem 2rem;border-bottom:1px solid rgba(255,255,255,.06);overflow:hidden}
        .ps-modal-hdr::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--mc),color-mix(in srgb,var(--mc) 20%,transparent),transparent)}
        .ps-modal-hdr-glow{position:absolute;top:-80px;right:-80px;width:300px;height:300px;background:radial-gradient(circle,color-mix(in srgb,var(--mc) 15%,transparent),transparent 70%);pointer-events:none}
        .ps-modal-close{position:absolute;top:1.25rem;right:1.25rem;width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,255,255,.1);background:transparent;color:rgba(255,255,255,.4);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
        .ps-modal-close:hover{border-color:rgba(255,255,255,.3);color:white;transform:rotate(90deg)}
        .ps-modal-id{font-family:'DM Mono',monospace;font-size:.6rem;letter-spacing:.25em;color:var(--mc);opacity:.6;margin-bottom:.3rem}
        .ps-modal-sub{font-family:'DM Mono',monospace;font-size:.57rem;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.25);margin-bottom:.5rem}
        .ps-modal-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(2rem,5vw,3rem);letter-spacing:.04em;color:white;margin-bottom:.75rem}
        .ps-modal-tags{display:flex;gap:.35rem;flex-wrap:wrap}
        .ps-modal-tag{padding:.2rem .5rem;border-radius:.25rem;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);font-family:'DM Mono',monospace;font-size:.58rem;color:rgba(255,255,255,.38)}
        .ps-modal-body{padding:2rem}
        .ps-modal-sec{font-family:'DM Mono',monospace;font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.28);margin-bottom:.6rem}
        .ps-modal-desc{font-size:.88rem;color:rgba(255,255,255,.42);line-height:1.8;margin-bottom:2rem}
        .ps-modal-feats{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:2rem}
        .ps-modal-feat{display:flex;align-items:flex-start;gap:.6rem;padding:.7rem .8rem;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);border-radius:.5rem;font-size:.75rem;color:rgba(255,255,255,.42);line-height:1.4;transition:all .2s}
        .ps-modal-feat:hover{background:color-mix(in srgb,var(--mc) 8%,transparent);border-color:color-mix(in srgb,var(--mc) 20%,transparent);color:rgba(255,255,255,.65)}
        .ps-modal-feat-dot{width:6px;height:6px;border-radius:50%;margin-top:4px;background:var(--mc);box-shadow:0 0 6px var(--mc);flex-shrink:0}
        .ps-modal-ftr{padding:1.5rem 2rem 2rem;border-top:1px solid rgba(255,255,255,.05);display:flex;gap:.75rem;flex-wrap:wrap}
        .ps-modal-btn{display:inline-flex;align-items:center;gap:.5rem;padding:.7rem 1.4rem;border-radius:.5rem;font-family:'DM Mono',monospace;font-size:.65rem;letter-spacing:.08em;cursor:pointer;text-decoration:none;transition:all .22s}
        .ps-modal-btn-p{background:var(--mc);color:#050810;border:none;font-weight:700;box-shadow:0 4px 20px color-mix(in srgb,var(--mc) 40%,transparent)}
        .ps-modal-btn-p:hover{transform:translateY(-2px);filter:brightness(1.1)}
        .ps-modal-btn-s{background:transparent;color:rgba(255,255,255,.45);border:1px solid rgba(255,255,255,.1)}
        .ps-modal-btn-s:hover{border-color:rgba(255,255,255,.28);color:white}
        .ps-modal-btn.disabled{opacity:.3;pointer-events:none}

        @media(max-width:900px){
          .pc-grid{grid-template-columns:1fr 1fr}
          .ps-panel-inner{grid-template-columns:1fr}
          .ps-panel-btns{flex-direction:row;flex-wrap:wrap}
          .ps-modal-feats{grid-template-columns:1fr}
        }
        @media(max-width:640px){
          .ps-section{padding:5rem 1.25rem 7rem}
          .pc-grid{grid-template-columns:1fr}
          .ps-title{font-size:clamp(3rem,16vw,5.5rem)}
          .ps-modal-body{padding:1.25rem}
          .ps-modal-hdr{padding:2rem 1.25rem 1.5rem}
          .ps-modal-ftr{padding:1rem 1.25rem 1.5rem;flex-direction:column}
          .ps-modal-btn{justify-content:center}
          .ps-panel-outer.open{max-height:900px}
        }
      `}</style>

      {/* MODAL */}
      {modalProject && (
        <div
          className="ps-modal-overlay"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target === e.currentTarget) setModalProject(null);
          }}
          style={{ "--mc": modalProject.color } as React.CSSProperties}
        >
          <div className="ps-modal">
            <div className="ps-modal-hdr">
              <div className="ps-modal-hdr-glow" />
              <button className="ps-modal-close" onClick={() => setModalProject(null)}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
              <div className="ps-modal-id">PROJECT {modalProject.id} · {modalProject.year}</div>
              <div className="ps-modal-sub">{modalProject.subtitle}</div>
              <h2 className="ps-modal-title">{modalProject.title}</h2>
              <div className="ps-modal-tags">
                {modalProject.tags.map(t => <span key={t} className="ps-modal-tag">{t}</span>)}
              </div>
            </div>
            <div className="ps-modal-body">
              <p className="ps-modal-sec">About This Project</p>
              <p className="ps-modal-desc">{modalProject.longDesc}</p>
              <p className="ps-modal-sec">Key Features</p>
              <div className="ps-modal-feats">
                {modalProject.features.map(f => (
                  <div key={f} className="ps-modal-feat">
                    <span className="ps-modal-feat-dot" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="ps-modal-ftr">
              <a href={modalProject.demo === "#" ? undefined : modalProject.demo}
                target="_blank" rel="noopener noreferrer"
                className={`ps-modal-btn ps-modal-btn-p${modalProject.demo === "#" ? " disabled" : ""}`}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                {modalProject.demo === "#" ? "No Demo" : "Live Demo"}
              </a>
              <a href={modalProject.github} target="_blank" rel="noopener noreferrer"
                className="ps-modal-btn ps-modal-btn-s">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      )}

      {/* SECTION */}
      <section className="ps-section" ref={sectionRef} id="projects">
        <div className="ps-grid" />
        <div className="ps-orb ps-orb-1" />
        <div className="ps-orb ps-orb-2" />
        <div className="ps-orb ps-orb-3" />
        <div className="ps-bg-text">WORK</div>

        <div className="ps-wrap">
          <div className="ps-label">
            <span className="ps-label-line" />
            03 — Selected Work
          </div>
          <h2 className="ps-title">
            Projects I&apos;ve<br />
            <span className="ps-title-accent">Built.</span>
          </h2>
          <p className="ps-sub">
            Karya yang dibuat dengan penuh semangat — dari sistem DSS hingga platform full-stack.
          </p>

          {/* ── gridRef ditambahkan di sini ── */}
          <div className="pc-grid" ref={gridRef}>
            {projects.map((p, i) => (
              <ProjectCard
                key={p.id}
                p={p}
                index={i}
                isActive={activeId === p.id}
                onToggle={() => setActiveId(activeId === p.id ? null : p.id)}
                isVisible={visibleCards.has(p.id)}
              />
            ))}
          </div>

          {projects.map(p => (
            <div
              key={`panel-${p.id}`}
              className={`ps-panel-outer${activeId === p.id ? " open" : ""}`}
              style={{ "--panel-c": p.color } as React.CSSProperties}
            >
              <div className="ps-panel">
                <div className="ps-panel-glow" />
                <div className="ps-panel-inner">
                  <div>
                    <p className="ps-panel-label">About</p>
                    <p className="ps-panel-desc">{p.longDesc}</p>
                  </div>
                  <div>
                    <p className="ps-panel-label">Features</p>
                    <div className="ps-features">
                      {p.features.map(f => (
                        <div key={f} className="ps-feat" style={{ "--panel-c": p.color } as React.CSSProperties}>
                          <span className="ps-feat-dot" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="ps-panel-btns">
                    <a href={p.demo === "#" ? undefined : p.demo}
                      target="_blank" rel="noopener noreferrer"
                      className={`ps-pbtn ps-pbtn-primary${p.demo === "#" ? " disabled" : ""}`}
                      style={{ "--panel-c": p.color } as React.CSSProperties}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      {p.demo === "#" ? "No Demo" : "Live Demo"}
                    </a>
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="ps-pbtn ps-pbtn-secondary">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                      </svg>
                      GitHub
                    </a>
                    <button
                      className="ps-detail-link"
                      style={{ "--panel-c": p.color } as React.CSSProperties}
                      onClick={() => setModalProject(p)}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      Lihat detail lengkap
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}