"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [mouseRaw, setMouseRaw] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const particlesRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
      setMouseRaw({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const count = window.innerWidth <= 768 ? 30 : 80;
    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string; life: number; maxLife: number;
    }[] = [];

    const colors = ["#00f5c4", "#7b61ff", "#ff61d8", "#00c8ff"];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * 200,
        maxLife: 200 + Math.random() * 100,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life > p.maxLife) {
          p.life = 0;
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
        }
        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,245,196,${(1 - dist / 100) * 0.05})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(animate);
    };

    animate();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }

        .hero-root {
          font-family: 'Syne', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #020408;
          overflow: hidden;
          position: relative;
          padding: 80px 1rem 2rem;
        }

        .hero-canvas {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,245,196,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,196,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          z-index: 0;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
          animation: orb-float 8s ease-in-out infinite;
        }
        .orb-1 { width: 400px; height: 400px; background: radial-gradient(circle, #7b61ff33, transparent 70%); top: -100px; left: -100px; }
        .orb-2 { width: 350px; height: 350px; background: radial-gradient(circle, #00f5c433, transparent 70%); bottom: -100px; right: -50px; animation-delay: -4s; }
        .orb-3 { width: 250px; height: 250px; background: radial-gradient(circle, #ff61d822, transparent 70%); top: 40%; right: 30%; animation-delay: -2s; }
        @keyframes orb-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }

        .hero-scanline {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px);
        }

        /* ── CARD (desktop: side-by-side, mobile: stacked) ── */
        .hero-card {
          position: relative;
          z-index: 10;
          width: min(1000px, 100%);
          display: flex;
          flex-direction: row;
          align-items: stretch;
          border-radius: 1.5rem;
          overflow: visible;
          transition: transform 0.1s ease-out;
          transform-style: preserve-3d;
        }

        /* ── LEFT PANEL ── */
        .hero-left {
          flex: 1;
          padding: 3rem 2.5rem 3rem 3rem;
          background: rgba(2,4,8,0.88);
          border: 1px solid rgba(0,245,196,0.15);
          border-radius: 1.5rem 0 0 1.5rem;
          backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
          transform: translateZ(40px);
        }
        .hero-left::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00f5c4, #7b61ff, transparent);
        }
        .hero-left::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #7b61ff, #00f5c4, transparent);
        }

        /* ── RIGHT PANEL ── */
        .hero-right {
          flex: 0 0 320px;
          position: relative;
          background: rgba(0,245,196,0.02);
          border: 1px solid rgba(0,245,196,0.1);
          border-left: none;
          border-radius: 0 1.5rem 1.5rem 0;
          overflow: hidden;
          transform: translateZ(80px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .hero-right::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, transparent 30%, rgba(0,245,196,0.05) 40%, rgba(123,97,255,0.05) 50%, transparent 60%);
          background-size: 200% 200%;
          animation: holo-shimmer 4s ease infinite;
          z-index: 2;
          pointer-events: none;
        }
        @keyframes holo-shimmer {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }

        .corner { position: absolute; width: 16px; height: 16px; z-index: 5; }
        .corner-tl { top: 10px; left: 10px; border-top: 2px solid #00f5c4; border-left: 2px solid #00f5c4; }
        .corner-tr { top: 10px; right: 10px; border-top: 2px solid #00f5c4; border-right: 2px solid #00f5c4; }
        .corner-bl { bottom: 10px; left: 10px; border-bottom: 2px solid #7b61ff; border-left: 2px solid #7b61ff; }
        .corner-br { bottom: 10px; right: 10px; border-bottom: 2px solid #7b61ff; border-right: 2px solid #7b61ff; }

        /* ── BADGE ── */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0,245,196,0.07);
          color: #00f5c4;
          padding: 0.4rem 1rem;
          border-radius: 9999px;
          font-size: 0.68rem;
          font-family: 'Space Mono', monospace;
          letter-spacing: 0.1em;
          border: 1px solid rgba(0,245,196,0.2);
          margin-bottom: 1.25rem;
          width: fit-content;
        }
        .hero-badge .dot {
          width: 6px; height: 6px;
          background: #00f5c4;
          border-radius: 50%;
          animation: ping 1.5s ease-in-out infinite;
          box-shadow: 0 0 6px #00f5c4;
        }
        @keyframes ping {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }

        .hero-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-bottom: 0.4rem;
        }

        .hero-name {
          font-size: clamp(2.8rem, 5vw, 4.5rem);
          font-weight: 800;
          line-height: 0.9;
          color: white;
          margin-bottom: 0.3rem;
          letter-spacing: -0.02em;
        }
        .hero-lastname {
          display: block;
          background: linear-gradient(100deg, #00f5c4 0%, #7b61ff 50%, #ff61d8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }
        .hero-lastname::before,
        .hero-lastname::after {
          content: attr(data-text);
          position: absolute; top: 0; left: 0;
          background: linear-gradient(100deg, #00f5c4 0%, #7b61ff 50%, #ff61d8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0;
          transition: opacity 0.1s;
        }
        .hero-name:hover .hero-lastname::before {
          opacity: 0.7;
          animation: glitch1 0.3s steps(1) infinite;
          clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
        }
        .hero-name:hover .hero-lastname::after {
          opacity: 0.7;
          animation: glitch2 0.3s steps(1) infinite;
          clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
        }
        @keyframes glitch1 {
          0% { transform: translate(-2px, 0); filter: hue-rotate(0deg); }
          50% { transform: translate(2px, 0); filter: hue-rotate(90deg); }
          100% { transform: translate(-1px, 1px); }
        }
        @keyframes glitch2 {
          0% { transform: translate(2px, 0); filter: hue-rotate(180deg); }
          50% { transform: translate(-2px, 1px); }
          100% { transform: translate(0, 0); }
        }

        .hero-desc {
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.8;
          margin: 1.25rem 0;
          padding-left: 0.8rem;
          border-left: 2px solid rgba(0,245,196,0.3);
        }
        .hero-desc .green { color: #00f5c4; }
        .hero-desc .purple { color: #a78bff; }
        .hero-desc .comment { color: rgba(255,255,255,0.25); }

        .hero-stats {
          display: flex;
          gap: 1.25rem;
          margin-bottom: 1.75rem;
          flex-wrap: wrap;
        }
        .hero-stat { display: flex; flex-direction: column; }
        .hero-stat-num { font-size: 1.5rem; font-weight: 800; color: white; line-height: 1; }
        .hero-stat-label {
          font-size: 0.6rem;
          font-family: 'Space Mono', monospace;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 2px;
        }
        .hero-stat-divider { width: 1px; background: rgba(255,255,255,0.1); align-self: stretch; }

        .hero-actions { display: flex; gap: 0.6rem; flex-wrap: wrap; }

        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.65rem 1.25rem;
          border-radius: 0.5rem;
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.25s;
          border: none;
          position: relative;
          overflow: hidden;
          font-family: 'Syne', sans-serif;
          text-decoration: none;
        }
        .btn-primary {
          background: linear-gradient(135deg, #00f5c4, #00c8ff);
          color: #020408;
          box-shadow: 0 0 20px rgba(0,245,196,0.3);
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 35px rgba(0,245,196,0.5); }
        .btn-secondary {
          background: transparent;
          color: white;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .btn-secondary:hover { border-color: rgba(0,245,196,0.4); color: #00f5c4; transform: translateY(-2px); }

        /* ── IMAGE ── */
        .hero-img-wrap {
          width: 100%;
          height: 460px;
          position: relative;
        }
        .hero-photo {
          object-fit: contain;
          object-position: bottom center;
          filter: drop-shadow(0 -10px 40px rgba(0,245,196,0.25)) drop-shadow(0 10px 60px rgba(123,97,255,0.2));
          transition: filter 0.3s;
        }
        .hero-right:hover .hero-photo {
          filter: drop-shadow(0 -10px 60px rgba(0,245,196,0.4)) drop-shadow(0 10px 80px rgba(123,97,255,0.35));
        }

        .img-scanline {
          position: absolute; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0,245,196,0.6), transparent);
          z-index: 3; pointer-events: none;
          animation: scan 3s linear infinite;
        }
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        .data-tag {
          position: absolute;
          font-family: 'Space Mono', monospace;
          font-size: 0.55rem;
          color: rgba(0,245,196,0.7);
          padding: 0.2rem 0.45rem;
          background: rgba(0,0,0,0.7);
          border: 1px solid rgba(0,245,196,0.2);
          border-radius: 0.25rem;
          z-index: 5;
          letter-spacing: 0.05em;
          animation: data-pulse 3s ease-in-out infinite;
        }
        .data-tag-1 { top: 16px; right: 16px; }
        .data-tag-2 { top: 42px; right: 16px; animation-delay: 0.5s; }
        .data-tag-3 { bottom: 70px; left: 12px; animation-delay: 1s; }
        @keyframes data-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        /* ── ANIMATIONS ── */
        .hero-left { animation: slide-in-left 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .hero-right { animation: slide-in-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both; }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .hero-badge { animation: fade-up 0.6s 0.3s both; }
        .hero-eyebrow { animation: fade-up 0.6s 0.4s both; }
        .hero-name { animation: fade-up 0.7s 0.45s both; }
        .hero-desc { animation: fade-up 0.6s 0.55s both; }
        .hero-stats { animation: fade-up 0.6s 0.65s both; }
        .hero-actions { animation: fade-up 0.6s 0.75s both; }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .cursor-glow {
          position: fixed;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,245,196,0.04) 0%, transparent 70%);
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 0;
        }

        /* ══════════════════════════════════════
           MOBILE — full redesign, compact & clean
           ══════════════════════════════════════ */
        @media (max-width: 768px) {
          .hero-root {
            padding: 72px 0 0;
            align-items: flex-start;
            min-height: 100svh;
          }

          /* Disable 3D tilt on mobile (touch doesn't trigger mousemove) */
          .hero-card {
            flex-direction: column;
            width: 100%;
            border-radius: 0;
            transform: none !important;
          }

          /* Image panel — on top, full width, fixed height */
          .hero-right {
            order: 1;
            flex: 0 0 auto;
            width: 100%;
            height: 300px;
            border-radius: 0;
            border: none;
            border-bottom: 1px solid rgba(0,245,196,0.12);
            transform: none;
          }

          .hero-img-wrap {
            height: 300px;
          }

          /* Photo: show from waist up, centered */
          .hero-photo {
            object-position: top center !important;
          }

          /* Smaller data tags */
          .data-tag { font-size: 0.5rem; padding: 0.15rem 0.35rem; }
          .data-tag-1 { top: 10px; right: 10px; }
          .data-tag-2 { top: 30px; right: 10px; }
          .data-tag-3 { bottom: 10px; left: 8px; }

          /* Content panel — below image */
          .hero-left {
            order: 2;
            flex: 1;
            border-radius: 0;
            border: none;
            border-top: none;
            padding: 1.75rem 1.25rem 2.5rem;
            text-align: center;
            align-items: center;
            transform: none;
            background: rgba(2,4,8,0.95);
          }
          .hero-left::before, .hero-left::after { display: none; }

          /* Badge centered */
          .hero-badge {
            margin: 0 auto 1rem;
            font-size: 0.62rem;
            padding: 0.35rem 0.85rem;
          }

          .hero-eyebrow {
            font-size: 0.58rem;
            letter-spacing: 0.2em;
          }

          /* Name — bigger on mobile for impact */
          .hero-name {
            font-size: clamp(3rem, 14vw, 4rem);
            text-align: center;
          }

          /* Code block — left-aligned for readability */
          .hero-desc {
            text-align: left;
            font-size: 0.65rem;
            margin: 1rem 0;
            border-left: 2px solid rgba(0,245,196,0.25);
            padding-left: 0.75rem;
            line-height: 1.9;
            width: 100%;
          }

          /* Stats — spread evenly */
          .hero-stats {
            justify-content: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
            width: 100%;
          }
          .hero-stat-num { font-size: 1.3rem; }

          /* Buttons — full width on very small screens */
          .hero-actions {
            width: 100%;
            justify-content: center;
            gap: 0.5rem;
          }
          .hero-btn {
            flex: 1;
            justify-content: center;
            max-width: 160px;
            font-size: 0.78rem;
            padding: 0.65rem 1rem;
          }

          /* Hide cursor glow on mobile */
          .cursor-glow { display: none; }

          /* Reduce orbs on mobile */
          .orb-1 { width: 200px; height: 200px; }
          .orb-2 { width: 180px; height: 180px; }
          .orb-3 { display: none; }
        }

        /* Small phones */
        @media (max-width: 380px) {
          .hero-right { height: 260px; }
          .hero-img-wrap { height: 260px; }
          .hero-name { font-size: 2.6rem; }
          .hero-left { padding: 1.5rem 1rem 2rem; }
        }
      `}</style>

      <div
        className="cursor-glow"
        style={{ left: mouseRaw.x, top: mouseRaw.y }}
      />

      <section className="hero-root" id="about">
        <canvas ref={particlesRef} className="hero-canvas" />
        <div className="hero-grid" />
        <div className="hero-scanline" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div
          className="hero-card"
          style={!isMobile ? {
            transform: `perspective(1200px) rotateX(${mouse.y * -5}deg) rotateY(${mouse.x * 6}deg)`,
          } : undefined}
        >
          {/* RIGHT — image (order changes on mobile via CSS) */}
          <div className="hero-right">
            <div className="corner corner-tl" />
            <div className="corner corner-tr" />
            <div className="corner corner-bl" />
            <div className="corner corner-br" />
            <div className="data-tag data-tag-1">SYS: ONLINE</div>
            <div className="data-tag data-tag-2">ID: JDV·001</div>
            <div className="data-tag data-tag-3">STATUS: ACTIVE</div>
            <div className="img-scanline" />
            <div className="hero-img-wrap">
              <Image
                src="/photo.png"
                alt="Julius Djami"
                fill
                className="hero-photo"
                priority
              />
            </div>
            <div style={{
              position: "absolute", bottom: 0, left: "50%",
              transform: "translateX(-50%)",
              width: "70%", height: "150px",
              background: "radial-gradient(ellipse at bottom, rgba(0,245,196,0.18) 0%, transparent 70%)",
              zIndex: 0, pointerEvents: "none",
            }} />
          </div>

          {/* LEFT — content */}
          <div className="hero-left">
            <div className="hero-badge">
              <span className="dot" />
              AVAILABLE FOR HIRE
            </div>

            <p className="hero-eyebrow">Portfolio · 2025</p>

            <h1 className="hero-name">
              Julius<br />
              <span className="hero-lastname" data-text="Djami">Djami</span>
            </h1>

            <div className="hero-desc">
              <span className="comment">{`// init developer.profile()`}</span><br />
              <span className="purple">const</span>{" "}role = <span className="green">&quot;Web Developer&quot;</span><br />
              <span className="purple">const</span>{" "}passion = <span className="green">&quot;Clean Code &amp; UI&quot;</span><br />
              <span className="comment">{`// building digital experiences`}</span>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-num">3+</span>
                <span className="hero-stat-label">Years</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-num">20+</span>
                <span className="hero-stat-label">Projects</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-num">15+</span>
                <span className="hero-stat-label">Clients</span>
              </div>
            </div>

            <div className="hero-actions">
              <a href="#projects" className="hero-btn btn-primary">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                Portfolio
              </a>
              <a href="#contact" className="hero-btn btn-secondary">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Contact
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}