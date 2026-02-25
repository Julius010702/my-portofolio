"use client";

import { useEffect, useRef, useCallback } from "react";

// ── Moved outside component — stable reference, no ESLint dep warning ──
const traits = [
  { icon: "◈", label: "Clean Code",     desc: "Readable & maintainable",   color: "#00f5c4" },
  { icon: "◉", label: "Modern Stack",   desc: "Next.js · TypeScript",       color: "#7b61ff" },
  { icon: "◌", label: "UI Focused",     desc: "Pixel-perfect interfaces",   color: "#ff61d8" },
  { icon: "◍", label: "Problem Solver", desc: "Backend & architecture",     color: "#00f5c4" },
];

export default function About() {
  const sectionRef  = useRef<HTMLElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const rafRefs     = useRef<number[]>([]);
  const curTilts    = useRef<{ rx: number; ry: number }[]>([]);
  const tgtTilts    = useRef<{ rx: number; ry: number }[]>([]);
  const hovers      = useRef<boolean[]>([]);

  // ── Initialize tilt state ──
  useEffect(() => {
    traits.forEach((_, i) => {
      curTilts.current[i] = { rx: 0, ry: 0 };
      tgtTilts.current[i] = { rx: 0, ry: 0 };
      hovers.current[i]   = false;
    });
  }, []); // traits is a module-level const, stable

  // ── RAF tilt loop per card ──
  const startTilt = useCallback((i: number) => {
    cancelAnimationFrame(rafRefs.current[i]);
    const tick = () => {
      const cur = curTilts.current[i];
      const tgt = tgtTilts.current[i];
      cur.rx += (tgt.rx - cur.rx) * 0.09;
      cur.ry += (tgt.ry - cur.ry) * 0.09;
      const el = cardRefs.current[i];
      if (el) {
        const scale = hovers.current[i] ? 1.04 : 1;
        const tz    = hovers.current[i] ? 20 : 0;
        el.style.transform = `perspective(800px) rotateX(${cur.rx}deg) rotateY(${cur.ry}deg) translateZ(${tz}px) scale(${scale})`;
      }
      rafRefs.current[i] = requestAnimationFrame(tick);
    };
    rafRefs.current[i] = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    traits.forEach((_, i) => startTilt(i));
    // Copy to local var before cleanup to avoid stale ref warning
    const rafIds = rafRefs.current.slice();
    return () => rafIds.forEach(id => cancelAnimationFrame(id));
  }, [startTilt]); // traits is module-level const, startTilt is stable


  // ── Intersection Observer for scroll reveals ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ── Parallax orbs on scroll ──
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const orbs = section.querySelectorAll<HTMLElement>(".ab-orb");
    const onScroll = () => {
      const top = section.getBoundingClientRect().top;
      const sy  = -top;
      orbs.forEach((orb, i) => {
        const sign = i % 2 === 0 ? 1 : -1;
        orb.style.transform = `translateY(${sy * 0.05 * sign}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onMouseMove = useCallback((i: number, e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRefs.current[i];
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const dx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
    const dy = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    tgtTilts.current[i] = { rx: -dy * 16, ry: dx * 16 };
  }, []);

  const onMouseEnter = useCallback((i: number) => { hovers.current[i] = true; }, []);
  const onMouseLeave = useCallback((i: number) => {
    hovers.current[i]   = false;
    tgtTilts.current[i] = { rx: 0, ry: 0 };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;600;800&display=swap');

        .ab-section {
          position: relative;
          padding: 7rem 2rem 8rem;
          background: #020408;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }

        /* ── Background grid ── */
        .ab-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent);
          pointer-events: none;
        }

        /* ── Orbs ── */
        .ab-orb {
          position: absolute; border-radius: 50%;
          filter: blur(110px); pointer-events: none; will-change: transform;
        }
        .ab-orb-1 {
          width: 500px; height: 500px; top: -120px; left: -180px;
          background: radial-gradient(circle, rgba(0,245,196,0.09), transparent 70%);
          animation: ab-float-a 10s ease-in-out infinite;
        }
        .ab-orb-2 {
          width: 450px; height: 450px; bottom: -100px; right: -120px;
          background: radial-gradient(circle, rgba(123,97,255,0.1), transparent 70%);
          animation: ab-float-b 12s ease-in-out infinite;
        }
        .ab-orb-3 {
          width: 300px; height: 300px; top: 40%; left: 50%;
          background: radial-gradient(circle, rgba(255,97,216,0.06), transparent 70%);
          animation: ab-float-a 8s 1.5s ease-in-out infinite;
        }
        @keyframes ab-float-a { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes ab-float-b { 0%,100%{transform:translateY(0)} 50%{transform:translateY(20px)} }

        /* ── BG text ── */
        .ab-bg-text {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(80px, 20vw, 260px);
          letter-spacing: 0.12em; color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.03);
          pointer-events: none; user-select: none; white-space: nowrap;
        }

        .ab-wrap { max-width: 1100px; margin: 0 auto; position: relative; z-index: 2; }

        /* ── Label ── */
        .ab-label {
          display: inline-flex; align-items: center; gap: 0.7rem;
          font-family: 'DM Mono', monospace; font-size: 0.62rem;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(0,245,196,0.75); margin-bottom: 1.25rem;
        }
        .ab-label-line { display: block; width: 28px; height: 1px; background: linear-gradient(90deg,#00f5c4,transparent); }

        /* ── Title ── */
        .ab-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.5rem, 11vw, 7rem);
          line-height: 0.88; letter-spacing: 0.04em; color: white; margin-bottom: 0.2rem;
        }
        .ab-title-accent {
          display: block;
          background: linear-gradient(110deg, #00f5c4 0%, #7b61ff 55%, #ff61d8 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          filter: drop-shadow(0 0 35px rgba(0,245,196,0.4));
        }

        /* ── Layout ── */
        .ab-layout {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 4rem;
          margin-top: 3.5rem;
          align-items: start;
        }

        /* ── Text side ── */
        .ab-paragraph {
          font-size: 0.9rem; line-height: 1.9;
          color: rgba(255,255,255,0.42); margin-bottom: 1.3rem;
        }
        .ab-paragraph strong { color: rgba(255,255,255,0.88); font-weight: 600; }

        /* ── Stat strip ── */
        .ab-stats {
          display: flex; gap: 2rem; margin: 2rem 0;
          padding: 1.25rem 1.5rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.8rem;
          position: relative; overflow: hidden;
        }
        .ab-stats::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,245,196,0.4), rgba(123,97,255,0.4), transparent);
        }
        .ab-stat { flex: 1; text-align: center; }
        .ab-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.2rem; letter-spacing: 0.04em;
          background: linear-gradient(135deg, #00f5c4, #7b61ff);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          line-height: 1;
        }
        .ab-stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.53rem; letter-spacing: 0.15em;
          text-transform: uppercase; color: rgba(255,255,255,0.28); margin-top: 0.3rem;
        }
        .ab-stat-sep { width: 1px; background: rgba(255,255,255,0.07); align-self: stretch; }

        /* ── CTA ── */
        .ab-cta {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0.65rem 1.3rem;
          background: transparent; border: 1px solid rgba(0,245,196,0.3);
          border-radius: 0.45rem; color: #00f5c4;
          font-family: 'DM Mono', monospace; font-size: 0.62rem;
          letter-spacing: 0.1em; cursor: pointer; text-decoration: none;
          transition: all 0.28s; position: relative; overflow: hidden;
        }
        .ab-cta::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(0,245,196,0.08), transparent);
          transform: translateX(-100%); transition: transform 0.35s;
        }
        .ab-cta:hover::before { transform: translateX(0); }
        .ab-cta:hover { border-color: rgba(0,245,196,0.6); box-shadow: 0 0 20px rgba(0,245,196,0.15); }
        .ab-cta:hover svg { transform: translateX(4px); }
        .ab-cta svg { transition: transform 0.25s; position: relative; }

        /* ── Trait cards ── */
        .ab-traits { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; }

        .ab-trait {
          padding: 1.35rem 1.15rem;
          background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 1rem;
          position: relative; overflow: hidden;
          will-change: transform; cursor: default;
          transition: border-color 0.35s, box-shadow 0.35s;
        }
        .ab-trait::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
          background: linear-gradient(90deg, transparent, var(--tc), transparent);
          opacity: 0; transition: opacity 0.35s;
        }
        .ab-trait:hover { border-color: color-mix(in srgb, var(--tc) 30%, transparent); }
        .ab-trait:hover::before { opacity: 1; }

        /* corner glow */
        .ab-trait-glow {
          position: absolute; top: -40px; right: -40px;
          width: 120px; height: 120px;
          background: radial-gradient(circle, color-mix(in srgb, var(--tc) 18%, transparent), transparent 70%);
          pointer-events: none; opacity: 0; transition: opacity 0.35s;
        }
        .ab-trait:hover .ab-trait-glow { opacity: 1; }

        /* floor shadow */
        .ab-trait-shadow {
          position: absolute; bottom: -12px; left: 15%; right: 15%; height: 12px;
          background: var(--tc); filter: blur(14px);
          opacity: 0; border-radius: 50%; pointer-events: none;
          transition: opacity 0.35s, transform 0.35s;
        }
        .ab-trait:hover .ab-trait-shadow { opacity: 0.3; transform: scaleX(1.1); }

        .ab-trait-icon {
          font-size: 1.3rem; color: var(--tc);
          margin-bottom: 0.7rem; display: block;
          transition: transform 0.4s cubic-bezier(.34,1.56,.64,1);
        }
        .ab-trait:hover .ab-trait-icon { transform: rotate(-12deg) scale(1.2); }

        .ab-trait-label {
          font-size: 0.82rem; font-weight: 700;
          color: white; margin-bottom: 0.25rem;
          transition: color 0.3s;
        }
        .ab-trait:hover .ab-trait-label { color: var(--tc); }

        .ab-trait-desc {
          font-family: 'DM Mono', monospace;
          font-size: 0.56rem; color: rgba(255,255,255,0.3);
          line-height: 1.55; letter-spacing: 0.04em;
        }

        /* ── Floating number badge ── */
        .ab-trait-num {
          position: absolute; top: 0.75rem; right: 0.85rem;
          font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem;
          color: var(--tc); opacity: 0.07; line-height: 1;
          pointer-events: none; transition: opacity 0.3s;
        }
        .ab-trait:hover .ab-trait-num { opacity: 0.14; }

        /* ── Reveal animations ── */
        .reveal {
          opacity: 0; transform: translateY(32px);
          transition: opacity 0.75s cubic-bezier(.16,1,.3,1), transform 0.75s cubic-bezier(.16,1,.3,1);
        }
        .reveal.delay-1 { transition-delay: 0.1s; }
        .reveal.delay-2 { transition-delay: 0.2s; }
        .reveal.delay-3 { transition-delay: 0.32s; }
        .reveal.delay-4 { transition-delay: 0.44s; }
        .reveal.delay-5 { transition-delay: 0.56s; }
        .reveal.from-left {
          opacity: 0; transform: translateX(-40px) translateY(0);
          transition: opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1);
        }
        .reveal.from-right {
          opacity: 0; transform: translateX(40px) translateY(0);
          transition: opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1);
        }
        .in-view.reveal {
          opacity: 1; transform: translateY(0) translateX(0);
        }

        /* ── Scanning line animation on section ── */
        .ab-scan {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(0,245,196,0.4) 50%, transparent 100%);
          animation: ab-scan 6s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes ab-scan {
          0%   { top: 0%; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 0.6; }
          100% { top: 100%; opacity: 0; }
        }

        /* ── Divider ── */
        .ab-divider {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,245,196,0.25), rgba(123,97,255,0.25), transparent);
        }

        /* ── Mobile ── */
        @media (max-width: 900px) {
          .ab-layout { grid-template-columns: 1fr; gap: 2.5rem; margin-top: 2.5rem; }
          .ab-traits { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .ab-section { padding: 5rem 1.25rem 6rem; }
          .ab-title { font-size: clamp(3rem, 16vw, 5rem); }
          .ab-stats { gap: 1rem; padding: 1rem; }
          .ab-stat-num { font-size: 1.8rem; }
        }
        @media (max-width: 400px) {
          .ab-traits { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="ab-section" ref={sectionRef} id="about-content">
        <div className="ab-divider" />
        <div className="ab-scan" />
        <div className="ab-grid" />
        <div className="ab-orb ab-orb-1" />
        <div className="ab-orb ab-orb-2" />
        <div className="ab-orb ab-orb-3" />
        <div className="ab-bg-text">ABOUT</div>

        <div className="ab-wrap">
          {/* Label */}
          <p className="ab-label reveal">
            <span className="ab-label-line" />
            01 — About Me
          </p>

          {/* Title */}
          <h2 className="ab-title reveal delay-1">
            Who I<br />
            <span className="ab-title-accent">Really Am.</span>
          </h2>

          <div className="ab-layout">
            {/* ── Left: text ── */}
            <div className="reveal from-left delay-2">
              <p className="ab-paragraph">
                Saya adalah seorang <strong>Web Developer</strong> yang passionate dalam membangun pengalaman digital yang bersih, cepat, dan bermakna. Saya percaya bahwa <strong>kode yang baik</strong> bukan hanya yang bekerja — tapi yang mudah dibaca dan dirawat.
              </p>
              <p className="ab-paragraph">
                Dengan fokus pada <strong>frontend modern</strong> dan <strong>backend yang solid</strong>, saya membangun sistem yang tidak hanya indah secara visual tapi juga kuat di balik layar.
              </p>

              {/* Stats strip */}
              <div className="ab-stats reveal delay-3">
                <div className="ab-stat">
                  <div className="ab-stat-num">3+</div>
                  <div className="ab-stat-label">Years Exp</div>
                </div>
                <div className="ab-stat-sep" />
                <div className="ab-stat">
                  <div className="ab-stat-num">10+</div>
                  <div className="ab-stat-label">Projects</div>
                </div>
                <div className="ab-stat-sep" />
                <div className="ab-stat">
                  <div className="ab-stat-num">5+</div>
                  <div className="ab-stat-label">Tech Stack</div>
                </div>
              </div>

              <a href="#contact" className="ab-cta reveal delay-4">
                Let&apos;s work together
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>

            {/* ── Right: trait cards with 3D tilt ── */}
            <div className="ab-traits reveal from-right delay-3">
              {traits.map((t, i) => (
                <div
                  key={t.label}
                  ref={el => { cardRefs.current[i] = el; }}
                  className="ab-trait"
                  style={{ "--tc": t.color } as React.CSSProperties}
                  onMouseMove={e => onMouseMove(i, e)}
                  onMouseEnter={() => onMouseEnter(i)}
                  onMouseLeave={() => onMouseLeave(i)}
                >
                  <div className="ab-trait-glow" />
                  <div className="ab-trait-shadow" />
                  <div className="ab-trait-num">0{i + 1}</div>
                  <span className="ab-trait-icon">{t.icon}</span>
                  <div className="ab-trait-label">{t.label}</div>
                  <div className="ab-trait-desc">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}