"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

const CV_DATA = {
  name:     "Julius Djami",
  photo:    "/juliuss.png",
  title:    "Full-Stack Web Developer",
  tagline:  "Building clean, fast & meaningful digital experiences.",
  email:    "juliusbungadjami@gmail.com",
  phone:    "+62 852 1618 2664",
  location: "Indonesia",
  github:   "github.com/Julius010702",
  website:  "my-portofolio-five-mauve.vercel.app",

  summary:
    "Motivated web developer and Computer Science student with hands-on experience building full-stack web applications. Focused on clean code, pixel-perfect UI, and scalable architecture. Proficient in Next.js, TypeScript, PHP, and database management.",

  experience: [
    {
      role:    "Freelance Web Developer",
      company: "Self-Employed",
      period:  "2024 — Present",
      desc:    "Building full-stack web applications for clients. Developed DSS systems, food ordering platforms, and portfolio sites using Next.js and modern tooling.",
      tags:    ["Next.js", "TypeScript", "PostgreSQL"],
    },
  ],

  education: [
    {
      degree:  "S1 Teknik Informatika",
      school:  "Universitas STIKOM ARTHA BUANA KUPANG",
      period:  "2023 — 2027",
      desc:    "Fokus pada rekayasa perangkat lunak, sistem basis data, dan pemrograman web. IPK: 3.5/4.0",
    },
    {
      degree:  "SMA SWASTA PGRI",
      school:  "SMAS PGRI WINIRAI SABU",
      period:  "2020 — 2023",
      desc:    "Jurusan IPA.",
    },
  ],

  skills: [
    { name: "Next.js / React",    level: 90, color: "#00f5c4" },
    { name: "TypeScript",         level: 82, color: "#7b61ff" },
    { name: "Node.js",            level: 75, color: "#00f5c4" },
    { name: "PostgreSQL / MySQL", level: 78, color: "#ff61d8" },
    { name: "Tailwind CSS",       level: 88, color: "#7b61ff" },
    { name: "PHP / Laravel",      level: 70, color: "#ff61d8" },
  ],

  tools: ["Git", "VS Code", "Figma", "Vercel", "Docker", "Postman", "PostgreSQL"],

  languages: [
    { lang: "Indonesian", level: "Native" },
    { lang: "English",    level: "Professional" },
  ],

  projects: [
    {
      title:   "My Portfolio",
      type:    "Personal Portfolio Website",
      year:    "2024",
      desc:    "Website portofolio pribadi yang menampilkan profil, proyek, dan keahlian secara interaktif dengan desain modern dan responsif.",
      tags:    ["Next.js", "TypeScript", "JavaScript"],
      color:   "#00f5c4",
      github:  "https://github.com/Julius010702/my-portofolio",
      demo:    "https://my-portofolio-five-mauve.vercel.app",
    },
    {
      title:   "Sistem Pemesanan Makanan",
      type:    "Food Ordering Platform",
      year:    "2024",
      desc:    "Platform full-stack pemesanan makanan dengan dashboard admin, manajemen menu real-time, dan sistem notifikasi pesanan.",
      tags:    ["Next.js", "TypeScript", "PostgreSQL"],
      color:   "#7b61ff",
      github:  "https://github.com/Julius010702/pekasaran",
      demo:    "https://sistempemesanan.free.nf/?i=1",
    },
    {
      title:   "Sistem Penentu Prestasi",
      type:    "Student Achievement DSS",
      year:    "2023",
      desc:    "Sistem pendukung keputusan berbasis metode SAW untuk menentukan siswa berprestasi secara objektif berdasarkan multi-kriteria.",
      tags:    ["PHP", "MySQL", "JavaScript"],
      color:   "#ff61d8",
      github:  "https://github.com/Julius010702/Sistem-Penentu-Prestasi",
      demo:    "https://webpenentuprestasi.free.nf/",
    },
  ],

  dicoding: [
    { title:"Belajar Dasar Pemrograman JavaScript", duration:"46 Jam", rating:4.85, level:"Dasar", modules:"11 Modul", color:"#00f5c4", icon:"JS", certUrl:"https://drive.google.com/file/d/1s1g7ziZgwjm4ylxfDT4-jwT9380StIh5/view?usp=sharing" },
    { title:"Belajar Dasar AI", duration:"10 Jam", rating:4.67, level:"Dasar", modules:"39 Modul", color:"#7b61ff", icon:"AI", certUrl:"https://drive.google.com/file/d/1SPbkXKS9qzWpgROal-V5AWWY-y4fss-S/view?usp=sharing" },
    { title:"Belajar Cloud dan Gen AI di AWS", duration:"18 Jam", rating:4.62, level:"Dasar", modules:"99 Modul", color:"#ff61d8", icon:"☁", certUrl:"https://drive.google.com/file/d/1EEKY2Slo5WcvCOfSqYV11V8tby6TNCi7/view?usp=sharing" },
  ],
};

type CVProps = { isOpen: boolean; onClose: () => void; };

export default function CV({ isOpen, onClose }: CVProps) {
  const modalRef  = useRef<HTMLDivElement>(null);
  const cardRef   = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const cur       = useRef({ rx: 0, ry: 0 });
  const tgt       = useRef({ rx: 0, ry: 0 });
  const isHover   = useRef(false);

  const [skillsOn,  setSkillsOn]  = useState(false);
  const [mounted,   setMounted]   = useState(false);
  const [dcInView,  setDcInView]  = useState(false);
  const [dcBarsOn,  setDcBarsOn]  = useState(false);
  const [projInView,setProjInView]= useState(false);
  const dcRef   = useRef<HTMLDivElement>(null);
  const projRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const t1 = setTimeout(() => {
      setMounted(true);
      setSkillsOn(false); setDcInView(false); setDcBarsOn(false); setProjInView(false);
      const t2 = setTimeout(() => setSkillsOn(true), 600);
      return () => clearTimeout(t2);
    }, 50);
    return () => { clearTimeout(t1); setMounted(false); setSkillsOn(false); setDcInView(false); setDcBarsOn(false); setProjInView(false); };
  }, [isOpen]);

  useEffect(() => { document.body.style.overflow = isOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [isOpen]);
  useEffect(() => { const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", fn); return () => window.removeEventListener("keydown", fn); }, [onClose]);

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const root = modalRef.current;
    const io = new IntersectionObserver((entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("cv-in"); }), { threshold: 0.08, root });
    root.querySelectorAll(".cv-reveal").forEach(el => io.observe(el));
    const dcObs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setDcInView(true); setTimeout(() => setDcBarsOn(true), 300); } }, { threshold: 0.05, root });
    if (dcRef.current) dcObs.observe(dcRef.current);
    const projObs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setProjInView(true); }, { threshold: 0.05, root });
    if (projRef.current) projObs.observe(projRef.current);
    return () => { io.disconnect(); dcObs.disconnect(); projObs.disconnect(); };
  }, [isOpen, mounted]);

  useEffect(() => {
    if (!isOpen) return;
    const tick = () => {
      cur.current.rx += (tgt.current.rx - cur.current.rx) * 0.07;
      cur.current.ry += (tgt.current.ry - cur.current.ry) * 0.07;
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(${cur.current.rx}deg) rotateY(${cur.current.ry}deg) translateZ(${isHover.current ? 25 : 0}px) scale(${isHover.current ? 1.02 : 1})`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isOpen]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    tgt.current = { rx: -((e.clientY - r.top) / r.height - 0.5) * 20, ry: ((e.clientX - r.left) / r.width - 0.5) * 20 };
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;600;800&display=swap');

        .cvm-overlay{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.88);backdrop-filter:blur(16px);display:flex;align-items:flex-start;justify-content:center;padding:1.5rem 1rem 2rem;overflow-y:auto;animation:cvm-ov-in .3s ease forwards;}
        @keyframes cvm-ov-in{from{opacity:0}to{opacity:1}}
        .cvm-box{position:relative;width:min(980px,100%);background:#020408;border:1px solid rgba(255,255,255,.08);border-radius:1.6rem;overflow:hidden;margin:auto;opacity:0;transform:perspective(1000px) rotateX(12deg) translateY(60px) scale(.95);transition:opacity .55s cubic-bezier(.16,1,.3,1),transform .55s cubic-bezier(.16,1,.3,1);}
        .cvm-box.open{opacity:1;transform:none;}
        .cvm-box-line{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#00f5c4 30%,#7b61ff 70%,transparent);z-index:2;}
        .cvm-grid{position:absolute;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:55px 55px;mask-image:radial-gradient(ellipse 80% 60% at 50% 20%,black,transparent);}
        .cvm-orb{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;z-index:0;}
        .cvm-orb-1{width:400px;height:400px;top:-120px;left:-120px;background:radial-gradient(circle,rgba(0,245,196,.08),transparent 70%);animation:cvm-fa 9s ease-in-out infinite;}
        .cvm-orb-2{width:350px;height:350px;bottom:-80px;right:-80px;background:radial-gradient(circle,rgba(123,97,255,.09),transparent 70%);animation:cvm-fb 11s ease-in-out infinite;}
        @keyframes cvm-fa{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
        @keyframes cvm-fb{0%,100%{transform:translateY(0)}50%{transform:translateY(18px)}}
        .cvm-scan{position:absolute;left:0;right:0;height:1px;z-index:1;background:linear-gradient(90deg,transparent,rgba(0,245,196,.45) 50%,transparent);animation:cvm-scan 7s ease-in-out infinite;pointer-events:none;}
        @keyframes cvm-scan{0%{top:0%;opacity:0}5%{opacity:1}95%{opacity:.4}100%{top:100%;opacity:0}}
        .cvm-close{position:absolute;top:1.25rem;right:1.25rem;z-index:10;width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);color:rgba(255,255,255,.45);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .22s;}
        .cvm-close:hover{border-color:rgba(255,97,97,.5);color:#ff6161;background:rgba(255,97,97,.08);transform:rotate(90deg);}
        .cvm-scroll{position:relative;z-index:2;padding:2.5rem 2rem 3rem;max-height:90vh;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(0,245,196,.25) transparent;}
        .cvm-scroll::-webkit-scrollbar{width:3px;}
        .cvm-scroll::-webkit-scrollbar-thumb{background:rgba(0,245,196,.25);border-radius:99px;}

        .cvm-topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem;}
        .cvm-topbar-label{font-family:'DM Mono',monospace;font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(0,245,196,.6);display:flex;align-items:center;gap:.6rem;}
        .cvm-topbar-label::before{content:'';display:block;width:18px;height:1px;background:#00f5c4;}
        .cvm-print-btn{display:inline-flex;align-items:center;gap:.45rem;padding:.45rem 1rem;background:transparent;border:1px solid rgba(0,245,196,.3);border-radius:.4rem;color:#00f5c4;font-family:'DM Mono',monospace;font-size:.58rem;letter-spacing:.08em;cursor:pointer;transition:all .25s;position:relative;overflow:hidden;}
        .cvm-print-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,245,196,.08),transparent);transform:translateX(-100%);transition:transform .3s;}
        .cvm-print-btn:hover::before{transform:translateX(0);}
        .cvm-print-btn:hover{border-color:rgba(0,245,196,.65);box-shadow:0 0 16px rgba(0,245,196,.15);}

        .cvm-hero{position:relative;will-change:transform;margin-bottom:1.75rem;}
        .cvm-hero-inner{position:relative;padding:2rem 2rem 1.75rem;background:linear-gradient(140deg,rgba(255,255,255,.07),rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.09);border-radius:1.2rem;overflow:hidden;transition:border-color .4s,box-shadow .4s;}
        .cvm-hero:hover .cvm-hero-inner{border-color:rgba(0,245,196,.3);box-shadow:0 30px 80px rgba(0,0,0,.5),0 0 50px rgba(0,245,196,.08);}
        .cvm-hero-line{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#00f5c4 40%,#7b61ff 70%,transparent);}
        .cvm-hero-glow{position:absolute;top:-70px;right:-70px;width:260px;height:260px;background:radial-gradient(circle,rgba(0,245,196,.12),transparent 70%);pointer-events:none;}
        .cvm-hero-sheen{position:absolute;inset:0;border-radius:inherit;background:linear-gradient(135deg,rgba(255,255,255,.08) 0%,transparent 40%);pointer-events:none;}
        .cvm-hero-body{position:relative;z-index:1;display:grid;grid-template-columns:auto 1fr;gap:1.75rem;align-items:center;}
        .cvm-avatar{width:90px;height:90px;border-radius:.9rem;flex-shrink:0;border:2px solid rgba(0,245,196,.4);box-shadow:0 0 0 4px rgba(0,245,196,.08),0 0 28px rgba(0,245,196,.2);position:relative;overflow:hidden;background:linear-gradient(135deg,rgba(0,245,196,.15),rgba(123,97,255,.15));}
        .cvm-avatar::after{content:'';position:absolute;inset:-2px;border-radius:inherit;background:conic-gradient(from 0deg,transparent 0%,rgba(0,245,196,.5) 25%,transparent 50%);animation:cvm-spin 4s linear infinite;z-index:0;}
        @keyframes cvm-spin{to{transform:rotate(360deg)}}
        .cvm-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(1.8rem,4.5vw,3rem);letter-spacing:.05em;line-height:1;background:linear-gradient(110deg,white,rgba(255,255,255,.75));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:.2rem;}
        .cvm-job-title{font-family:'DM Mono',monospace;font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;background:linear-gradient(90deg,#00f5c4,#7b61ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:.65rem;}
        .cvm-tagline{font-size:.8rem;color:rgba(255,255,255,.35);line-height:1.6;margin-bottom:1rem;}
        .cvm-contacts{display:flex;flex-wrap:wrap;gap:.4rem;}
        .cvm-chip{display:inline-flex;align-items:center;gap:.32rem;padding:.25rem .6rem;border-radius:99px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);font-family:'DM Mono',monospace;font-size:.54rem;color:rgba(255,255,255,.42);letter-spacing:.04em;transition:all .22s;text-decoration:none;}
        .cvm-chip:hover{border-color:rgba(0,245,196,.4);color:#00f5c4;}

        .cvm-cols{display:grid;grid-template-columns:1fr 280px;gap:1.25rem;}
        .cvm-card{position:relative;padding:1.5rem 1.4rem;background:linear-gradient(145deg,rgba(255,255,255,.05),rgba(255,255,255,.01));border:1px solid rgba(255,255,255,.07);border-radius:1rem;overflow:hidden;transition:border-color .3s;margin-bottom:1.1rem;}
        .cvm-card:last-child{margin-bottom:0;}
        .cvm-card:hover{border-color:rgba(0,245,196,.16);}
        .cvm-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,var(--cc,rgba(0,245,196,.5)),transparent);opacity:.5;}
        .cvm-section-label{font-family:'DM Mono',monospace;font-size:.56rem;letter-spacing:.24em;text-transform:uppercase;color:rgba(0,245,196,.65);margin-bottom:1.1rem;display:flex;align-items:center;gap:.55rem;}
        .cvm-section-label::before{content:'';display:block;width:14px;height:1px;background:#00f5c4;}
        .cvm-summary{font-size:.82rem;color:rgba(255,255,255,.38);line-height:1.85;}
        .cvm-summary strong{color:rgba(255,255,255,.78);}

        .cvm-exp-item{margin-bottom:1.35rem;position:relative;padding-left:1rem;}
        .cvm-exp-item:last-child{margin-bottom:0;}
        .cvm-exp-item::before{content:'';position:absolute;left:0;top:6px;bottom:-1.35rem;width:1px;background:linear-gradient(to bottom,rgba(0,245,196,.4),transparent);}
        .cvm-exp-item:last-child::before{display:none;}
        .cvm-exp-dot{position:absolute;left:-3.5px;top:5px;width:8px;height:8px;border-radius:50%;background:#00f5c4;box-shadow:0 0 7px rgba(0,245,196,.6);border:2px solid #020408;}
        .cvm-exp-role{font-size:.86rem;font-weight:700;color:white;margin-bottom:.1rem;}
        .cvm-exp-meta{display:flex;gap:.6rem;align-items:center;flex-wrap:wrap;font-family:'DM Mono',monospace;font-size:.54rem;color:rgba(255,255,255,.28);letter-spacing:.05em;margin-bottom:.45rem;}
        .cvm-exp-period{padding:.12rem .45rem;border-radius:99px;background:rgba(0,245,196,.07);border:1px solid rgba(0,245,196,.2);color:rgba(0,245,196,.7);font-size:.52rem;}
        .cvm-exp-desc{font-size:.76rem;color:rgba(255,255,255,.33);line-height:1.7;margin-bottom:.5rem;}
        .cvm-exp-tags{display:flex;flex-wrap:wrap;gap:.28rem;}
        .cvm-exp-tag{padding:.12rem .42rem;border-radius:.2rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);font-family:'DM Mono',monospace;font-size:.5rem;color:rgba(255,255,255,.26);}

        .cvm-edu-item{margin-bottom:1.2rem;}
        .cvm-edu-item:last-child{margin-bottom:0;}
        .cvm-edu-degree{font-size:.85rem;font-weight:700;color:white;margin-bottom:.12rem;}
        .cvm-edu-school{font-family:'DM Mono',monospace;font-size:.56rem;color:rgba(123,97,255,.8);letter-spacing:.06em;margin-bottom:.35rem;}
        .cvm-edu-period{display:inline-block;padding:.1rem .42rem;border-radius:99px;background:rgba(123,97,255,.07);border:1px solid rgba(123,97,255,.22);font-family:'DM Mono',monospace;font-size:.5rem;color:rgba(123,97,255,.7);margin-bottom:.35rem;}
        .cvm-edu-desc{font-size:.73rem;color:rgba(255,255,255,.28);line-height:1.6;}

        .cvm-skill-item{margin-bottom:.9rem;}
        .cvm-skill-item:last-child{margin-bottom:0;}
        .cvm-skill-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:.3rem;}
        .cvm-skill-name{font-size:.75rem;color:rgba(255,255,255,.6);font-weight:500;}
        .cvm-skill-pct{font-family:'DM Mono',monospace;font-size:.55rem;color:var(--sc);letter-spacing:.05em;}
        .cvm-skill-track{height:3px;background:rgba(255,255,255,.06);border-radius:99px;overflow:hidden;}
        .cvm-skill-bar{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--sc),color-mix(in srgb,var(--sc) 55%,transparent));box-shadow:0 0 7px var(--sc);width:0;transition:width 1.3s cubic-bezier(.16,1,.3,1);}
        .cvm-skill-bar.go{width:var(--sw);}
        .cvm-tools{display:flex;flex-wrap:wrap;gap:.35rem;}
        .cvm-tool{padding:.26rem .58rem;border-radius:.3rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);font-family:'DM Mono',monospace;font-size:.55rem;color:rgba(255,255,255,.35);transition:all .2s;}
        .cvm-tool:hover{background:rgba(0,245,196,.07);border-color:rgba(0,245,196,.28);color:#00f5c4;transform:translateY(-2px);}
        .cvm-lang-item{display:flex;justify-content:space-between;align-items:center;padding:.55rem .7rem;border-radius:.45rem;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);margin-bottom:.35rem;transition:all .2s;}
        .cvm-lang-item:last-child{margin-bottom:0;}
        .cvm-lang-item:hover{border-color:rgba(255,97,216,.2);}
        .cvm-lang-name{font-size:.78rem;color:rgba(255,255,255,.55);}
        .cvm-lang-level{font-family:'DM Mono',monospace;font-size:.52rem;color:rgba(255,97,216,.75);padding:.1rem .38rem;border-radius:99px;background:rgba(255,97,216,.07);border:1px solid rgba(255,97,216,.2);}

        .cv-reveal{opacity:0;transform:translateY(24px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1);}
        .cv-reveal.d1{transition-delay:.08s}.cv-reveal.d2{transition-delay:.18s}.cv-reveal.d3{transition-delay:.28s}.cv-reveal.d4{transition-delay:.38s}.cv-reveal.d5{transition-delay:.48s}.cv-reveal.d6{transition-delay:.56s}
        .cv-in.cv-reveal{opacity:1;transform:translateY(0);}
        .cvm-divider{height:1px;margin:0 0 1.25rem;background:linear-gradient(90deg,transparent,rgba(0,245,196,.18),rgba(123,97,255,.18),transparent);}

        /* ══ SHARED SECTION CARD ══ */
        .cvm-sec-card{position:relative;padding:1.4rem;background:linear-gradient(145deg,rgba(255,255,255,.05),rgba(255,255,255,.01));border-radius:1rem;overflow:hidden;margin-top:1.1rem;}
        .cvm-sec-card::after{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.025),transparent);animation:sec-scan 5s ease-in-out infinite;}
        @keyframes sec-scan{0%{left:-60%}100%{left:160%}}

        .cvm-sec-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.1rem;flex-wrap:wrap;gap:.5rem;}
        .cvm-sec-hdr-left{display:flex;align-items:center;gap:.65rem;}
        .cvm-badge{display:inline-flex;align-items:center;gap:.4rem;padding:.25rem .7rem;border-radius:2rem;font-family:'DM Mono',monospace;font-size:.52rem;letter-spacing:.16em;text-transform:uppercase;}
        .cvm-badge-dot{width:5px;height:5px;border-radius:50%;animation:badge-pulse 1.8s ease-in-out infinite;}
        @keyframes badge-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.6)}}
        .cvm-sec-count{font-family:'DM Mono',monospace;font-size:.56rem;color:rgba(255,255,255,.2);}
        .cvm-sec-count strong{color:rgba(0,245,196,.75);}

        /* ══ PROJECTS GRID ══ */
        .cvp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;}
        .cvp-card{position:relative;overflow:hidden;background:linear-gradient(135deg,rgba(255,255,255,.045),rgba(255,255,255,.01));border:1px solid rgba(255,255,255,.07);border-radius:.9rem;padding:1.05rem 1rem .9rem;display:block;text-decoration:none;cursor:pointer;transition:transform .28s cubic-bezier(.16,1,.3,1),border-color .28s,box-shadow .28s,opacity .55s cubic-bezier(.16,1,.3,1),translate .55s cubic-bezier(.16,1,.3,1);}
        .cvp-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,var(--pc),transparent);opacity:0;transition:opacity .28s;}
        .cvp-card::after{content:'';position:absolute;inset:0;background:linear-gradient(110deg,transparent 35%,color-mix(in srgb,var(--pc) 7%,transparent) 50%,transparent 65%);transform:translateX(-100%);transition:transform .5s;}
        .cvp-card:hover{transform:translateY(-4px);border-color:color-mix(in srgb,var(--pc) 28%,transparent);box-shadow:0 14px 32px rgba(0,0,0,.45),0 0 20px color-mix(in srgb,var(--pc) 10%,transparent);}
        .cvp-card:hover::before{opacity:1;}
        .cvp-card:hover::after{transform:translateX(100%);}

        .cvp-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:.5rem;}
        .cvp-type{font-family:'DM Mono',monospace;font-size:.46rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.22);}
        .cvp-yr{font-family:'DM Mono',monospace;font-size:.46rem;color:var(--pc);opacity:.7;background:color-mix(in srgb,var(--pc) 10%,transparent);border:1px solid color-mix(in srgb,var(--pc) 22%,transparent);padding:.08rem .36rem;border-radius:99px;}
        .cvp-title{font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:.04em;color:white;line-height:1.15;margin-bottom:.4rem;transition:color .22s;}
        .cvp-card:hover .cvp-title{color:var(--pc);}
        .cvp-desc{font-size:.63rem;color:rgba(255,255,255,.28);line-height:1.55;margin-bottom:.55rem;}
        .cvp-tags{display:flex;gap:.25rem;flex-wrap:wrap;margin-bottom:.55rem;}
        .cvp-tag{font-family:'DM Mono',monospace;font-size:.44rem;letter-spacing:.04em;padding:.08rem .32rem;border-radius:.2rem;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);color:rgba(255,255,255,.28);}
        .cvp-footer{border-top:1px solid rgba(255,255,255,.05);padding-top:.42rem;display:flex;gap:.5rem;}
        .cvp-link{display:inline-flex;align-items:center;gap:.22rem;font-family:'DM Mono',monospace;font-size:.45rem;letter-spacing:.07em;text-transform:uppercase;color:var(--pc);opacity:0;transform:translateX(-3px);transition:opacity .22s,transform .22s;text-decoration:none;}
        .cvp-card:hover .cvp-link{opacity:.8;transform:translateX(0);}
        .cvp-link+.cvp-link{transition-delay:.05s;}
        .cvp-num{position:absolute;bottom:.4rem;right:.6rem;font-family:'Bebas Neue',sans-serif;font-size:2.2rem;color:var(--pc);opacity:.04;line-height:1;pointer-events:none;user-select:none;transition:opacity .28s;}
        .cvp-card:hover .cvp-num{opacity:.09;}

        /* ══ DICODING GRID ══ */
        .dc-certs-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:.6rem;}
        .dc-cert-item{position:relative;overflow:hidden;background:linear-gradient(135deg,rgba(255,255,255,.04),rgba(255,255,255,.01));border:1px solid rgba(255,255,255,.07);border-radius:.75rem;padding:.85rem .8rem .7rem;text-decoration:none;display:block;cursor:pointer;transition:transform .28s cubic-bezier(.16,1,.3,1),border-color .28s,box-shadow .28s,opacity .6s cubic-bezier(.16,1,.3,1),translate .6s cubic-bezier(.16,1,.3,1);}
        .dc-cert-item::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,var(--dc),transparent);opacity:0;transition:opacity .28s;}
        .dc-cert-item::after{content:'';position:absolute;inset:0;background:linear-gradient(110deg,transparent 35%,color-mix(in srgb,var(--dc) 7%,transparent) 50%,transparent 65%);transform:translateX(-100%);transition:transform .5s;}
        .dc-cert-item:hover{transform:translateY(-3px);border-color:color-mix(in srgb,var(--dc) 28%,transparent);box-shadow:0 10px 24px rgba(0,0,0,.4),0 0 16px color-mix(in srgb,var(--dc) 8%,transparent);}
        .dc-cert-item:hover::before{opacity:1;}
        .dc-cert-item:hover::after{transform:translateX(100%);}
        .dc-ci-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:.5rem;}
        .dc-ci-lulus{display:inline-flex;align-items:center;gap:.28rem;font-family:'DM Mono',monospace;font-size:.44rem;letter-spacing:.12em;text-transform:uppercase;color:var(--dc);background:color-mix(in srgb,var(--dc) 10%,transparent);border:1px solid color-mix(in srgb,var(--dc) 22%,transparent);padding:.12rem .38rem;border-radius:2rem;}
        .dc-ci-icon{font-family:'Bebas Neue',sans-serif;font-size:.7rem;width:24px;height:24px;border-radius:.35rem;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--dc) 12%,transparent);border:1px solid color-mix(in srgb,var(--dc) 22%,transparent);color:var(--dc);transition:transform .35s cubic-bezier(.34,1.56,.64,1);}
        .dc-cert-item:hover .dc-ci-icon{transform:rotate(-8deg) scale(1.12);}
        .dc-ci-title{font-size:.62rem;font-weight:700;color:rgba(255,255,255,.8);line-height:1.35;margin-bottom:.45rem;transition:color .22s;}
        .dc-cert-item:hover .dc-ci-title{color:var(--dc);}
        .dc-ci-rating-wrap{display:flex;align-items:center;gap:.4rem;margin-bottom:.4rem;}
        .dc-ci-bar-bg{flex:1;height:2px;border-radius:99px;background:rgba(255,255,255,.07);overflow:hidden;}
        .dc-ci-bar-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--dc),color-mix(in srgb,var(--dc) 55%,white));box-shadow:0 0 5px var(--dc);width:0;transition:width 1.1s cubic-bezier(.16,1,.3,1);}
        .dc-ci-bar-fill.go{width:var(--dw);}
        .dc-ci-rating-num{font-family:'DM Mono',monospace;font-size:.48rem;color:rgba(255,200,60,.8);white-space:nowrap;}
        .dc-ci-meta{display:flex;gap:.25rem;flex-wrap:wrap;}
        .dc-ci-chip{font-family:'DM Mono',monospace;font-size:.43rem;letter-spacing:.05em;padding:.1rem .32rem;border-radius:99px;border:1px solid rgba(255,255,255,.08);color:rgba(255,255,255,.28);display:inline-flex;align-items:center;gap:.2rem;}
        .dc-ci-chip-lvl{color:var(--dc);opacity:.75;border-color:color-mix(in srgb,var(--dc) 22%,transparent);background:color-mix(in srgb,var(--dc) 6%,transparent);}
        .dc-ci-view{display:flex;justify-content:flex-end;margin-top:.4rem;padding-top:.38rem;border-top:1px solid rgba(255,255,255,.05);}
        .dc-ci-view-link{font-family:'DM Mono',monospace;font-size:.44rem;letter-spacing:.08em;text-transform:uppercase;color:var(--dc);opacity:0;transform:translateX(-3px);display:inline-flex;align-items:center;gap:.22rem;transition:opacity .22s,transform .22s;}
        .dc-cert-item:hover .dc-ci-view-link{opacity:.8;transform:translateX(0);}
        .dc-ci-num{position:absolute;bottom:.35rem;right:.55rem;font-family:'Bebas Neue',sans-serif;font-size:2rem;color:var(--dc);opacity:.04;line-height:1;pointer-events:none;user-select:none;transition:opacity .28s;}
        .dc-cert-item:hover .dc-ci-num{opacity:.09;}

        @media print{
          .cvm-overlay{position:static!important;background:none!important;backdrop-filter:none!important;padding:0!important;}
          .cvm-box{border:none!important;border-radius:0!important;opacity:1!important;transform:none!important;}
          .cvm-close,.cvm-print-btn,.cvm-orb,.cvm-grid,.cvm-scan,.cvm-box-line{display:none!important;}
          .cvm-scroll{max-height:none!important;overflow:visible!important;padding:1rem!important;}
          .cvm-hero-inner,.cvm-card,.cvm-sec-card{background:white!important;border:1px solid #ddd!important;}
          .cvm-name,.cvm-exp-role,.cvm-edu-degree,.cvm-lang-name,.cvp-title,.dc-ci-title{color:#111!important;-webkit-text-fill-color:#111!important;}
          .cvm-job-title{color:#555!important;-webkit-text-fill-color:#555!important;}
          .cvm-section-label,.cvm-exp-meta,.cvm-edu-school,.cvm-skill-name,.cvm-tool,.cvm-chip,.cvp-desc,.dc-ci-chip{color:#444!important;}
          .cvm-exp-desc,.cvm-edu-desc,.cvm-summary,.cvm-tagline{color:#555!important;}
          .cvm-skill-track{background:#eee!important;}
          .cvm-cols{grid-template-columns:1fr 240px!important;}
          .dc-certs-grid{grid-template-columns:repeat(4,1fr)!important;}
          .cvp-grid{grid-template-columns:repeat(3,1fr)!important;}
          body{overflow:visible!important;}
        }
        @media(max-width:720px){
          .cvm-cols{grid-template-columns:1fr;}
          .cvm-hero-body{grid-template-columns:1fr;text-align:center;}
          .cvm-contacts{justify-content:center;}
          .cvm-scroll{padding:1.5rem 1rem 2rem;}
          .cvm-topbar{flex-direction:column;gap:.75rem;align-items:flex-start;}
          .dc-certs-grid{grid-template-columns:repeat(2,1fr);}
          .cvp-grid{grid-template-columns:repeat(2,1fr);}
        }
        @media(max-width:480px){
          .dc-certs-grid{grid-template-columns:1fr 1fr;}
          .cvp-grid{grid-template-columns:1fr;}
        }
      `}</style>

      <div className="cvm-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className={`cvm-box${mounted ? " open" : ""}`}>
          <div className="cvm-box-line" />
          <div className="cvm-grid" />
          <div className="cvm-orb cvm-orb-1" />
          <div className="cvm-orb cvm-orb-2" />
          <div className="cvm-scan" />
          <button className="cvm-close" onClick={onClose}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>

          <div className="cvm-scroll" ref={modalRef}>

            {/* TOPBAR */}
            <div className="cvm-topbar">
              <span className="cvm-topbar-label">Curriculum Vitae · {new Date().getFullYear()}</span>
              <button className="cvm-print-btn" onClick={() => window.print()}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                Download / Print PDF
              </button>
            </div>

            {/* HERO */}
            <div className="cvm-hero cv-reveal" ref={cardRef} onMouseMove={onMouseMove} onMouseEnter={() => { isHover.current = true; }} onMouseLeave={() => { isHover.current = false; tgt.current = { rx:0, ry:0 }; }}>
              <div className="cvm-hero-inner">
                <div className="cvm-hero-line" /><div className="cvm-hero-glow" /><div className="cvm-hero-sheen" />
                <div className="cvm-hero-body">
                  <div className="cvm-avatar">
                    <Image src={CV_DATA.photo} alt={CV_DATA.name} width={90} height={90} style={{objectFit:"cover",borderRadius:".9rem",position:"relative",zIndex:1}} priority />
                  </div>
                  <div>
                    <h1 className="cvm-name">{CV_DATA.name}</h1>
                    <p className="cvm-job-title">{CV_DATA.title}</p>
                    <p className="cvm-tagline">{CV_DATA.tagline}</p>
                    <div className="cvm-contacts">
                      <a href={`mailto:${CV_DATA.email}`} className="cvm-chip">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        {CV_DATA.email}
                      </a>
                      <span className="cvm-chip">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        {CV_DATA.phone}
                      </span>
                      <span className="cvm-chip">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {CV_DATA.location}
                      </span>
                      <a href={`https://${CV_DATA.github}`} target="_blank" rel="noopener noreferrer" className="cvm-chip">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                        {CV_DATA.github}
                      </a>
                      <a href={`https://${CV_DATA.website}`} target="_blank" rel="noopener noreferrer" className="cvm-chip">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                        Portfolio
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cvm-divider" />

            {/* MAIN COLS */}
            <div className="cvm-cols">
              <div>
                {/* Summary */}
                <div className="cvm-card cv-reveal d1">
                  <p className="cvm-section-label">Profile Summary</p>
                  <p className="cvm-summary">{CV_DATA.summary}</p>
                </div>
                {/* Experience — FIXED: only real work, no "Mahasiswa" */}
                <div className="cvm-card cv-reveal d2" style={{"--cc":"rgba(0,245,196,.5)"} as React.CSSProperties}>
                  <p className="cvm-section-label">Experience</p>
                  {CV_DATA.experience.map((exp, i) => (
                    <div className="cvm-exp-item" key={i}>
                      <div className="cvm-exp-dot" />
                      <div className="cvm-exp-role">{exp.role}</div>
                      <div className="cvm-exp-meta">
                        <span>{exp.company}</span><span>·</span>
                        <span className="cvm-exp-period">{exp.period}</span>
                      </div>
                      <p className="cvm-exp-desc">{exp.desc}</p>
                      <div className="cvm-exp-tags">{exp.tags.map(t => <span key={t} className="cvm-exp-tag">{t}</span>)}</div>
                    </div>
                  ))}
                </div>
                {/* Education — FIXED: university is now here (not Experience) */}
                <div className="cvm-card cv-reveal d3" style={{"--cc":"rgba(123,97,255,.5)"} as React.CSSProperties}>
                  <p className="cvm-section-label">Education</p>
                  {CV_DATA.education.map((edu, i) => (
                    <div className="cvm-edu-item" key={i}>
                      <div className="cvm-edu-degree">{edu.degree}</div>
                      <div className="cvm-edu-school">{edu.school}</div>
                      <div className="cvm-edu-period">{edu.period}</div>
                      <p className="cvm-edu-desc">{edu.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="cvm-card cv-reveal d2" style={{"--cc":"rgba(0,245,196,.4)"} as React.CSSProperties}>
                  <p className="cvm-section-label">Skills</p>
                  {CV_DATA.skills.map(s => (
                    <div className="cvm-skill-item" key={s.name} style={{"--sc":s.color,"--sw":`${s.level}%`} as React.CSSProperties}>
                      <div className="cvm-skill-row">
                        <span className="cvm-skill-name">{s.name}</span>
                        <span className="cvm-skill-pct">{s.level}%</span>
                      </div>
                      <div className="cvm-skill-track">
                        <div className={`cvm-skill-bar${skillsOn ? " go" : ""}`} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cvm-card cv-reveal d3" style={{"--cc":"rgba(255,97,216,.4)"} as React.CSSProperties}>
                  <p className="cvm-section-label">Tools & Tech</p>
                  <div className="cvm-tools">{CV_DATA.tools.map(t => <span key={t} className="cvm-tool">{t}</span>)}</div>
                </div>
                <div className="cvm-card cv-reveal d4" style={{"--cc":"rgba(123,97,255,.4)"} as React.CSSProperties}>
                  <p className="cvm-section-label">Languages</p>
                  {CV_DATA.languages.map(l => (
                    <div className="cvm-lang-item" key={l.lang}>
                      <span className="cvm-lang-name">{l.lang}</span>
                      <span className="cvm-lang-level">{l.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ════ PROJECTS — NEW SECTION ════ */}
            <div className="cv-reveal d5" ref={projRef}>
              <div className="cvm-divider" style={{marginTop:"1.1rem"}} />
              <div className="cvm-sec-card" style={{border:"1px solid rgba(0,245,196,.15)"}}>
                <div className="cvm-sec-card::before" />
                <div className="cvm-sec-hdr">
                  <div className="cvm-sec-hdr-left">
                    <div className="cvm-badge" style={{background:"rgba(0,245,196,.08)",border:"1px solid rgba(0,245,196,.25)",color:"#00f5c4"}}>
                      <span className="cvm-badge-dot" style={{background:"#00f5c4",boxShadow:"0 0 7px #00f5c4"}} />
                      Selected Projects
                    </div>
                    <p className="cvm-section-label" style={{margin:0}}>Built Works</p>
                  </div>
                  <div className="cvm-sec-count"><strong>{CV_DATA.projects.length}</strong> proyek</div>
                </div>
                <div className="cvp-grid">
                  {CV_DATA.projects.map((proj, i) => (
                    <a key={proj.title} href={proj.demo} target="_blank" rel="noopener noreferrer" className="cvp-card"
                      style={{"--pc":proj.color, opacity:projInView?1:0, translate:projInView?"0 0":"0 22px", transitionDelay:`${0.08+i*.12}s`} as React.CSSProperties}>
                      <div className="cvp-top">
                        <span className="cvp-type">{proj.type}</span>
                        <span className="cvp-yr">{proj.year}</span>
                      </div>
                      <div className="cvp-title">{proj.title}</div>
                      <div className="cvp-desc">{proj.desc}</div>
                      <div className="cvp-tags">{proj.tags.map(t => <span key={t} className="cvp-tag">{t}</span>)}</div>
                      <div className="cvp-footer">
                        <a href={proj.github} target="_blank" rel="noopener noreferrer" className="cvp-link" onClick={e => e.stopPropagation()}>
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                          GitHub
                        </a>
                        <span className="cvp-link">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                          Demo
                        </span>
                      </div>
                      <div className="cvp-num">{String(i+1).padStart(2,"0")}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ════ DICODING — 8 certs ════ */}
            <div className="cv-reveal d6" ref={dcRef}>
              <div className="cvm-divider" style={{marginTop:"1.1rem"}} />
              <div className="cvm-sec-card" style={{border:"1px solid rgba(123,97,255,.18)"}}>
                <div className="cvm-sec-hdr">
                  <div className="cvm-sec-hdr-left">
                    <div className="cvm-badge" style={{background:"rgba(123,97,255,.1)",border:"1px solid rgba(123,97,255,.3)",color:"#7b61ff"}}>
                      <span className="cvm-badge-dot" style={{background:"#7b61ff",boxShadow:"0 0 7px #7b61ff"}} />
                      Dicoding Indonesia
                    </div>
                    <p className="cvm-section-label" style={{margin:0}}>Sertifikat Kelulusan</p>
                  </div>
                  <div className="cvm-sec-count" style={{color:"rgba(255,255,255,.2)"}}>
                    <strong style={{color:"rgba(123,97,255,.75)"}}>{CV_DATA.dicoding.length}</strong> sertifikat
                  </div>
                </div>
                <div className="dc-certs-grid">
                  {CV_DATA.dicoding.map((cert, i) => (
                    <a key={cert.title}
                      href={cert.certUrl !== "#" ? cert.certUrl : undefined}
                      target="_blank" rel="noopener noreferrer"
                      className="dc-cert-item"
                      style={{"--dc":cert.color,"--dw":`${(cert.rating/5)*100}%`, opacity:dcInView?1:0, translate:dcInView?"0 0":"0 18px", transitionDelay:`${0.04+i*.06}s`, pointerEvents:cert.certUrl==="#"?"none":"auto"} as React.CSSProperties}
                    >
                      <div className="dc-ci-top">
                        <div className="dc-ci-lulus">
                          <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>Lulus
                        </div>
                        <div className="dc-ci-icon">{cert.icon}</div>
                      </div>
                      <div className="dc-ci-title">{cert.title}</div>
                      <div className="dc-ci-rating-wrap">
                        <div className="dc-ci-bar-bg">
                          <div className={`dc-ci-bar-fill${dcBarsOn?" go":""}`} style={{transitionDelay:`${0.12+i*.06}s`}} />
                        </div>
                        <span className="dc-ci-rating-num">★ {cert.rating.toFixed(2)}</span>
                      </div>
                      <div className="dc-ci-meta">
                        <span className="dc-ci-chip">
                          <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                          {cert.duration}
                        </span>
                        <span className="dc-ci-chip dc-ci-chip-lvl">{cert.level}</span>
                        <span className="dc-ci-chip">{cert.modules}</span>
                      </div>
                      {cert.certUrl !== "#" && (
                        <div className="dc-ci-view">
                          <span className="dc-ci-view-link">
                            Lihat
                            <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10"/></svg>
                          </span>
                        </div>
                      )}
                      <div className="dc-ci-num">{String(i+1).padStart(2,"0")}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}