"use client";

import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const email = "juliusbungadjami@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono&display=swap');

        .contact-section {
          position: relative; padding: 6rem 1.5rem 5rem;
          background: #020408; overflow: hidden; font-family: 'Syne', sans-serif;
        }
        .contact-divider {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,245,196,0.3), rgba(123,97,255,0.2), transparent);
        }
        .contact-glow {
          position: absolute; bottom: -100px; left: 50%; transform: translateX(-50%);
          width: 500px; height: 250px;
          background: radial-gradient(ellipse, rgba(0,245,196,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .contact-bg-text {
          position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%);
          font-size: clamp(60px, 18vw, 200px); font-weight: 800;
          color: rgba(255,255,255,0.012); letter-spacing: -0.05em;
          pointer-events: none; user-select: none; white-space: nowrap;
        }
        .contact-wrap {
          max-width: 860px; margin: 0 auto;
          position: relative; z-index: 2; text-align: center;
        }

        .section-label {
          display: inline-flex; align-items: center; gap: 0.6rem;
          font-family: 'Space Mono', monospace; font-size: 0.62rem;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(0,245,196,0.7); margin-bottom: 1.25rem; justify-content: center;
        }
        .section-label::before, .section-label::after {
          content: ''; display: block; width: 20px; height: 1px; background: #00f5c4;
        }

        .contact-title {
          font-size: clamp(2.5rem, 8vw, 5.5rem); font-weight: 800;
          line-height: 0.9; letter-spacing: -0.04em; color: white; margin-bottom: 1.25rem;
        }
        .contact-title-accent {
          display: block;
          background: linear-gradient(100deg, #00f5c4, #7b61ff, #ff61d8);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .contact-sub {
          font-size: 0.95rem; color: rgba(255,255,255,0.38);
          max-width: 460px; margin: 0 auto 2.5rem; line-height: 1.75;
        }

        /* Email card */
        .contact-email-card {
          display: inline-flex; align-items: center; gap: 0.875rem;
          padding: 1rem 1.5rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(0,245,196,0.15);
          border-radius: 0.75rem; margin-bottom: 2rem;
          position: relative; overflow: hidden; transition: all 0.3s;
          max-width: 100%;
        }
        .contact-email-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, #00f5c4, transparent);
        }
        .contact-email-card:hover { border-color: rgba(0,245,196,0.3); background: rgba(0,245,196,0.03); }

        .email-icon {
          width: 34px; height: 34px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,245,196,0.08); border-radius: 0.35rem; color: #00f5c4;
        }
        .email-text { text-align: left; min-width: 0; }
        .email-label {
          font-family: 'Space Mono', monospace; font-size: 0.58rem;
          color: rgba(255,255,255,0.3); letter-spacing: 0.15em;
          text-transform: uppercase; display: block; margin-bottom: 0.15rem;
        }
        .email-addr {
          font-size: 0.9rem; font-weight: 700; color: white;
          letter-spacing: -0.01em; word-break: break-all;
        }

        .copy-btn {
          display: flex; align-items: center; gap: 0.35rem;
          padding: 0.35rem 0.7rem; flex-shrink: 0;
          background: transparent; border: 1px solid rgba(0,245,196,0.2);
          border-radius: 0.3rem; color: #00f5c4;
          font-family: 'Space Mono', monospace; font-size: 0.58rem;
          letter-spacing: 0.1em; cursor: pointer; transition: all 0.2s;
        }
        .copy-btn:hover { background: rgba(0,245,196,0.08); box-shadow: 0 0 10px rgba(0,245,196,0.2); }
        .copy-btn.copied { color: #fff; background: rgba(0,245,196,0.15); border-color: rgba(0,245,196,0.4); }

        /* CTA buttons */
        .contact-actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
        .contact-btn {
          display: inline-flex; align-items: center; gap: 0.45rem;
          padding: 0.75rem 1.5rem; border-radius: 0.5rem;
          font-weight: 700; font-size: 0.82rem; cursor: pointer;
          transition: all 0.25s; font-family: 'Syne', sans-serif;
          text-decoration: none; letter-spacing: 0.01em;
        }
        .btn-email {
          background: linear-gradient(135deg, #00f5c4, #00c8ff); color: #020408;
          border: none; box-shadow: 0 0 20px rgba(0,245,196,0.25);
        }
        .btn-email:hover { transform: translateY(-2px); box-shadow: 0 0 35px rgba(0,245,196,0.4); }
        .btn-linkedin { background: transparent; color: white; border: 1px solid rgba(255,255,255,0.12); }
        .btn-linkedin:hover { border-color: rgba(0,245,196,0.3); color: #00f5c4; transform: translateY(-2px); }

        /* Footer */
        .contact-footer {
          margin-top: 4rem; padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 0.75rem;
        }
        .footer-logo { font-size: 0.95rem; font-weight: 800; color: white; letter-spacing: -0.02em; }
        .footer-logo span { color: #00f5c4; }
        .footer-copy { font-family: 'Space Mono', monospace; font-size: 0.58rem; color: rgba(255,255,255,0.2); letter-spacing: 0.1em; }

        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.delay-1 { transition-delay: 0.1s; }
        .reveal.delay-2 { transition-delay: 0.2s; }
        .reveal.delay-3 { transition-delay: 0.3s; }
        .reveal.delay-4 { transition-delay: 0.4s; }
        .in-view.reveal { opacity: 1; transform: translateY(0); }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .contact-section { padding: 4rem 1.25rem 4rem; }
          .contact-title { font-size: clamp(2.5rem, 12vw, 4rem); }
          .contact-sub { font-size: 0.88rem; margin-bottom: 2rem; }

          /* Email card — stack on tiny screens */
          .contact-email-card {
            flex-wrap: wrap;
            padding: 0.875rem 1rem;
            gap: 0.75rem;
            justify-content: flex-start;
            width: 100%;
          }
          .email-addr { font-size: 0.82rem; }
          .copy-btn { margin-left: auto; }

          /* Buttons full-width */
          .contact-actions { flex-direction: column; align-items: stretch; gap: 0.6rem; }
          .contact-btn { justify-content: center; padding: 0.85rem 1rem; }

          /* Footer */
          .contact-footer { justify-content: center; text-align: center; gap: 0.5rem; }
        }

        @media (max-width: 380px) {
          .contact-email-card { padding: 0.75rem; }
          .email-addr { font-size: 0.75rem; }
        }
      `}</style>

      <section className="contact-section" ref={sectionRef} id="contact">
        <div className="contact-divider" />
        <div className="contact-glow" />
        <div className="contact-bg-text">CONTACT</div>

        <div className="contact-wrap">
          <p className="section-label reveal">04 — Get In Touch</p>

          <h2 className="contact-title reveal delay-1">
            Let&apos;s Build<br />
            <span className="contact-title-accent">Together.</span>
          </h2>

          <p className="contact-sub reveal delay-2">
            Punya ide proyek? Butuh developer yang bisa deliver?
            Jangan ragu untuk reach out — saya siap membantu mewujudkan visimu.
          </p>

          <div className="contact-email-card reveal delay-3">
            <div className="email-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </div>
            <div className="email-text">
              <span className="email-label">Email Address</span>
              <span className="email-addr">{email}</span>
            </div>
            <button className={`copy-btn${copied ? " copied" : ""}`} onClick={handleCopy}>
              {copied ? (
                <>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg>
                  COPIED
                </>
              ) : (
                <>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  COPY
                </>
              )}
            </button>
          </div>

          <div className="contact-actions reveal delay-4">
            <a href={`mailto:${email}`} className="contact-btn btn-email">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Send Email
            </a>
            <a
              href="https://www.linkedin.com/in/julius-djami-38baa0388"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn btn-linkedin"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn
            </a>
          </div>

          <div className="contact-footer reveal delay-4">
            <div className="footer-logo">Julius<span>Djami</span></div>
            <span className="footer-copy">© 2025 — Built with Next.js</span>
          </div>
        </div>
      </section>
    </>
  );
}