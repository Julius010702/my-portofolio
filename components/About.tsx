"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const traits = [
  { icon: "◈", label: "Clean Code",     desc: "Readable & maintainable",   color: "#00f5c4" },
  { icon: "◉", label: "Modern Stack",   desc: "Next.js · TypeScript",       color: "#7b61ff" },
  { icon: "◌", label: "UI Focused",     desc: "Pixel-perfect interfaces",   color: "#ff61d8" },
  { icon: "◍", label: "Problem Solver", desc: "Backend & architecture",     color: "#00f5c4" },
];

const dicodingCerts = [
  {
    title: "Belajar Dasar Pemrograman JavaScript",
    duration: "46 Jam",
    rating: 4.85,
    level: "Dasar",
    students: "266.145",
    modules: "11 Modul",
    color: "#00f5c4",
    icon: "JS",
    certUrl: "https://drive.google.com/file/d/1s1g7ziZgwjm4ylxfDT4-jwT9380StIh5/view?usp=sharing",
  },
  {
    title: "Belajar Dasar AI",
    duration: "10 Jam",
    rating: 4.67,
    level: "Dasar",
    students: "224.911",
    modules: "39 Modul",
    color: "#7b61ff",
    icon: "AI",
    certUrl: "https://drive.google.com/file/d/1SPbkXKS9qzWpgROal-V5AWWY-y4fss-S/view?usp=sharing",
  },
  {
    title: "Belajar Cloud dan Gen AI di AWS",
    duration: "18 Jam",
    rating: 4.62,
    level: "Dasar",
    students: "224.778",
    modules: "99 Modul",
    color: "#ff61d8",
    icon: "☁",
    certUrl: "https://drive.google.com/file/d/1EEKY2Slo5WcvCOfSqYV11V8tby6TNCi7/view?usp=sharing",
  },
];

// Animated counter hook
function useCounter(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((eased * target).toFixed(2)));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

// Individual cert card with all animations
function CertCard({ cert, index, inView }: { cert: typeof dicodingCerts[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [ratingAnimated, setRatingAnimated] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const ratingVal = useCounter(cert.rating, 1200, ratingAnimated);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setRatingAnimated(true), 600 + index * 120);
      return () => clearTimeout(t);
    }
  }, [inView, index]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setMouse({
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
    });
  };

  const ratingPct = (cert.rating / 5) * 100;
  const tiltX = hovered ? (mouse.y - 0.5) * -18 : 0;
  const tiltY = hovered ? (mouse.x - 0.5) * 18 : 0;
  const glowX = mouse.x * 100;
  const glowY = mouse.y * 100;

  return (
    <a
      ref={cardRef}
      href={cert.certUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="dc-card"
      style={{
        "--cc": cert.color,
        "--gx": `${glowX}%`,
        "--gy": `${glowY}%`,
        transform: `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(${hovered ? 16 : 0}px)`,
        transitionDelay: `${index * 0.08}s`,
        opacity: inView ? 1 : 0,
        translate: inView ? "0 0" : "0 40px",
      } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMouse({ x: 0.5, y: 0.5 }); }}
    >
      {/* Dynamic glow that follows cursor */}
      <div className="dc-cursor-glow" />

      {/* Top row */}
      <div className="dc-card-top">
        <div className="dc-lulus">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          Lulus
        </div>
        <div className="dc-icon-badge">{cert.icon}</div>
      </div>

      {/* Title */}
      <div className="dc-card-title">{cert.title}</div>

      {/* Rating bar */}
      <div className="dc-rating-wrap">
        <div className="dc-rating-bar-bg">
          <div
            className="dc-rating-bar-fill"
            style={{ width: ratingAnimated ? `${ratingPct}%` : "0%" }}
          />
        </div>
        <span className="dc-rating-num">★ {ratingVal.toFixed(2)}</span>
      </div>

      {/* Meta row */}
      <div className="dc-meta">
        <span className="dc-chip">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
          </svg>
          {cert.duration}
        </span>
        <span className="dc-chip dc-chip-level">{cert.level}</span>
        <span className="dc-chip">{cert.modules}</span>
      </div>

      {/* Footer */}
      <div className="dc-card-footer">
        <span className="dc-students">👥 {cert.students} siswa</span>
        <span className="dc-view-cert">
          Lihat Sertifikat
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M7 7h10v10"/>
          </svg>
        </span>
      </div>

      {/* Corner watermark */}
      <div className="dc-watermark">{String(index + 1).padStart(2, "0")}</div>
    </a>
  );
}

export default function About() {
  const sectionRef  = useRef<HTMLElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const rafRefs     = useRef<number[]>([]);
  const curTilts    = useRef<{ rx: number; ry: number }[]>([]);
  const tgtTilts    = useRef<{ rx: number; ry: number }[]>([]);
  const hovers      = useRef<boolean[]>([]);
  const [certsInView, setCertsInView] = useState(false);
  const [statsInView, setStatsInView] = useState(false);
  const certsSectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const yearsVal   = useCounter(3, 1400, statsInView);
  const projectVal = useCounter(3, 1600, statsInView);
  const certCount  = useCounter(dicodingCerts.length, 1200, statsInView);

  useEffect(() => {
    traits.forEach((_, i) => {
      curTilts.current[i] = { rx: 0, ry: 0 };
      tgtTilts.current[i] = { rx: 0, ry: 0 };
      hovers.current[i] = false;
    });
  }, []);

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
        const tz = hovers.current[i] ? 20 : 0;
        el.style.transform = `perspective(800px) rotateX(${cur.rx}deg) rotateY(${cur.ry}deg) translateZ(${tz}px) scale(${scale})`;
      }
      rafRefs.current[i] = requestAnimationFrame(tick);
    };
    rafRefs.current[i] = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    traits.forEach((_, i) => startTilt(i));
    const rafIds = rafRefs.current.slice();
    return () => rafIds.forEach(id => cancelAnimationFrame(id));
  }, [startTilt]);

  // Intersection observers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    const certsObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setCertsInView(true); },
      { threshold: 0.1 }
    );
    if (certsSectionRef.current) certsObs.observe(certsSectionRef.current);

    const statsObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsInView(true); },
      { threshold: 0.5 }
    );
    if (statsRef.current) statsObs.observe(statsRef.current);

    return () => { observer.disconnect(); certsObs.disconnect(); statsObs.disconnect(); };
  }, []);

  // Parallax orbs
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const orbs = section.querySelectorAll<HTMLElement>(".ab-orb");
    const onScroll = () => {
      const top = section.getBoundingClientRect().top;
      const sy = -top;
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
    const r = el.getBoundingClientRect();
    const dx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const dy = ((e.clientY - r.top) / r.height - 0.5) * 2;
    tgtTilts.current[i] = { rx: -dy * 16, ry: dx * 16 };
  }, []);
  const onMouseEnter = useCallback((i: number) => { hovers.current[i] = true; }, []);
  const onMouseLeave = useCallback((i: number) => {
    hovers.current[i] = false;
    tgtTilts.current[i] = { rx: 0, ry: 0 };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;600;800&display=swap');

        /* ═══════════════════════ BASE ═══════════════════════ */
        .ab-section {
          position: relative; padding: 7rem 2rem 9rem;
          background: #020408; overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }
        .ab-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent);
          pointer-events: none;
        }

        /* Floating particles */
        .ab-particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .ab-particle {
          position: absolute; border-radius: 50%;
          background: var(--pc);
          animation: ab-particle-float var(--pd) ease-in-out infinite var(--delay);
          opacity: 0;
          width: var(--ps); height: var(--ps);
        }
        @keyframes ab-particle-float {
          0%   { transform: translateY(0) translateX(0) scale(0); opacity: 0; }
          15%  { opacity: var(--po); }
          85%  { opacity: var(--po); }
          100% { transform: translateY(-120px) translateX(var(--px)) scale(1.4); opacity: 0; }
        }

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

        /* ═══════════════════════ HEADER ═══════════════════════ */
        .ab-label {
          display: inline-flex; align-items: center; gap: 0.7rem;
          font-family: 'DM Mono', monospace; font-size: 0.62rem;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(0,245,196,0.75); margin-bottom: 1.25rem;
        }
        .ab-label-line { display: block; width: 28px; height: 1px; background: linear-gradient(90deg,#00f5c4,transparent); }
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

        /* ═══════════════════════ LAYOUT ═══════════════════════ */
        .ab-layout {
          display: grid; grid-template-columns: 1.1fr 1fr;
          gap: 4rem; margin-top: 3.5rem; align-items: start;
        }
        .ab-paragraph {
          font-size: 0.9rem; line-height: 1.9;
          color: rgba(255,255,255,0.42); margin-bottom: 1.3rem;
        }
        .ab-paragraph strong { color: rgba(255,255,255,0.88); font-weight: 600; }

        /* ═══════════════════════ STATS (animated counters) ═══════════════════════ */
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
        /* Animated scan line inside stats */
        .ab-stats::after {
          content: ''; position: absolute; top: 0; left: -100%; width: 60%;  height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0,245,196,0.04), transparent);
          animation: ab-stats-scan 3s ease-in-out infinite;
        }
        @keyframes ab-stats-scan { 0%{left:-60%} 100%{left:160%} }
        .ab-stat { flex: 1; text-align: center; position: relative; }
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

        /* ═══════════════════════ CTA ═══════════════════════ */
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

        /* ═══════════════════════ TRAIT CARDS ═══════════════════════ */
        .ab-traits { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; }
        .ab-trait {
          padding: 1.35rem 1.15rem;
          background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 1rem; position: relative; overflow: hidden;
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
        .ab-trait-glow {
          position: absolute; top: -40px; right: -40px;
          width: 120px; height: 120px;
          background: radial-gradient(circle, color-mix(in srgb, var(--tc) 18%, transparent), transparent 70%);
          pointer-events: none; opacity: 0; transition: opacity 0.35s;
        }
        .ab-trait:hover .ab-trait-glow { opacity: 1; }
        .ab-trait-shadow {
          position: absolute; bottom: -12px; left: 15%; right: 15%; height: 12px;
          background: var(--tc); filter: blur(14px);
          opacity: 0; border-radius: 50%; pointer-events: none;
          transition: opacity 0.35s, transform 0.35s;
        }
        .ab-trait:hover .ab-trait-shadow { opacity: 0.3; transform: scaleX(1.1); }
        .ab-trait-icon {
          font-size: 1.3rem; color: var(--tc); margin-bottom: 0.7rem; display: block;
          transition: transform 0.4s cubic-bezier(.34,1.56,.64,1);
        }
        .ab-trait:hover .ab-trait-icon { transform: rotate(-12deg) scale(1.2); }
        .ab-trait-label {
          font-size: 0.82rem; font-weight: 700; color: white;
          margin-bottom: 0.25rem; transition: color 0.3s;
        }
        .ab-trait:hover .ab-trait-label { color: var(--tc); }
        .ab-trait-desc {
          font-family: 'DM Mono', monospace; font-size: 0.56rem;
          color: rgba(255,255,255,0.3); line-height: 1.55; letter-spacing: 0.04em;
        }
        .ab-trait-num {
          position: absolute; top: 0.75rem; right: 0.85rem;
          font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem;
          color: var(--tc); opacity: 0.07; line-height: 1;
          pointer-events: none; transition: opacity 0.3s;
        }
        .ab-trait:hover .ab-trait-num { opacity: 0.14; }

        /* ═══════════════════════ SEPARATOR ═══════════════════════ */
        .dc-separator {
          width: 100%; height: 1px; margin: 5rem 0 0;
          background: linear-gradient(90deg, transparent, rgba(123,97,255,0.25), rgba(0,245,196,0.2), transparent);
          position: relative;
          overflow: visible;
        }
        .dc-separator::before {
          content: 'DICODING INDONESIA';
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Bebas Neue', sans-serif; font-size: 0.7rem;
          letter-spacing: 0.35em; color: rgba(255,255,255,0.08);
          background: #020408; padding: 0 1.5rem; white-space: nowrap;
        }
        /* Animated spark on separator */
        .dc-separator-spark {
          position: absolute; top: 50%; left: 0%;
          transform: translateY(-50%);
          width: 4px; height: 4px; border-radius: 50%;
          background: #00f5c4; box-shadow: 0 0 8px #00f5c4;
          animation: dc-spark 4s ease-in-out infinite;
        }
        @keyframes dc-spark { 0%{left:0%;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{left:100%;opacity:0} }

        /* ═══════════════════════ DICODING SECTION ═══════════════════════ */
        .dc-section { margin-top: 4rem; position: relative; }
        .dc-header {
          display: flex; align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2.5rem; gap: 1rem; flex-wrap: wrap;
        }
        .dc-badge {
          display: inline-flex; align-items: center; gap: 0.6rem;
          padding: 0.35rem 0.85rem;
          background: rgba(123,97,255,0.08);
          border: 1px solid rgba(123,97,255,0.25);
          border-radius: 2rem; font-family: 'DM Mono', monospace; font-size: 0.58rem;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #7b61ff; margin-bottom: 0.9rem;
        }
        .dc-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #7b61ff; box-shadow: 0 0 8px #7b61ff;
          animation: dc-pulse 2s ease-in-out infinite;
        }
        @keyframes dc-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.6)} }
        .dc-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          letter-spacing: 0.05em; color: white; line-height: 1;
        }
        .dc-title span {
          background: linear-gradient(110deg, #7b61ff, #ff61d8);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .dc-count {
          font-family: 'DM Mono', monospace; font-size: 0.62rem;
          color: rgba(255,255,255,0.25); letter-spacing: 0.1em; white-space: nowrap;
        }
        .dc-count strong { color: rgba(123,97,255,0.8); }

        /* ═══════════════════════ CERT CARDS GRID ═══════════════════════ */
        .dc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 1.2rem;
        }

        /* ── The Card ── */
        .dc-card {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1.2rem;
          padding: 1.5rem 1.4rem 1.1rem;
          cursor: pointer; text-decoration: none; display: block;
          transition:
            border-color 0.35s,
            box-shadow 0.35s,
            opacity 0.6s cubic-bezier(.16,1,.3,1),
            translate 0.6s cubic-bezier(.16,1,.3,1),
            transform 0.18s cubic-bezier(.16,1,.3,1);
          transform-style: preserve-3d;
          will-change: transform;
        }

        /* Top border glow */
        .dc-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--cc), transparent);
          opacity: 0; transition: opacity 0.35s;
        }
        .dc-card:hover {
          border-color: color-mix(in srgb, var(--cc) 30%, transparent);
          box-shadow: 0 24px 50px rgba(0,0,0,0.5), 0 0 0 1px color-mix(in srgb, var(--cc) 12%, transparent),
                      0 0 40px color-mix(in srgb, var(--cc) 8%, transparent);
        }
        .dc-card:hover::before { opacity: 1; }

        /* Cursor-following glow */
        .dc-cursor-glow {
          position: absolute;
          left: calc(var(--gx) - 80px); top: calc(var(--gy) - 80px);
          width: 160px; height: 160px; border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, color-mix(in srgb, var(--cc) 15%, transparent), transparent 70%);
          opacity: 0; transition: opacity 0.3s;
        }
        .dc-card:hover .dc-cursor-glow { opacity: 1; }

        /* Top row */
        .dc-card-top {
          display: flex; align-items: center;
          justify-content: space-between; margin-bottom: 1rem;
        }
        .dc-lulus {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'DM Mono', monospace; font-size: 0.52rem;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--cc);
          background: color-mix(in srgb, var(--cc) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--cc) 22%, transparent);
          padding: 0.22rem 0.6rem; border-radius: 2rem;
        }
        .dc-icon-badge {
          font-family: 'Bebas Neue', sans-serif; font-size: 0.9rem; letter-spacing: 0.1em;
          color: var(--cc);
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          background: color-mix(in srgb, var(--cc) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--cc) 22%, transparent);
          border-radius: 0.6rem;
          transition: transform 0.4s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s;
          flex-shrink: 0;
        }
        .dc-card:hover .dc-icon-badge {
          transform: rotate(-10deg) scale(1.12);
          box-shadow: 0 0 18px color-mix(in srgb, var(--cc) 35%, transparent);
        }

        /* Title */
        .dc-card-title {
          font-size: 0.84rem; font-weight: 700;
          color: rgba(255,255,255,0.88); line-height: 1.45;
          margin-bottom: 1rem;
          transition: color 0.25s;
        }
        .dc-card:hover .dc-card-title { color: var(--cc); }

        /* ─── Rating bar ─── */
        .dc-rating-wrap {
          display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.85rem;
        }
        .dc-rating-bar-bg {
          flex: 1; height: 3px; border-radius: 99px;
          background: rgba(255,255,255,0.07); overflow: hidden;
        }
        .dc-rating-bar-fill {
          height: 100%; border-radius: 99px;
          background: linear-gradient(90deg, var(--cc), color-mix(in srgb, var(--cc) 60%, #fff));
          box-shadow: 0 0 8px var(--cc);
          transition: width 1.2s cubic-bezier(.16,1,.3,1);
        }
        .dc-rating-num {
          font-family: 'DM Mono', monospace; font-size: 0.6rem;
          color: rgba(255,200,60,0.85); white-space: nowrap; flex-shrink: 0;
        }

        /* Chips */
        .dc-meta {
          display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.85rem;
        }
        .dc-chip {
          font-family: 'DM Mono', monospace; font-size: 0.5rem;
          letter-spacing: 0.08em; padding: 0.18rem 0.55rem;
          border-radius: 99px; border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.4);
          display: inline-flex; align-items: center; gap: 0.3rem;
          transition: border-color 0.25s, color 0.25s;
        }
        .dc-chip svg { opacity: 0.5; }
        .dc-chip-level {
          color: var(--cc); opacity: 0.75;
          border-color: color-mix(in srgb, var(--cc) 22%, transparent);
          background: color-mix(in srgb, var(--cc) 6%, transparent);
        }
        .dc-card:hover .dc-chip { border-color: rgba(255,255,255,0.18); color: rgba(255,255,255,0.6); }

        /* Footer */
        .dc-card-footer {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 0.75rem; margin-top: 0.1rem;
          display: flex; align-items: center; justify-content: space-between;
        }
        .dc-students {
          font-family: 'DM Mono', monospace; font-size: 0.5rem;
          color: rgba(255,255,255,0.2); letter-spacing: 0.05em;
        }
        .dc-view-cert {
          font-family: 'DM Mono', monospace; font-size: 0.52rem;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--cc); opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.25s, transform 0.25s;
          display: inline-flex; align-items: center; gap: 0.35rem;
        }
        .dc-card:hover .dc-view-cert { opacity: 0.85; transform: translateX(0); }

        /* Watermark number */
        .dc-watermark {
          position: absolute; bottom: 0.7rem; right: 1rem;
          font-family: 'Bebas Neue', sans-serif; font-size: 3.5rem;
          color: var(--cc); opacity: 0.04; line-height: 1;
          pointer-events: none; user-select: none;
          transition: opacity 0.35s;
        }
        .dc-card:hover .dc-watermark { opacity: 0.1; }

        /* ═══════════════════════ REVEAL ANIMATIONS ═══════════════════════ */
        .reveal {
          opacity: 0; transform: translateY(32px);
          transition: opacity 0.75s cubic-bezier(.16,1,.3,1), transform 0.75s cubic-bezier(.16,1,.3,1);
        }
        .reveal.delay-1 { transition-delay: 0.1s; }
        .reveal.delay-2 { transition-delay: 0.2s; }
        .reveal.delay-3 { transition-delay: 0.32s; }
        .reveal.delay-4 { transition-delay: 0.44s; }
        .reveal.from-left {
          opacity: 0; transform: translateX(-40px);
          transition: opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1);
        }
        .reveal.from-right {
          opacity: 0; transform: translateX(40px);
          transition: opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1);
        }
        .in-view.reveal { opacity: 1; transform: translateY(0) translateX(0); }

        /* ═══════════════════════ UTILITY ═══════════════════════ */
        .ab-scan {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(0,245,196,0.4) 50%, transparent 100%);
          animation: ab-scan 6s ease-in-out infinite; pointer-events: none;
        }
        @keyframes ab-scan {
          0%  { top: 0%; opacity: 0; }
          5%  { opacity: 1; }
          95% { opacity: 0.6; }
          100%{ top: 100%; opacity: 0; }
        }
        .ab-divider {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,245,196,0.25), rgba(123,97,255,0.25), transparent);
        }

        /* ═══════════════════════ RESPONSIVE ═══════════════════════ */
        @media (max-width: 900px) {
          .ab-layout { grid-template-columns: 1fr; gap: 2.5rem; margin-top: 2.5rem; }
          .dc-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
        }
        @media (max-width: 640px) {
          .ab-section { padding: 5rem 1.25rem 6rem; }
          .ab-title { font-size: clamp(3rem, 16vw, 5rem); }
          .ab-stats { gap: 1rem; padding: 1rem; }
          .ab-stat-num { font-size: 1.8rem; }
          .dc-grid { grid-template-columns: 1fr 1fr; }
          .dc-header { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 480px) { .dc-grid { grid-template-columns: 1fr; } }
        @media (max-width: 400px) { .ab-traits { grid-template-columns: 1fr; } }
      `}</style>

      <section className="ab-section" ref={sectionRef} id="about-content">
        <div className="ab-divider" />
        <div className="ab-scan" />
        <div className="ab-grid" />
        <div className="ab-orb ab-orb-1" />
        <div className="ab-orb ab-orb-2" />
        <div className="ab-orb ab-orb-3" />
        <div className="ab-bg-text">ABOUT</div>

        {/* Floating particles */}
        <div className="ab-particles">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="ab-particle"
              style={{
                "--pc": ["#00f5c4", "#7b61ff", "#ff61d8"][i % 3],
                "--ps": `${2 + (i % 3)}px`,
                "--pd": `${5 + (i % 5)}s`,
                "--delay": `-${i * 0.8}s`,
                "--po": `${0.3 + (i % 4) * 0.12}`,
                "--px": `${(i % 2 === 0 ? 1 : -1) * (10 + (i % 4) * 8)}px`,
                left: `${(i * 5.8 + 3) % 100}%`,
                bottom: `${(i * 7 + 10) % 40}%`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="ab-wrap">
          <p className="ab-label reveal">
            <span className="ab-label-line" />
            01 — About Me
          </p>
          <h2 className="ab-title reveal delay-1">
            Who I<br />
            <span className="ab-title-accent">Really Am.</span>
          </h2>

          <div className="ab-layout">
            {/* Left */}
            <div className="reveal from-left delay-2">
              <p className="ab-paragraph">
                Saya adalah seorang <strong>Full-Stack Web Developer</strong> yang passionate dalam membangun pengalaman digital yang bersih, cepat, dan bermakna. Saya percaya bahwa <strong>kode yang baik</strong> bukan hanya yang bekerja — tapi yang mudah dibaca dan dirawat.
              </p>
              <p className="ab-paragraph">
                Dengan fokus pada <strong>frontend modern</strong> dan <strong>backend yang solid</strong>, saya membangun sistem yang tidak hanya indah secara visual tapi juga kuat di balik layar.
              </p>

              {/* Animated stats */}
              <div className="ab-stats reveal delay-3" ref={statsRef}>
                <div className="ab-stat">
                  <div className="ab-stat-num">{Math.floor(yearsVal)}+</div>
                  <div className="ab-stat-label">Years Exp</div>
                </div>
                <div className="ab-stat-sep" />
                <div className="ab-stat">
                  <div className="ab-stat-num">{Math.floor(projectVal)}+</div>
                  <div className="ab-stat-label">Projects</div>
                </div>
                <div className="ab-stat-sep" />
                <div className="ab-stat">
                  <div className="ab-stat-num">{Math.floor(certCount)}</div>
                  <div className="ab-stat-label">Sertifikat</div>
                </div>
              </div>

              <a href="#contact" className="ab-cta reveal delay-4">
                Let&apos;s work together
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>

            {/* Right: trait cards */}
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

          {/* ══ DICODING SECTION ══ */}
          <div className="dc-separator">
            <div className="dc-separator-spark" />
          </div>

          <div className="dc-section" ref={certsSectionRef}>
            <div className="dc-header reveal">
              <div>
                <div className="dc-badge">
                  <span className="dc-badge-dot" />
                  Dicoding Indonesia
                </div>
                <h3 className="dc-title">
                  Sertifikat <span>Kelulusan</span>
                </h3>
              </div>
              <div className="dc-count">
                <strong>{dicodingCerts.length}</strong> kursus selesai &amp; bersertifikat
              </div>
            </div>

            <div className="dc-grid">
              {dicodingCerts.map((cert, i) => (
                <CertCard key={cert.title} cert={cert} index={i} inView={certsInView} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}