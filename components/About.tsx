"use client";

import { useEffect, useRef } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const traits = [
    { icon: "◈", label: "Clean Code", desc: "Readable & maintainable" },
    { icon: "◉", label: "Modern Stack", desc: "Next.js · TypeScript" },
    { icon: "◌", label: "UI Focused", desc: "Pixel-perfect interfaces" },
    { icon: "◍", label: "Problem Solver", desc: "Backend & architecture" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono&display=swap');

        .about-section {
          position: relative;
          padding: 6rem 1.5rem;
          background: #020408;
          overflow: hidden;
          font-family: 'Syne', sans-serif;
        }
        .about-divider {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,245,196,0.3), rgba(123,97,255,0.3), transparent);
        }
        .about-bg-text {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(60px, 15vw, 180px);
          font-weight: 800; color: rgba(255,255,255,0.015);
          pointer-events: none; user-select: none; white-space: nowrap;
        }
        .about-wrap { max-width: 1100px; margin: 0 auto; position: relative; z-index: 2; }

        .section-label {
          display: inline-flex; align-items: center; gap: 0.6rem;
          font-family: 'Space Mono', monospace; font-size: 0.62rem;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(0,245,196,0.7); margin-bottom: 1.25rem;
        }
        .section-label::before { content: ''; display: block; width: 20px; height: 1px; background: #00f5c4; }

        .about-title {
          font-size: clamp(2rem, 5vw, 3.8rem);
          font-weight: 800; line-height: 0.95;
          letter-spacing: -0.03em; color: white; margin-bottom: 0.5rem;
        }
        .about-title-accent {
          display: block;
          background: linear-gradient(100deg, #00f5c4, #7b61ff);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .about-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.5rem;
          margin-top: 3rem;
          align-items: start;
        }

        .about-paragraph {
          font-size: 0.92rem; line-height: 1.85;
          color: rgba(255,255,255,0.5); margin-bottom: 1.25rem;
        }
        .about-paragraph strong { color: rgba(255,255,255,0.85); font-weight: 700; }

        .about-cta {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          background: transparent; border: 1px solid rgba(0,245,196,0.3);
          border-radius: 0.4rem; color: #00f5c4;
          font-family: 'Space Mono', monospace; font-size: 0.68rem;
          letter-spacing: 0.1em; cursor: pointer; text-decoration: none;
          transition: all 0.25s; width: fit-content;
        }
        .about-cta:hover { background: rgba(0,245,196,0.08); transform: translateX(4px); }
        .about-cta svg { transition: transform 0.25s; }
        .about-cta:hover svg { transform: translateX(4px); }

        .about-traits { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }

        .trait-card {
          padding: 1.1rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.75rem;
          transition: all 0.3s; cursor: default; position: relative; overflow: hidden;
        }
        .trait-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, #00f5c4, #7b61ff); opacity: 0; transition: opacity 0.3s;
        }
        .trait-card:hover { background: rgba(0,245,196,0.04); border-color: rgba(0,245,196,0.15); transform: translateY(-3px); }
        .trait-card:hover::before { opacity: 1; }

        .trait-icon { font-size: 1.1rem; color: #00f5c4; margin-bottom: 0.5rem; display: block; }
        .trait-label { font-size: 0.8rem; font-weight: 700; color: white; margin-bottom: 0.2rem; }
        .trait-desc { font-family: 'Space Mono', monospace; font-size: 0.58rem; color: rgba(255,255,255,0.32); line-height: 1.5; }

        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.delay-1 { transition-delay: 0.1s; }
        .reveal.delay-2 { transition-delay: 0.2s; }
        .reveal.delay-3 { transition-delay: 0.3s; }
        .reveal.delay-4 { transition-delay: 0.4s; }
        .reveal.delay-5 { transition-delay: 0.5s; }
        .in-view.reveal { opacity: 1; transform: translateY(0); }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .about-section { padding: 4rem 1.25rem; }
          .about-layout { grid-template-columns: 1fr; gap: 2rem; margin-top: 2rem; }
          .about-title { font-size: clamp(2rem, 10vw, 2.8rem); }
          .about-paragraph { font-size: 0.88rem; }
          .about-traits { grid-template-columns: 1fr 1fr; gap: 0.6rem; }
          .trait-card { padding: 0.9rem; }
          .trait-label { font-size: 0.75rem; }
          .trait-desc { font-size: 0.55rem; }
        }
        @media (max-width: 380px) {
          .about-traits { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="about-section" ref={sectionRef} id="about-content">
        <div className="about-divider" />
        <div className="about-bg-text">ABOUT</div>

        <div className="about-wrap">
          <p className="section-label reveal">01 — About Me</p>
          <h2 className="about-title reveal delay-1">
            Who I<br />
            <span className="about-title-accent">Really Am.</span>
          </h2>

          <div className="about-layout">
            <div className="reveal delay-2">
              <p className="about-paragraph">
                Saya adalah seorang <strong>Web Developer</strong> yang passionate dalam membangun pengalaman digital yang bersih, cepat, dan bermakna. Saya percaya bahwa <strong>kode yang baik</strong> bukan hanya yang bekerja — tapi yang mudah dibaca dan dirawat.
              </p>
              <p className="about-paragraph">
                Dengan fokus pada <strong>frontend modern</strong> dan <strong>backend yang solid</strong>, saya membangun sistem yang tidak hanya indah secara visual tapi juga kuat di balik layar.
              </p>
              <a href="#contact" className="about-cta">
                Let&apos;s work together
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>

            <div className="about-traits">
              {traits.map((t, i) => (
                <div key={t.label} className={`trait-card reveal delay-${i + 2}`}>
                  <span className="trait-icon">{t.icon}</span>
                  <div className="trait-label">{t.label}</div>
                  <div className="trait-desc">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}