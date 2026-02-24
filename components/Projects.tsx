"use client";

import { useEffect, useRef, useState } from "react";

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
    demo: "#",
    features: ["Manajemen menu real-time", "Sistem notifikasi pesanan", "Dashboard admin", "Cart & checkout flow"],
    year: "2024",
  },
 {
  id: "03",
  title: "Sistem Penentu Prestasi",
  subtitle: "Student Achievement Decision Support System",
  desc: "Sistem pendukung keputusan untuk menentukan siswa berprestasi berdasarkan kriteria penilaian yang terukur dan terstruktur.",
  longDesc: "Sistem Penentu Prestasi adalah aplikasi berbasis web yang digunakan untuk membantu sekolah dalam menentukan siswa berprestasi secara objektif. Sistem ini menggunakan metode perhitungan seperti SAW (Simple Additive Weighting) untuk menilai siswa berdasarkan berbagai kriteria seperti nilai akademik, kehadiran, sikap, dan prestasi non-akademik. Admin dapat mengelola data siswa, kriteria, dan bobot penilaian, kemudian sistem secara otomatis menghasilkan peringkat siswa berdasarkan hasil perhitungan.",
  tags: ["PHP", "MySQL", "JavaScript"],
  color: "#ff61d8",
  github: "https://github.com/Julius010702/Sistem-Penentu-Prestasi",
  demo: "https://webpenentuprestasi.free.nf/",
  features: [
    "Manajemen data siswa",
    "Pengelolaan kriteria & bobot penilaian",
    "Perhitungan otomatis metode SAW",
    "Perankingan siswa berprestasi",
    "Laporan hasil seleksi"
  ],
  year: "2023",
}
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [modalProject, setModalProject] = useState<Project | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.06 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close modal on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setModalProject(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modalProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalProject]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono&display=swap');

        .projects-section {
          position: relative; padding: 6rem 1.5rem;
          background: #020408; overflow: hidden; font-family: 'Syne', sans-serif;
        }
        .projects-divider {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,97,216,0.3), rgba(0,245,196,0.3), transparent);
        }
        .projects-bg-text {
          position: absolute; top: 10%; left: -10px;
          font-size: clamp(60px, 15vw, 180px); font-weight: 800;
          color: rgba(255,255,255,0.015); pointer-events: none; user-select: none;
        }
        .projects-wrap { max-width: 1100px; margin: 0 auto; position: relative; z-index: 2; }

        .section-label {
          display: inline-flex; align-items: center; gap: 0.6rem;
          font-family: 'Space Mono', monospace; font-size: 0.62rem;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(255,97,216,0.8); margin-bottom: 1.25rem;
        }
        .section-label::before { content: ''; display: block; width: 20px; height: 1px; background: #ff61d8; }

        .projects-title {
          font-size: clamp(2rem, 5vw, 3.8rem); font-weight: 800;
          line-height: 0.95; letter-spacing: -0.03em; color: white;
        }
        .projects-title-accent {
          display: block;
          background: linear-gradient(100deg, #ff61d8, #7b61ff);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* ── PROJECT LIST ── */
        .projects-list {
          display: flex; flex-direction: column;
          margin-top: 3rem;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 1rem; overflow: hidden;
        }

        /* ── CARD HEADER (always visible) ── */
        .project-card {
          border-bottom: 1px solid rgba(255,255,255,0.05);
          position: relative; overflow: hidden;
          background: rgba(255,255,255,0.02);
          transition: background 0.3s;
        }
        .project-card:last-child { border-bottom: none; }
        .project-card.expanded { background: rgba(255,255,255,0.035); }

        .project-card-header {
          display: grid;
          grid-template-columns: 52px 1fr auto;
          align-items: center;
          gap: 1.5rem;
          padding: 1.6rem 1.75rem;
          cursor: pointer;
          position: relative;
        }

        /* Left accent line */
        .project-card::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
          background: var(--card-color); opacity: 0; transition: opacity 0.3s;
        }
        .project-card:hover::before,
        .project-card.expanded::before { opacity: 1; }

        /* Hover glow */
        .card-glow {
          position: absolute; left: 0; top: 0; bottom: 0; width: 200px;
          background: linear-gradient(90deg, color-mix(in srgb, var(--card-color) 6%, transparent), transparent);
          opacity: 0; transition: opacity 0.4s; pointer-events: none;
        }
        .project-card:hover .card-glow,
        .project-card.expanded .card-glow { opacity: 1; }

        .project-num {
          font-family: 'Space Mono', monospace; font-size: 0.68rem;
          color: var(--card-color); opacity: 0.55; letter-spacing: 0.1em;
          align-self: start; padding-top: 2px;
        }
        .project-main { min-width: 0; }
        .project-subtitle {
          font-family: 'Space Mono', monospace; font-size: 0.56rem;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.28); margin-bottom: 0.2rem;
        }
        .project-title {
          font-size: 1.1rem; font-weight: 800; color: white;
          letter-spacing: -0.02em; transition: color 0.3s; margin-bottom: 0.35rem;
        }
        .project-card:hover .project-title,
        .project-card.expanded .project-title { color: var(--card-color); }

        .project-tags { display: flex; gap: 0.3rem; flex-wrap: wrap; }
        .project-tag {
          padding: 0.15rem 0.4rem;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 0.2rem; font-family: 'Space Mono', monospace;
          font-size: 0.55rem; color: rgba(255,255,255,0.35); letter-spacing: 0.04em;
        }

        /* Right side: actions + chevron */
        .project-header-right {
          display: flex; align-items: center; gap: 0.6rem; flex-shrink: 0;
        }

        .project-icon-btn {
          display: flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.3);
          background: transparent; cursor: pointer;
          transition: all 0.2s; text-decoration: none; flex-shrink: 0;
        }
        .project-icon-btn:hover {
          border-color: var(--card-color); color: var(--card-color);
          box-shadow: 0 0 10px color-mix(in srgb, var(--card-color) 40%, transparent);
          transform: scale(1.1);
        }
        .project-icon-btn.disabled {
          opacity: 0.25; pointer-events: none;
        }

        .project-chevron {
          display: flex; align-items: center; justify-content: center;
          width: 28px; height: 28px; flex-shrink: 0;
          color: rgba(255,255,255,0.25);
          transition: transform 0.3s, color 0.2s;
        }
        .project-card.expanded .project-chevron {
          transform: rotate(180deg); color: var(--card-color);
        }

        /* ── ACCORDION BODY ── */
        .project-accordion {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .project-accordion.open { max-height: 500px; }

        .project-accordion-inner {
          padding: 0 1.75rem 1.75rem 4.5rem;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1.5rem;
          align-items: start;
        }

        .project-long-desc {
          font-size: 0.82rem; color: rgba(255,255,255,0.45); line-height: 1.7;
          margin-bottom: 1rem;
        }

        .project-features { display: flex; flex-direction: column; gap: 0.4rem; }
        .project-feature {
          display: flex; align-items: center; gap: 0.5rem;
          font-family: 'Space Mono', monospace; font-size: 0.62rem;
          color: rgba(255,255,255,0.4);
        }
        .project-feature::before {
          content: ''; width: 4px; height: 4px; border-radius: 50%;
          background: var(--card-color); flex-shrink: 0;
          box-shadow: 0 0 4px var(--card-color);
        }

        .project-accordion-actions {
          display: flex; flex-direction: column; gap: 0.5rem; flex-shrink: 0;
        }

        .accordion-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.5rem 1rem; border-radius: 0.4rem;
          font-family: 'Space Mono', monospace; font-size: 0.62rem;
          letter-spacing: 0.08em; cursor: pointer; text-decoration: none;
          transition: all 0.2s; white-space: nowrap;
        }
        .accordion-btn-primary {
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--card-color);
          color: var(--card-color);
        }
        .accordion-btn-primary:hover {
          background: color-mix(in srgb, var(--card-color) 10%, transparent);
          box-shadow: 0 0 12px color-mix(in srgb, var(--card-color) 30%, transparent);
        }
        .accordion-btn-secondary {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.4);
        }
        .accordion-btn-secondary:hover {
          border-color: rgba(255,255,255,0.25); color: white;
        }
        .accordion-btn.disabled {
          opacity: 0.3; pointer-events: none;
        }

        /* Year badge */
        .project-year {
          font-family: 'Space Mono', monospace; font-size: 0.58rem;
          color: rgba(255,255,255,0.2); margin-top: 0.75rem;
          letter-spacing: 0.1em;
        }

        /* Detail button at bottom of accordion */
        .accordion-detail-btn {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: none; border: none; padding: 0; margin-top: 0.5rem;
          font-family: 'Space Mono', monospace; font-size: 0.6rem;
          color: var(--card-color); cursor: pointer; letter-spacing: 0.08em;
          opacity: 0.7; transition: opacity 0.2s;
        }
        .accordion-detail-btn:hover { opacity: 1; }

        /* ─────────────────────────────
           MODAL
        ───────────────────────────── */
        .modal-overlay {
          position: fixed; inset: 0; z-index: 999;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 1rem;
          animation: overlay-in 0.25s ease;
        }
        @keyframes overlay-in { from { opacity: 0; } to { opacity: 1; } }

        .modal-box {
          position: relative;
          width: min(680px, 100%);
          background: #0c0f18;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1.25rem;
          overflow: hidden;
          animation: modal-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          max-height: 90vh;
          overflow-y: auto;
        }
        @keyframes modal-in {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Scrollbar inside modal */
        .modal-box::-webkit-scrollbar { width: 3px; }
        .modal-box::-webkit-scrollbar-track { background: transparent; }
        .modal-box::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }

        .modal-header {
          position: relative; padding: 2rem 2rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .modal-header::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--modal-color), transparent);
        }

        .modal-close {
          position: absolute; top: 1rem; right: 1rem;
          display: flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1); background: transparent;
          color: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.2s;
        }
        .modal-close:hover { border-color: rgba(255,255,255,0.3); color: white; transform: rotate(90deg); }

        .modal-id {
          font-family: 'Space Mono', monospace; font-size: 0.6rem;
          color: var(--modal-color); opacity: 0.6; letter-spacing: 0.2em;
          margin-bottom: 0.4rem;
        }
        .modal-subtitle {
          font-family: 'Space Mono', monospace; font-size: 0.6rem;
          color: rgba(255,255,255,0.3); letter-spacing: 0.15em;
          text-transform: uppercase; margin-bottom: 0.5rem;
        }
        .modal-title {
          font-size: clamp(1.5rem, 4vw, 2.2rem); font-weight: 800;
          color: white; letter-spacing: -0.02em; margin-bottom: 0.75rem;
        }
        .modal-tags { display: flex; gap: 0.35rem; flex-wrap: wrap; margin-bottom: 0.5rem; }
        .modal-tag {
          padding: 0.2rem 0.5rem;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.25rem; font-family: 'Space Mono', monospace;
          font-size: 0.6rem; color: rgba(255,255,255,0.4);
        }

        .modal-body { padding: 1.5rem 2rem; }

        .modal-section-title {
          font-family: 'Space Mono', monospace; font-size: 0.6rem;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.3); margin-bottom: 0.75rem;
        }
        .modal-desc {
          font-size: 0.88rem; color: rgba(255,255,255,0.5); line-height: 1.75;
          margin-bottom: 1.75rem;
        }

        .modal-features {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0.5rem; margin-bottom: 1.75rem;
        }
        .modal-feature {
          display: flex; align-items: flex-start; gap: 0.6rem;
          padding: 0.65rem 0.75rem;
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
          border-radius: 0.5rem;
          font-size: 0.75rem; color: rgba(255,255,255,0.5); line-height: 1.4;
        }
        .modal-feature-dot {
          width: 5px; height: 5px; border-radius: 50%; margin-top: 5px;
          background: var(--modal-color); box-shadow: 0 0 4px var(--modal-color);
          flex-shrink: 0;
        }

        .modal-footer {
          padding: 1.25rem 2rem 1.75rem;
          display: flex; gap: 0.75rem; flex-wrap: wrap;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .modal-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.65rem 1.25rem; border-radius: 0.45rem;
          font-family: 'Space Mono', monospace; font-size: 0.65rem;
          letter-spacing: 0.08em; cursor: pointer; text-decoration: none;
          transition: all 0.2s; font-weight: 700;
        }
        .modal-btn-primary {
          background: var(--modal-color); color: #020408; border: none;
          box-shadow: 0 0 16px color-mix(in srgb, var(--modal-color) 40%, transparent);
        }
        .modal-btn-primary:hover { transform: translateY(-2px); filter: brightness(1.1); }
        .modal-btn-secondary {
          background: transparent; color: white;
          border: 1px solid rgba(255,255,255,0.12);
        }
        .modal-btn-secondary:hover { border-color: rgba(255,255,255,0.3); }
        .modal-btn.disabled { opacity: 0.3; pointer-events: none; }

        /* Reveal */
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.delay-1 { transition-delay: 0.1s; }
        .reveal.delay-2 { transition-delay: 0.2s; }
        .reveal.delay-3 { transition-delay: 0.3s; }
        .reveal.delay-4 { transition-delay: 0.4s; }
        .in-view.reveal { opacity: 1; transform: translateY(0); }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .projects-section { padding: 4rem 1.25rem; }
          .projects-title { font-size: clamp(2rem, 10vw, 2.8rem); }
          .projects-list { margin-top: 2rem; border-radius: 0.75rem; }

          .project-card-header {
            grid-template-columns: 36px 1fr auto;
            padding: 1.2rem 1.1rem; gap: 0.9rem;
          }
          .project-title { font-size: 0.95rem; }
          .project-num { font-size: 0.6rem; }

          .project-accordion-inner {
            grid-template-columns: 1fr;
            padding: 0 1.1rem 1.25rem 2.8rem;
          }
          .project-accordion-actions { flex-direction: row; flex-wrap: wrap; }

          .modal-features { grid-template-columns: 1fr; }
          .modal-footer { flex-direction: column; }
          .modal-btn { justify-content: center; }
          .modal-body { padding: 1.25rem 1.25rem; }
          .modal-header { padding: 1.5rem 1.25rem 1.25rem; }
          .modal-footer { padding: 1rem 1.25rem 1.5rem; }
        }

        @media (max-width: 380px) {
          .project-card-header { padding: 1rem; gap: 0.75rem; }
          .project-icon-btn { width: 28px; height: 28px; }
        }
      `}</style>

      {/* ── MODAL ── */}
      {modalProject && (
        <div
          className="modal-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setModalProject(null); }}
          style={{ "--modal-color": modalProject.color } as React.CSSProperties}
        >
          <div className="modal-box">
            <div className="modal-header">
              <button className="modal-close" onClick={() => setModalProject(null)}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
              <div className="modal-id">PROJECT {modalProject.id} · {modalProject.year}</div>
              <div className="modal-subtitle">{modalProject.subtitle}</div>
              <h2 className="modal-title">{modalProject.title}</h2>
              <div className="modal-tags">
                {modalProject.tags.map((t) => <span key={t} className="modal-tag">{t}</span>)}
              </div>
            </div>

            <div className="modal-body">
              <p className="modal-section-title">About this project</p>
              <p className="modal-desc">{modalProject.longDesc}</p>

              <p className="modal-section-title">Key Features</p>
              <div className="modal-features">
                {modalProject.features.map((f) => (
                  <div key={f} className="modal-feature">
                    <span className="modal-feature-dot" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <a
                href={modalProject.demo === "#" ? undefined : modalProject.demo}
                target="_blank" rel="noopener noreferrer"
                className={`modal-btn modal-btn-primary${modalProject.demo === "#" ? " disabled" : ""}`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                {modalProject.demo === "#" ? "Demo Unavailable" : "Live Demo"}
              </a>
              <a
                href={modalProject.github}
                target="_blank" rel="noopener noreferrer"
                className="modal-btn modal-btn-secondary"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
                GitHub Repo
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── SECTION ── */}
      <section className="projects-section" ref={sectionRef} id="projects">
        <div className="projects-divider" />
        <div className="projects-bg-text">WORK</div>

        <div className="projects-wrap">
          <p className="section-label reveal">03 — Selected Work</p>
          <h2 className="projects-title reveal delay-1">
            Projects I&apos;ve<br />
            <span className="projects-title-accent">Built.</span>
          </h2>

          <div className="projects-list reveal delay-2">
            {projects.map((p, i) => {
              const isExpanded = expandedId === p.id;
              return (
                <div
                  key={p.id}
                  className={`project-card reveal delay-${i + 2}${isExpanded ? " expanded" : ""}`}
                  style={{ "--card-color": p.color } as React.CSSProperties}
                >
                  <div className="card-glow" />

                  {/* ── CARD HEADER ── */}
                  <div
                    className="project-card-header"
                    onClick={() => toggleExpand(p.id)}
                  >
                    <span className="project-num">{p.id}</span>

                    <div className="project-main">
                      <div className="project-subtitle">{p.subtitle}</div>
                      <div className="project-title">{p.title}</div>
                      <div className="project-tags">
                        {p.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
                      </div>
                    </div>

                    <div className="project-header-right">
                      {/* GitHub */}
                      <a
                        href={p.github}
                        target="_blank" rel="noopener noreferrer"
                        className="project-icon-btn"
                        title="GitHub"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                        </svg>
                      </a>

                      {/* Live Demo */}
                      <a
                        href={p.demo === "#" ? undefined : p.demo}
                        target="_blank" rel="noopener noreferrer"
                        className={`project-icon-btn${p.demo === "#" ? " disabled" : ""}`}
                        title={p.demo === "#" ? "Demo tidak tersedia" : "Live Demo"}
                        onClick={(e) => { e.stopPropagation(); if (p.demo === "#") e.preventDefault(); }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </a>

                      {/* Chevron toggle */}
                      <div className="project-chevron">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="m6 9 6 6 6-6"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* ── ACCORDION BODY ── */}
                  <div className={`project-accordion${isExpanded ? " open" : ""}`}>
                    <div className="project-accordion-inner">
                      <div>
                        <p className="project-long-desc">{p.longDesc}</p>
                        <div className="project-features">
                          {p.features.map((f) => (
                            <div key={f} className="project-feature">{f}</div>
                          ))}
                        </div>
                        <p className="project-year">YEAR: {p.year}</p>
                        <button
                          className="accordion-detail-btn"
                          onClick={() => setModalProject(p)}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                          </svg>
                          Lihat detail lengkap
                        </button>
                      </div>

                      <div className="project-accordion-actions">
                        <a
                          href={p.demo === "#" ? undefined : p.demo}
                          target="_blank" rel="noopener noreferrer"
                          className={`accordion-btn accordion-btn-primary${p.demo === "#" ? " disabled" : ""}`}
                          style={{ "--card-color": p.color } as React.CSSProperties}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                          {p.demo === "#" ? "No Demo" : "Live Demo"}
                        </a>
                        <a
                          href={p.github}
                          target="_blank" rel="noopener noreferrer"
                          className="accordion-btn accordion-btn-secondary"
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                          </svg>
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}