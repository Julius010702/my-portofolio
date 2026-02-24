"use client";

import { useEffect, useRef } from "react";

const skills = [
  { name: "TypeScript", level: 85, category: "Language", color: "#3178c6" },
  { name: "JavaScript", level: 90, category: "Language", color: "#f7df1e" },
  { name: "Next.js", level: 82, category: "Framework", color: "#00f5c4" },
  { name: "PHP", level: 78, category: "Language", color: "#7b61ff" },
  { name: "Python", level: 70, category: "Language", color: "#ff61d8" },
  { name: "HTML & CSS", level: 95, category: "Markup", color: "#00c8ff" },
];

const tools = ["Git", "VS Code", "Figma", "MySQL", "PostgreSQL", "Tailwind", "Node.js", "REST API"];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono&display=swap');

        .skills-section {
          position: relative; padding: 6rem 1.5rem;
          background: #020408; overflow: hidden; font-family: 'Syne', sans-serif;
        }
        .skills-divider {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(123,97,255,0.3), rgba(0,245,196,0.3), transparent);
        }
        .skills-bg-text {
          position: absolute; bottom: -20px; right: -10px;
          font-size: clamp(60px, 15vw, 180px); font-weight: 800;
          color: rgba(255,255,255,0.015); pointer-events: none; user-select: none;
        }
        .skills-wrap { max-width: 1100px; margin: 0 auto; position: relative; z-index: 2; }

        .section-label {
          display: inline-flex; align-items: center; gap: 0.6rem;
          font-family: 'Space Mono', monospace; font-size: 0.62rem;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(123,97,255,0.8); margin-bottom: 1.25rem;
        }
        .section-label::before { content: ''; display: block; width: 20px; height: 1px; background: #7b61ff; }

        .skills-title {
          font-size: clamp(2rem, 5vw, 3.8rem); font-weight: 800;
          line-height: 0.95; letter-spacing: -0.03em; color: white;
        }
        .skills-title-accent {
          display: block;
          background: linear-gradient(100deg, #7b61ff, #ff61d8);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .skills-grid {
          display: grid; grid-template-columns: 1.3fr 1fr;
          gap: 3.5rem; margin-top: 3rem; align-items: start;
        }

        /* Skill bars */
        .skill-list { display: flex; flex-direction: column; gap: 1.25rem; }

        .skill-header {
          display: flex; justify-content: space-between;
          align-items: center; margin-bottom: 0.4rem;
        }
        .skill-name-wrap { display: flex; align-items: center; gap: 0.5rem; }
        .skill-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .skill-name { font-size: 0.82rem; font-weight: 700; color: white; }
        .skill-cat {
          font-family: 'Space Mono', monospace; font-size: 0.55rem;
          color: rgba(255,255,255,0.3); letter-spacing: 0.08em;
          text-transform: uppercase; padding: 0.12rem 0.35rem;
          border: 1px solid rgba(255,255,255,0.08); border-radius: 0.2rem;
        }
        .skill-pct { font-family: 'Space Mono', monospace; font-size: 0.65rem; color: rgba(255,255,255,0.35); }

        .skill-track {
          width: 100%; height: 3px;
          background: rgba(255,255,255,0.06); border-radius: 99px; overflow: hidden;
        }
        .skill-fill {
          height: 100%; border-radius: 99px; width: 0%;
          transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        .skill-fill::after {
          content: ''; position: absolute; right: 0; top: -2px;
          width: 7px; height: 7px; border-radius: 50%;
          background: inherit; box-shadow: 0 0 8px currentColor;
        }
        .skill-item.in-view .skill-fill { width: var(--fill-width); }

        /* Tools */
        .tools-block { display: flex; flex-direction: column; gap: 1.25rem; }
        .tools-title {
          font-family: 'Space Mono', monospace; font-size: 0.62rem;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.3); margin-bottom: 0.5rem;
        }
        .tools-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .tool-tag {
          padding: 0.35rem 0.8rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 0.35rem;
          font-family: 'Space Mono', monospace; font-size: 0.65rem;
          color: rgba(255,255,255,0.45); transition: all 0.2s; cursor: default;
        }
        .tool-tag:hover {
          background: rgba(123,97,255,0.08); border-color: rgba(123,97,255,0.25);
          color: rgba(255,255,255,0.9); transform: translateY(-2px);
        }

        /* XP card */
        .xp-card {
          padding: 1.25rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.75rem; position: relative; overflow: hidden;
        }
        .xp-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, #7b61ff, #ff61d8);
        }
        .xp-label { font-family: 'Space Mono', monospace; font-size: 0.62rem; color: rgba(255,255,255,0.35); letter-spacing: 0.1em; }
        .xp-val { font-size: 1.7rem; font-weight: 800; color: white; line-height: 1; margin: 0.4rem 0; }
        .xp-val span { font-size: 0.65rem; font-family: 'Space Mono', monospace; color: rgba(123,97,255,0.7); margin-left: 4px; vertical-align: middle; }
        .xp-track { width: 100%; height: 3px; background: rgba(255,255,255,0.05); border-radius: 99px; overflow: hidden; margin-top: 0.75rem; }
        .xp-fill {
          height: 100%; width: 72%;
          background: linear-gradient(90deg, #7b61ff, #ff61d8); border-radius: 99px;
          animation: xp-grow 1.5s 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes xp-grow { from { width: 0%; } to { width: 72%; } }
        .xp-labels { display: flex; justify-content: space-between; margin-top: 0.4rem; }

        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.delay-1 { transition-delay: 0.1s; }
        .reveal.delay-2 { transition-delay: 0.2s; }
        .reveal.delay-3 { transition-delay: 0.3s; }
        .reveal.delay-4 { transition-delay: 0.4s; }
        .reveal.delay-5 { transition-delay: 0.5s; }
        .reveal.delay-6 { transition-delay: 0.6s; }
        .in-view.reveal { opacity: 1; transform: translateY(0); }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .skills-section { padding: 4rem 1.25rem; }
          .skills-grid { grid-template-columns: 1fr; gap: 2.5rem; margin-top: 2rem; }
          .skills-title { font-size: clamp(2rem, 10vw, 2.8rem); }
          .skill-name { font-size: 0.78rem; }
          .tool-tag { font-size: 0.62rem; padding: 0.3rem 0.65rem; }
        }
      `}</style>

      <section className="skills-section" ref={sectionRef} id="skills">
        <div className="skills-divider" />
        <div className="skills-bg-text">SKILLS</div>

        <div className="skills-wrap">
          <p className="section-label reveal">02 — Expertise</p>
          <h2 className="skills-title reveal delay-1">
            Tech I<br />
            <span className="skills-title-accent">Master.</span>
          </h2>

          <div className="skills-grid">
            <div className="skill-list">
              {skills.map((s, i) => (
                <div
                  key={s.name}
                  className={`skill-item reveal delay-${i + 1}`}
                  style={{ "--fill-width": `${s.level}%` } as React.CSSProperties}
                >
                  <div className="skill-header">
                    <div className="skill-name-wrap">
                      <span className="skill-dot" style={{ background: s.color }} />
                      <span className="skill-name">{s.name}</span>
                      <span className="skill-cat">{s.category}</span>
                    </div>
                    <span className="skill-pct">{s.level}%</span>
                  </div>
                  <div className="skill-track">
                    <div className="skill-fill" style={{ background: `linear-gradient(90deg, ${s.color}88, ${s.color})` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="tools-block">
              <div className="reveal delay-2">
                <p className="tools-title">Tools & Ecosystem</p>
                <div className="tools-tags">
                  {tools.map((t) => <span key={t} className="tool-tag">{t}</span>)}
                </div>
              </div>

              <div className="xp-card reveal delay-3">
                <div className="xp-label">EXPERIENCE LEVEL</div>
                <div className="xp-val">3+<span>YRS</span></div>
                <div className="xp-track"><div className="xp-fill" /></div>
                <div className="xp-labels">
                  <span className="xp-label">Junior</span>
                  <span className="xp-label" style={{ color: "rgba(123,97,255,0.6)" }}>Mid-Level ●</span>
                  <span className="xp-label">Senior</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}