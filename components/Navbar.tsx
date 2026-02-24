"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["about", "skills", "projects", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    if (menuOpen) {
      const close = () => setMenuOpen(false);
      window.addEventListener("scroll", close, { once: true });
      return () => window.removeEventListener("scroll", close);
    }
  }, [menuOpen]);

  const links = ["About", "Skills", "Projects", "Contact"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Mono&display=swap');

        .nav-root {
          position: fixed;
          top: 0; width: 100%;
          z-index: 100;
          font-family: 'Syne', sans-serif;
        }

        .nav-bg {
          position: absolute; inset: 0;
          background: rgba(2,4,8,0);
          backdrop-filter: blur(0px);
          border-bottom: 1px solid transparent;
          transition: all 0.4s ease;
        }
        .nav-bg.scrolled {
          background: rgba(2,4,8,0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0,245,196,0.1);
          box-shadow: 0 4px 30px rgba(0,0,0,0.4);
        }

        .nav-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        .nav-logo {
          font-size: 1.1rem;
          font-weight: 800;
          color: white;
          text-decoration: none;
          letter-spacing: -0.03em;
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .nav-logo-prefix {
          font-family: 'Space Mono', monospace;
          color: #00f5c4;
          font-size: 0.85rem;
          opacity: 0.7;
        }
        .nav-logo span { color: #00f5c4; }

        /* Desktop links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 0.1rem;
          position: relative;
          z-index: 2;
        }
        .nav-link {
          position: relative;
          padding: 0.4rem 0.8rem;
          font-size: 0.65rem;
          font-family: 'Space Mono', monospace;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.2s;
          border-radius: 0.3rem;
        }
        .nav-link:hover { color: rgba(255,255,255,0.9); }
        .nav-link.active { color: #00f5c4; }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 20%; right: 20%;
          height: 1px;
          background: #00f5c4;
          box-shadow: 0 0 6px #00f5c4;
        }

        .nav-hire {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.38rem 0.9rem;
          background: rgba(0,245,196,0.08);
          border: 1px solid rgba(0,245,196,0.25);
          border-radius: 0.4rem;
          color: #00f5c4;
          font-size: 0.65rem;
          font-family: 'Space Mono', monospace;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          position: relative;
          z-index: 2;
          margin-left: 0.6rem;
        }
        .nav-hire:hover { background: rgba(0,245,196,0.15); box-shadow: 0 0 16px rgba(0,245,196,0.2); }
        .nav-hire .pulse {
          width: 5px; height: 5px;
          background: #00f5c4;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
          box-shadow: 0 0 5px #00f5c4;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }

        /* Hamburger */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 6px;
          position: relative;
          z-index: 102;
          background: none;
          border: none;
        }
        .nav-hamburger span {
          display: block;
          width: 22px; height: 1.5px;
          background: #00f5c4;
          transition: all 0.3s;
          transform-origin: center;
        }
        .nav-hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(4.5px, 4.5px); }
        .nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nav-hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(4.5px, -4.5px); }

        /* Mobile drawer */
        .nav-mobile {
          position: fixed;
          top: 60px; left: 0; right: 0; bottom: 0;
          background: rgba(2,4,8,0.98);
          backdrop-filter: blur(24px);
          display: flex;
          flex-direction: column;
          padding: 2rem 1.5rem;
          gap: 0.4rem;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 101;
          border-top: 1px solid rgba(0,245,196,0.1);
        }
        .nav-mobile.open { transform: translateX(0); }

        .nav-mobile-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          font-family: 'Space Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border-radius: 0.5rem;
          transition: all 0.25s;
          border: 1px solid transparent;
        }
        .nav-mobile-link:hover,
        .nav-mobile-link.active {
          color: #00f5c4;
          background: rgba(0,245,196,0.05);
          border-color: rgba(0,245,196,0.15);
        }
        .nav-mobile-num { font-size: 0.58rem; color: rgba(0,245,196,0.35); }

        .nav-mobile-hire {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.9rem;
          background: rgba(0,245,196,0.08);
          border: 1px solid rgba(0,245,196,0.25);
          border-radius: 0.5rem;
          color: #00f5c4;
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .nav-links, .nav-hire { display: none; }
          .nav-hamburger { display: flex; }
          .nav-inner { padding: 0 1rem; height: 56px; }
        }
      `}</style>

      <nav className="nav-root">
        <div className={`nav-bg${scrolled ? " scrolled" : ""}`} />
        <div className="nav-inner">
          <a href="#about" className="nav-logo">
            <span className="nav-logo-prefix">&gt;</span>
            Julius<span>Djami</span>
          </a>

          <div className="nav-links">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className={`nav-link${active === l.toLowerCase() ? " active" : ""}`}
              >
                {l}
              </a>
            ))}
          </div>

          <a href="#contact" className="nav-hire">
            <span className="pulse" />
            HIRE ME
          </a>

          <button
            className={`nav-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <div className={`nav-mobile${menuOpen ? " open" : ""}`}>
        {links.map((l, i) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className={`nav-mobile-link${active === l.toLowerCase() ? " active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <span className="nav-mobile-num">0{i + 1}</span>
            {l}
          </a>
        ))}
        <a href="#contact" className="nav-mobile-hire" onClick={() => setMenuOpen(false)}>
          <span style={{ width: 6, height: 6, background: "#00f5c4", borderRadius: "50%", boxShadow: "0 0 6px #00f5c4" }} />
          HIRE ME
        </a>
      </div>
    </>
  );
}