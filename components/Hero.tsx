"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [mouseRaw, setMouseRaw] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

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

  // Per-card tilt on hover for extreme 3D
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x, y });
  };

  const handleCardLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  };

  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const count = window.innerWidth <= 768 ? 40 : 100;
    type Particle = {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string; life: number; maxLife: number;
      pulse: number;
    };
    const particles: Particle[] = [];
    const colors = ["#00f5c4", "#7b61ff", "#ff61d8", "#00c8ff", "#fff"];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.5 + 0.3,
        opacity: Math.random() * 0.7 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random() * 200,
        maxLife: 200 + Math.random() * 150,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.pulse += 0.02;
        if (p.life > p.maxLife) {
          p.life = 0;
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
        }
        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * p.opacity;
        const pulseSz = p.size * (1 + Math.sin(p.pulse) * 0.3);
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseSz, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,245,196,${(1 - dist / 120) * 0.07})`;
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

  const globalTiltX = isMobile ? 0 : mouse.y * -4;
  const globalTiltY = isMobile ? 0 : mouse.x * 5;
  const cardTiltX = isHovering ? tilt.y * -12 : globalTiltX;
  const cardTiltY = isHovering ? tilt.x * 14 : globalTiltY;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }

        :root {
          --cyan: #00f5c4;
          --purple: #7b61ff;
          --pink: #ff61d8;
          --blue: #00c8ff;
          --bg: #020408;
          --card-depth: 60px;
        }

        .hero-root {
          font-family: 'Syne', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          overflow: hidden;
          position: relative;
          padding: 90px 1.5rem 2rem;
          perspective: 1400px;
        }

        /* ── CANVAS ── */
        .hero-canvas {
          position: absolute; inset: 0;
          pointer-events: none; z-index: 1;
        }

        /* ── GRID ── */
        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,245,196,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,196,0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          z-index: 0;
          transform: perspective(800px) rotateX(10deg) scale(1.2);
          transform-origin: center bottom;
          mask-image: linear-gradient(to top, rgba(0,0,0,0.8), transparent 80%);
        }

        /* ── ORBS ── */
        .orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none; z-index: 0;
        }
        .orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(123,97,255,0.25), transparent 70%);
          top: -150px; left: -150px;
          animation: orb-float 10s ease-in-out infinite;
        }
        .orb-2 {
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(0,245,196,0.2), transparent 70%);
          bottom: -120px; right: -80px;
          animation: orb-float 8s ease-in-out infinite reverse;
        }
        .orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(255,97,216,0.15), transparent 70%);
          top: 35%; right: 25%;
          animation: orb-float 12s ease-in-out infinite;
          animation-delay: -5s;
        }
        @keyframes orb-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-40px) scale(1.08); }
        }

        /* ── SCANLINE ── */
        .hero-scanline {
          position: absolute; inset: 0; pointer-events: none; z-index: 2;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px);
        }

        /* ── SCENE WRAPPER (3D stage) ── */
        .hero-scene {
          position: relative; z-index: 10;
          width: min(1060px, 100%);
          transform-style: preserve-3d;
          transition: transform 0.08s linear;
        }

        /* ── CARD ── */
        .hero-card {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          border-radius: 1.75rem;
          overflow: visible;
          transform-style: preserve-3d;
          position: relative;
        }

        /* ── SHADOW LAYER (fake 3D ground shadow) ── */
        .hero-shadow {
          position: absolute;
          bottom: -40px; left: 5%; right: 5%;
          height: 60px;
          background: radial-gradient(ellipse, rgba(0,245,196,0.18) 0%, rgba(123,97,255,0.12) 40%, transparent 70%);
          filter: blur(20px);
          transform: translateZ(-80px) scaleY(0.4);
          pointer-events: none;
          border-radius: 50%;
          transition: opacity 0.3s;
        }

        /* ── LEFT PANEL ── */
        .hero-left {
          flex: 1;
          padding: 3rem 2.5rem 3rem 3.5rem;
          background: rgba(2,4,8,0.9);
          border: 1px solid rgba(0,245,196,0.18);
          border-right: none;
          border-radius: 1.75rem 0 0 1.75rem;
          backdrop-filter: blur(24px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
          transform: translateZ(var(--card-depth));
          transform-style: preserve-3d;
        }

        /* Top accent line */
        .hero-left::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--cyan), var(--purple), transparent);
        }
        /* Bottom accent */
        .hero-left::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--purple), var(--cyan), transparent);
        }

        /* Floating inner glow */
        .left-glow {
          position: absolute; top: -80px; left: -80px;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(0,245,196,0.07), transparent 70%);
          border-radius: 50%; pointer-events: none;
          animation: glow-move 8s ease-in-out infinite;
        }
        @keyframes glow-move {
          0%, 100% { transform: translate(0,0); }
          33% { transform: translate(60px, 40px); }
          66% { transform: translate(-20px, 80px); }
        }

        /* ── RIGHT PANEL ── */
        .hero-right {
          flex: 0 0 340px;
          position: relative;
          background: linear-gradient(160deg, rgba(0,245,196,0.04), rgba(123,97,255,0.06));
          border: 1px solid rgba(0,245,196,0.14);
          border-left: none;
          border-radius: 0 1.75rem 1.75rem 0;
          overflow: hidden;
          transform: translateZ(calc(var(--card-depth) * 1.6));
          transform-style: preserve-3d;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        /* Holographic shimmer */
        .hero-right::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(130deg,
            transparent 20%,
            rgba(0,245,196,0.06) 35%,
            rgba(123,97,255,0.08) 50%,
            rgba(255,97,216,0.05) 65%,
            transparent 80%
          );
          background-size: 200% 200%;
          animation: holo-shimmer 5s ease infinite;
          z-index: 2; pointer-events: none;
        }
        /* Right edge glow */
        .hero-right::after {
          content: '';
          position: absolute; top: 0; right: 0; bottom: 0; width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(0,245,196,0.4), transparent);
        }
        @keyframes holo-shimmer {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }

        /* ── FLOATING PANELS (3D depth elements) ── */
        .float-panel {
          position: absolute;
          border: 1px solid rgba(0,245,196,0.15);
          background: rgba(2,4,8,0.85);
          border-radius: 0.75rem;
          padding: 0.5rem 0.75rem;
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          color: rgba(0,245,196,0.8);
          backdrop-filter: blur(10px);
          z-index: 20;
          transform-style: preserve-3d;
          letter-spacing: 0.05em;
          pointer-events: none;
        }
        .float-panel-1 {
          top: -18px; left: 40px;
          transform: translateZ(90px) rotateX(-8deg);
          animation: float-bob 4s ease-in-out infinite;
          border-color: rgba(0,245,196,0.3);
        }
        .float-panel-2 {
          bottom: -16px; right: 60px;
          transform: translateZ(70px) rotateX(6deg);
          animation: float-bob 5s ease-in-out infinite reverse;
          border-color: rgba(123,97,255,0.35);
          color: rgba(123,97,255,0.9);
        }
        .float-panel-3 {
          top: 40%; left: -20px;
          transform: translateZ(110px) rotateY(10deg);
          animation: float-bob 6s ease-in-out infinite;
          border-color: rgba(255,97,216,0.3);
          color: rgba(255,97,216,0.8);
          writing-mode: vertical-rl;
          padding: 0.75rem 0.5rem;
          font-size: 0.52rem;
          letter-spacing: 0.15em;
        }
        @keyframes float-bob {
          0%, 100% { transform: translateZ(90px) rotateX(-8deg) translateY(0); }
          50% { transform: translateZ(90px) rotateX(-8deg) translateY(-6px); }
        }

        /* ── CORNERS ── */
        .corner { position: absolute; width: 18px; height: 18px; z-index: 5; }
        .corner-tl { top: 10px; left: 10px; border-top: 2px solid var(--cyan); border-left: 2px solid var(--cyan); }
        .corner-tr { top: 10px; right: 10px; border-top: 2px solid var(--cyan); border-right: 2px solid var(--cyan); }
        .corner-bl { bottom: 10px; left: 10px; border-bottom: 2px solid var(--purple); border-left: 2px solid var(--purple); }
        .corner-br { bottom: 10px; right: 10px; border-bottom: 2px solid var(--purple); border-right: 2px solid var(--purple); }

        /* ── DATA TAGS ── */
        .data-tag {
          position: absolute;
          font-family: 'Space Mono', monospace;
          font-size: 0.55rem;
          color: rgba(0,245,196,0.8);
          padding: 0.22rem 0.5rem;
          background: rgba(0,0,0,0.75);
          border: 1px solid rgba(0,245,196,0.25);
          border-radius: 0.3rem;
          z-index: 5;
          letter-spacing: 0.06em;
          animation: data-pulse 3s ease-in-out infinite;
          transform: translateZ(20px);
        }
        .data-tag-1 { top: 14px; right: 14px; }
        .data-tag-2 { top: 38px; right: 14px; animation-delay: 0.6s; }
        .data-tag-3 { bottom: 72px; left: 10px; animation-delay: 1.2s; color: rgba(123,97,255,0.9); border-color: rgba(123,97,255,0.25); }
        @keyframes data-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        /* ── BADGE ── */
        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(0,245,196,0.07);
          color: var(--cyan);
          padding: 0.4rem 1rem;
          border-radius: 9999px;
          font-size: 0.66rem;
          font-family: 'Space Mono', monospace;
          letter-spacing: 0.1em;
          border: 1px solid rgba(0,245,196,0.22);
          margin-bottom: 1.25rem;
          width: fit-content;
          transform: translateZ(20px);
          position: relative;
        }
        .badge-dot {
          width: 6px; height: 6px;
          background: var(--cyan);
          border-radius: 50%;
          animation: ping 1.5s ease-in-out infinite;
          box-shadow: 0 0 8px var(--cyan);
        }
        @keyframes ping {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
        }

        .hero-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-bottom: 0.35rem;
          transform: translateZ(10px);
        }

        /* ── NAME ── */
        .hero-name {
          font-size: clamp(2.8rem, 4.5vw, 4.8rem);
          font-weight: 800;
          line-height: 0.88;
          color: white;
          margin-bottom: 0.2rem;
          letter-spacing: -0.03em;
          transform: translateZ(30px);
          transform-style: preserve-3d;
        }
        .hero-lastname {
          display: block;
          background: linear-gradient(110deg, var(--cyan) 0%, var(--purple) 50%, var(--pink) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        /* Glitch on hover */
        .hero-lastname::before,
        .hero-lastname::after {
          content: attr(data-text);
          position: absolute; top: 0; left: 0;
          background: linear-gradient(110deg, var(--cyan) 0%, var(--purple) 50%, var(--pink) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0; transition: opacity 0.1s;
        }
        .hero-scene:hover .hero-lastname::before {
          opacity: 0.8;
          animation: glitch1 0.4s steps(1) infinite;
          clip-path: polygon(0 15%, 100% 15%, 100% 35%, 0 35%);
        }
        .hero-scene:hover .hero-lastname::after {
          opacity: 0.8;
          animation: glitch2 0.4s steps(1) infinite;
          clip-path: polygon(0 65%, 100% 65%, 100% 85%, 0 85%);
        }
        @keyframes glitch1 {
          0% { transform: translate(-3px, 0); filter: hue-rotate(0deg); }
          50% { transform: translate(3px, 0); filter: hue-rotate(90deg); }
          100% { transform: translate(-1px, 1px); }
        }
        @keyframes glitch2 {
          0% { transform: translate(3px, 0); filter: hue-rotate(180deg); }
          50% { transform: translate(-3px, 1px); }
          100% { transform: translate(0, 0); }
        }

        /* ── CODE BLOCK ── */
        .hero-desc {
          font-family: 'Space Mono', monospace;
          font-size: 0.68rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.9;
          margin: 1.25rem 0;
          padding: 0.75rem 0.85rem;
          border-left: 2px solid rgba(0,245,196,0.35);
          background: rgba(0,245,196,0.025);
          border-radius: 0 0.5rem 0.5rem 0;
          transform: translateZ(15px);
          position: relative;
        }
        .hero-desc .c-green { color: var(--cyan); }
        .hero-desc .c-purple { color: #a78bff; }
        .hero-desc .c-comment { color: rgba(255,255,255,0.2); }

        /* ── STATS ── */
        .hero-stats {
          display: flex; gap: 1.5rem;
          margin-bottom: 1.75rem;
          flex-wrap: wrap;
          transform: translateZ(20px);
        }
        .hero-stat { display: flex; flex-direction: column; }
        .hero-stat-num {
          font-size: 1.6rem; font-weight: 800; color: white; line-height: 1;
          text-shadow: 0 0 20px rgba(0,245,196,0.3);
        }
        .hero-stat-label {
          font-size: 0.58rem; font-family: 'Space Mono', monospace;
          color: rgba(255,255,255,0.3); text-transform: uppercase;
          letter-spacing: 0.12em; margin-top: 3px;
        }
        .hero-stat-divider { width: 1px; background: rgba(255,255,255,0.08); align-self: stretch; }

        /* ── ACTIONS ── */
        .hero-actions {
          display: flex; gap: 0.7rem; flex-wrap: wrap;
          transform: translateZ(25px);
        }
        .hero-btn {
          display: inline-flex; align-items: center; gap: 0.45rem;
          padding: 0.7rem 1.4rem;
          border-radius: 0.6rem;
          font-weight: 700; font-size: 0.82rem;
          cursor: pointer; transition: all 0.25s;
          border: none; position: relative; overflow: hidden;
          font-family: 'Syne', sans-serif; text-decoration: none;
          transform-style: preserve-3d;
        }
        .btn-primary {
          background: linear-gradient(135deg, var(--cyan), var(--blue));
          color: var(--bg);
          box-shadow: 0 0 24px rgba(0,245,196,0.35), 0 8px 20px rgba(0,0,0,0.4);
        }
        .btn-primary::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
          opacity: 0; transition: opacity 0.2s;
        }
        .btn-primary:hover { transform: translateY(-3px) translateZ(5px); box-shadow: 0 0 40px rgba(0,245,196,0.5), 0 12px 30px rgba(0,0,0,0.5); }
        .btn-primary:hover::before { opacity: 1; }
        .btn-secondary {
          background: rgba(255,255,255,0.04);
          color: white;
          border: 1px solid rgba(255,255,255,0.13);
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .btn-secondary:hover {
          border-color: rgba(0,245,196,0.45); color: var(--cyan);
          transform: translateY(-3px);
          box-shadow: 0 0 20px rgba(0,245,196,0.15), 0 8px 20px rgba(0,0,0,0.4);
        }

        /* ── IMAGE ── */
        .hero-img-wrap {
          width: 100%; height: 480px; position: relative;
          transform: translateZ(30px);
        }
        .hero-photo {
          object-fit: contain;
          object-position: bottom center;
          filter: drop-shadow(0 -15px 50px rgba(0,245,196,0.28)) drop-shadow(0 15px 70px rgba(123,97,255,0.22));
          transition: filter 0.4s;
        }
        .hero-right:hover .hero-photo {
          filter: drop-shadow(0 -15px 70px rgba(0,245,196,0.45)) drop-shadow(0 15px 90px rgba(123,97,255,0.4));
        }

        /* Scanline on image */
        .img-scanline {
          position: absolute; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0,245,196,0.7), transparent);
          z-index: 3; pointer-events: none;
          animation: scan 3.5s linear infinite;
        }
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        /* Image ground glow */
        .img-ground {
          position: absolute; bottom: 0; left: "50%";
          transform: translateX(-50%);
          width: 75%; height: 160px;
          background: radial-gradient(ellipse at bottom, rgba(0,245,196,0.2) 0%, transparent 70%);
          z-index: 0; pointer-events: none;
        }

        /* ── SCROLL PARALLAX INDICATOR ── */
        .scroll-indicator {
          position: absolute; bottom: -50px; left: 50%;
          transform: translateX(-50%) translateZ(40px);
          display: flex; flex-direction: column; align-items: center; gap: 0.3rem;
          font-family: 'Space Mono', monospace;
          font-size: 0.5rem; color: rgba(255,255,255,0.2);
          letter-spacing: 0.2em; text-transform: uppercase;
          animation: scroll-hint 2s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes scroll-hint {
          0%, 100% { opacity: 0.3; transform: translateX(-50%) translateY(0); }
          50% { opacity: 0.7; transform: translateX(-50%) translateY(5px); }
        }
        .scroll-arrow {
          width: 20px; height: 20px;
          border-right: 1px solid rgba(0,245,196,0.4);
          border-bottom: 1px solid rgba(0,245,196,0.4);
          transform: rotate(45deg);
        }

        /* ── CURSOR GLOW ── */
        .cursor-glow {
          position: fixed; width: 350px; height: 350px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,245,196,0.05) 0%, transparent 70%);
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 0; transition: none;
        }

        /* ── ENTRANCE ANIMATIONS ── */
        .hero-left { animation: slide-in-left 0.9s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .hero-right { animation: slide-in-right 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both; }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-40px) translateZ(var(--card-depth)); }
          to { opacity: 1; transform: translateX(0) translateZ(var(--card-depth)); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(40px) translateZ(calc(var(--card-depth) * 1.6)); }
          to { opacity: 1; transform: translateX(0) translateZ(calc(var(--card-depth) * 1.6)); }
        }
        .hero-badge { animation: fade-up 0.6s 0.3s both; }
        .hero-eyebrow { animation: fade-up 0.6s 0.4s both; }
        .hero-name { animation: fade-up 0.7s 0.45s both; }
        .hero-desc { animation: fade-up 0.6s 0.55s both; }
        .hero-stats { animation: fade-up 0.6s 0.65s both; }
        .hero-actions { animation: fade-up 0.6s 0.75s both; }
        .float-panel-1 { animation: float-in 0.8s 0.9s both, float-bob 4s 1.7s ease-in-out infinite; }
        .float-panel-2 { animation: float-in 0.8s 1.1s both, float-bob 5s 1.9s ease-in-out infinite reverse; }
        .float-panel-3 { animation: float-in 0.8s 1.0s both, float-bob 6s 1.8s ease-in-out infinite; }
        @keyframes float-in {
          from { opacity: 0; transform: translateZ(90px) translateY(10px); }
          to { opacity: 1; transform: translateZ(90px) translateY(0); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ═══════════════════════
           MOBILE
        ═══════════════════════ */
        @media (max-width: 768px) {
          .hero-root {
            padding: 70px 0 0;
            align-items: flex-start;
            min-height: 100svh;
            perspective: none;
          }
          .hero-scene {
            width: 100%;
            transform: none !important;
          }
          .hero-card {
            flex-direction: column;
            border-radius: 0;
          }

          /* Image panel on top */
          .hero-right {
            order: 1;
            flex: 0 0 auto;
            width: 100%;
            height: 290px;
            border-radius: 0;
            border: none;
            border-bottom: 1px solid rgba(0,245,196,0.12);
            transform: none !important;
          }
          .hero-img-wrap { height: 290px; transform: none; }
          .hero-photo { object-position: top center !important; }

          /* Floating panels hidden on mobile (3D doesn't work well) */
          .float-panel { display: none; }

          /* Smaller data tags */
          .data-tag { font-size: 0.5rem; padding: 0.15rem 0.4rem; transform: none; }
          .data-tag-1 { top: 10px; right: 10px; }
          .data-tag-2 { top: 30px; right: 10px; }
          .data-tag-3 { bottom: 8px; left: 8px; }

          /* Content panel */
          .hero-left {
            order: 2; flex: 1;
            border-radius: 0; border: none;
            padding: 1.75rem 1.25rem 2.5rem;
            text-align: center; align-items: center;
            transform: none !important;
            background: rgba(2,4,8,0.97);
          }
          .hero-left::before, .hero-left::after { display: none; }

          .hero-badge { transform: none; margin: 0 auto 1rem; font-size: 0.6rem; }
          .hero-eyebrow { font-size: 0.56rem; transform: none; }
          .hero-name { font-size: clamp(2.8rem, 13vw, 3.8rem); text-align: center; transform: none; }
          .hero-desc {
            text-align: left; font-size: 0.62rem;
            margin: 1rem 0; width: 100%; transform: none;
          }
          .hero-stats { justify-content: center; gap: 1.1rem; width: 100%; transform: none; }
          .hero-stat-num { font-size: 1.3rem; }
          .hero-actions { width: 100%; justify-content: center; transform: none; }
          .hero-btn { flex: 1; justify-content: center; max-width: 155px; font-size: 0.76rem; }

          /* Reduce orbs */
          .orb-1 { width: 220px; height: 220px; }
          .orb-2 { width: 200px; height: 200px; }
          .orb-3 { display: none; }

          .cursor-glow { display: none; }
          .scroll-indicator { display: none; }
          .hero-shadow { display: none; }
        }

        @media (max-width: 380px) {
          .hero-right { height: 255px; }
          .hero-img-wrap { height: 255px; }
          .hero-name { font-size: 2.5rem; }
          .hero-left { padding: 1.4rem 1rem 2rem; }
        }
      `}</style>

      {/* Cursor glow */}
      <div className="cursor-glow" style={{ left: mouseRaw.x, top: mouseRaw.y }} />

      <section className="hero-root" id="about">
        <canvas ref={particlesRef} className="hero-canvas" />
        <div className="hero-grid" />
        <div className="hero-scanline" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {/* 3D scene wrapper */}
        <div
          className="hero-scene"
          ref={cardRef}
          style={!isMobile ? {
            transform: `perspective(1400px) rotateX(${cardTiltX}deg) rotateY(${cardTiltY}deg)`,
            transition: isHovering ? "transform 0.06s linear" : "transform 0.25s ease-out",
          } : undefined}
          onMouseMove={handleCardMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={handleCardLeave}
        >
          {/* Ground shadow */}
          <div className="hero-shadow" />

          {/* Floating 3D panels */}
          <div className="float-panel float-panel-1">◈ STACK: NEXT.JS / TS</div>
          <div className="float-panel float-panel-2">▲ DEPLOY: VERCEL</div>
          <div className="float-panel float-panel-3">WEB DEV · 2025</div>

          <div className="hero-card">
            {/* RIGHT — image */}
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
              <div className="img-ground" />
            </div>

            {/* LEFT — content */}
            <div className="hero-left">
              <div className="left-glow" />

              <div className="hero-badge">
                <span className="badge-dot" />
                AVAILABLE FOR HIRE
              </div>

              <p className="hero-eyebrow">Portfolio · 2025</p>

              <h1 className="hero-name">
                Julius<br />
                <span className="hero-lastname" data-text="Djami">Djami</span>
              </h1>

              <div className="hero-desc">
                <span className="c-comment">{`// init developer.profile()`}</span><br />
                <span className="c-purple">const</span>{" "}role = <span className="c-green">&quot;Web Developer&quot;</span><br />
                <span className="c-purple">const</span>{" "}passion = <span className="c-green">&quot;Clean Code &amp; UI&quot;</span><br />
                <span className="c-comment">{`// building digital experiences`}</span>
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
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  Portfolio
                </a>
                <a href="#contact" className="hero-btn btn-secondary">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Contact
                </a>
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="scroll-indicator">
            <span>scroll</span>
            <div className="scroll-arrow" />
          </div>
        </div>
      </section>
    </>
  );
}