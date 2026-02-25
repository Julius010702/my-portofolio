"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */
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
      degree: "S1 Teknik Informatika",
      school: "Universitas STIKOM Artha Buana Kupang",
      period: "2023 — 2027",
      desc:   "Fokus pada rekayasa perangkat lunak, sistem basis data, dan pemrograman web. IPK: 3.5/4.0",
    },
    {
      degree: "SMA SWASTA PGRI",
      school: "SMAS PGRI Winirai Sabu",
      period: "2020 — 2023",
      desc:   "Jurusan IPA.",
    },
  ],

  skills: [
    { name: "Next.js / React",    level: 90, color: "#0369a1" },
    { name: "TypeScript",         level: 82, color: "#4f46e5" },
    { name: "Node.js",            level: 75, color: "#0369a1" },
    { name: "PostgreSQL / MySQL", level: 78, color: "#be185d" },
    { name: "Tailwind CSS",       level: 88, color: "#4f46e5" },
    { name: "PHP / Laravel",      level: 70, color: "#be185d" },
  ],

  tools: ["Git", "VS Code", "Figma", "Vercel", "Docker", "Postman", "PostgreSQL"],

  languages: [
    { lang: "Indonesian", level: "Native" },
    { lang: "English",    level: "Professional" },
  ],

  projects: [
    {
      title:  "My Portfolio",
      type:   "Personal Portfolio",
      year:   "2024",
      desc:   "Website portofolio pribadi interaktif dengan desain modern dan responsif.",
      tags:   ["Next.js", "TypeScript"],
      color:  "#0369a1",
      github: "https://github.com/Julius010702/my-portofolio",
      demo:   "https://my-portofolio-five-mauve.vercel.app",
    },
    {
      title:  "Sistem Pemesanan Makanan",
      type:   "Full-Stack App",
      year:   "2024",
      desc:   "Platform full-stack pemesanan makanan dengan dashboard admin dan notifikasi real-time.",
      tags:   ["Next.js", "PostgreSQL"],
      color:  "#4f46e5",
      github: "https://github.com/Julius010702/pekasaran",
      demo:   "https://sistempemesanan.free.nf/?i=1",
    },
    {
      title:  "Sistem Penentu Prestasi",
      type:   "DSS System",
      year:   "2023",
      desc:   "Sistem pendukung keputusan berbasis metode SAW untuk penentuan siswa berprestasi.",
      tags:   ["PHP", "MySQL"],
      color:  "#be185d",
      github: "https://github.com/Julius010702/Sistem-Penentu-Prestasi",
      demo:   "https://webpenentuprestasi.free.nf/",
    },
  ],

  dicoding: [
    { title: "Belajar Dasar Pemrograman JavaScript", duration: "46 Jam", rating: 4.85, level: "Dasar",  modules: "11 Modul",  color: "#0369a1", icon: "JS", certUrl: "https://drive.google.com/file/d/1s1g7ziZgwjm4ylxfDT4-jwT9380StIh5/view" },
    { title: "Belajar Dasar AI",                     duration: "10 Jam", rating: 4.67, level: "Dasar",  modules: "39 Modul",  color: "#4f46e5", icon: "AI", certUrl: "https://drive.google.com/file/d/1SPbkXKS9qzWpgROal-V5AWWY-y4fss-S/view" },
    { title: "Belajar Cloud dan Gen AI di AWS",       duration: "18 Jam", rating: 4.62, level: "Dasar",  modules: "99 Modul",  color: "#be185d", icon: "C",  certUrl: "https://drive.google.com/file/d/1EEKY2Slo5WcvCOfSqYV11V8tby6TNCi7/view" },
  ],
};

/* ═══════════════════════════════════════════
   BUILD PRINT HTML — bersih untuk unduh PDF
═══════════════════════════════════════════ */
function buildPrintHTML(photoSrc: string): string {
  const year = new Date().getFullYear();

  const skillBars = CV_DATA.skills.map(s => `
    <div class="skill-item">
      <div class="skill-row">
        <span class="skill-name">${s.name}</span>
        <span class="skill-pct" style="color:${s.color}">${s.level}%</span>
      </div>
      <div class="skill-track">
        <div class="skill-bar" style="width:${s.level}%;background:${s.color}"></div>
      </div>
    </div>`).join("");

  const expItems = CV_DATA.experience.map(e => `
    <div class="exp-item">
      <div class="exp-tl"><div class="exp-dot"></div><div class="exp-line"></div></div>
      <div>
        <div class="exp-role">${e.role}</div>
        <div class="exp-meta"><span>${e.company}</span><span class="sep">·</span><span class="exp-period">${e.period}</span></div>
        <div class="exp-desc">${e.desc}</div>
        <div class="exp-tags">${e.tags.map(t => `<span class="exp-tag">${t}</span>`).join("")}</div>
      </div>
    </div>`).join("");

  const eduItems = CV_DATA.education.map(e => `
    <div class="edu-item">
      <div class="edu-degree">${e.degree}</div>
      <div class="edu-school">${e.school}</div>
      <span class="edu-period">${e.period}</span>
      <div class="edu-desc">${e.desc}</div>
    </div>`).join("");

  const projCards = CV_DATA.projects.map(p => `
    <div class="proj-card" style="--pc:${p.color}">
      <div class="proj-top"><span class="proj-type">${p.type}</span><span class="proj-year">${p.year}</span></div>
      <div class="proj-title">${p.title}</div>
      <div class="proj-desc">${p.desc}</div>
      <div class="proj-tags">${p.tags.map(t => `<span class="proj-tag">${t}</span>`).join("")}</div>
      <div class="proj-links">
        <a href="${p.github}" class="proj-link">GitHub ↗</a>
        <a href="${p.demo}" class="proj-link">Demo ↗</a>
      </div>
    </div>`).join("");

  const dcCards = CV_DATA.dicoding.map(d => `
    <div class="dc-card" style="--dc:${d.color}">
      <div class="dc-top">
        <span class="dc-lulus">✓ Lulus</span>
        <span class="dc-icon">${d.icon}</span>
      </div>
      <div class="dc-title">${d.title}</div>
      <div class="dc-bar-wrap">
        <div class="dc-bar-bg"><div class="dc-bar-fill" style="width:${(d.rating/5)*100}%;background:${d.color}"></div></div>
        <span class="dc-rating">★ ${d.rating.toFixed(2)}</span>
      </div>
      <div class="dc-chips">
        <span class="dc-chip">${d.duration}</span>
        <span class="dc-chip dc-chip-lvl" style="color:${d.color};border-color:${d.color}40;background:${d.color}18">${d.level}</span>
        <span class="dc-chip">${d.modules}</span>
      </div>
      ${d.certUrl !== "#" ? `<a href="${d.certUrl}" class="dc-link" style="color:${d.color}">Lihat Sertifikat ↗</a>` : ""}
    </div>`).join("");

  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>CV — Julius Djami</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Barlow:wght@600;700;800&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--a1:#0369a1;--a2:#4f46e5;--a3:#be185d;--dark:#0f172a;--mid:#334155;--muted:#64748b;--light:#f1f5f9;--border:#e2e8f0;--white:#fff}
html{font-size:9.5pt}
body{font-family:'Inter',Arial,sans-serif;background:#f0f4f8;color:var(--dark);line-height:1.5;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.print-btn{position:fixed;bottom:20px;right:20px;padding:10px 20px;background:var(--a1);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px;box-shadow:0 4px 20px rgba(3,105,161,.4);z-index:999;transition:all .2s}
.print-btn:hover{background:#0284c7;transform:translateY(-2px)}
.page{width:210mm;margin:0 auto;background:#fff;padding:12mm 13mm;box-shadow:0 4px 32px rgba(0,0,0,.12)}
/* HEADER */
.header{display:grid;grid-template-columns:76px 1fr;gap:16px;align-items:center;padding-bottom:12px;border-bottom:2.5px solid var(--dark);margin-bottom:13px}
.avatar{width:76px;height:76px;border-radius:10px;border:2px solid var(--a1);overflow:hidden;background:linear-gradient(135deg,#dbeafe,#e0e7ff);display:flex;align-items:center;justify-content:center;font-family:'Barlow',sans-serif;font-size:22pt;font-weight:800;color:var(--a1);position:relative}
.avatar img{width:100%;height:100%;object-fit:cover;border-radius:8px;position:absolute;inset:0}
.hname{font-family:'Barlow',sans-serif;font-size:24pt;font-weight:800;letter-spacing:.02em;color:var(--dark);line-height:1;margin-bottom:2px}
.htitle{font-size:7.5pt;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--a1);margin-bottom:7px}
.contacts{display:flex;flex-wrap:wrap;gap:5px}
.ci{display:inline-flex;align-items:center;gap:4px;font-size:7.5pt;color:var(--muted);text-decoration:none}
.csep{color:var(--border);font-size:8pt;align-self:center}
/* LAYOUT */
.body{display:grid;grid-template-columns:1fr 150px;gap:16px;align-items:start}
/* SECTION */
.sec{margin-bottom:12px}
.sec:last-child{margin-bottom:0}
.sec-title{font-size:6.5pt;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--a1);display:flex;align-items:center;gap:6px;margin-bottom:7px}
.sec-title::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,var(--a1),transparent)}
/* SUMMARY */
.summary{font-size:8.5pt;color:var(--mid);line-height:1.7;padding:9px 11px;background:#f0f9ff;border-left:3px solid var(--a1);border-radius:0 6px 6px 0}
/* EXP */
.exp-item{display:grid;grid-template-columns:10px 1fr;gap:8px;margin-bottom:10px}
.exp-item:last-child{margin-bottom:0}
.exp-tl{display:flex;flex-direction:column;align-items:center;padding-top:4px}
.exp-dot{width:8px;height:8px;border-radius:50%;background:var(--a1);flex-shrink:0}
.exp-line{flex:1;width:1px;background:var(--border);margin-top:4px}
.exp-item:last-child .exp-line{display:none}
.exp-role{font-size:9pt;font-weight:700;color:var(--dark);margin-bottom:1px}
.exp-meta{display:flex;align-items:center;gap:6px;font-size:7.5pt;color:var(--muted);margin-bottom:4px;flex-wrap:wrap}
.exp-meta .sep{color:var(--border)}
.exp-period{padding:1px 6px;border-radius:99px;background:#e0f2fe;border:1px solid #bae6fd;color:var(--a1);font-size:7pt}
.exp-desc{font-size:8pt;color:var(--mid);line-height:1.65;margin-bottom:5px}
.exp-tags{display:flex;flex-wrap:wrap;gap:4px}
.exp-tag{padding:1px 6px;border-radius:3px;background:var(--light);border:1px solid var(--border);font-size:6.5pt;color:var(--muted);font-weight:500}
/* EDU */
.edu-item{margin-bottom:9px}
.edu-item:last-child{margin-bottom:0}
.edu-degree{font-size:8.5pt;font-weight:700;color:var(--dark);margin-bottom:2px}
.edu-school{font-size:7.5pt;font-weight:600;color:var(--a2);margin-bottom:2px}
.edu-period{display:inline-block;padding:1px 6px;border-radius:99px;background:#ede9fe;border:1px solid #c4b5fd;font-size:6.5pt;color:var(--a2);margin-bottom:3px}
.edu-desc{font-size:7.5pt;color:var(--muted);line-height:1.6}
/* PROJECTS */
.proj-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px}
.proj-card{padding:8px 9px;border:1px solid var(--border);border-radius:6px;position:relative;overflow:hidden;background:#fafafa}
.proj-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2.5px;background:var(--pc)}
.proj-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:4px}
.proj-type{font-size:6pt;color:var(--muted);letter-spacing:.08em;text-transform:uppercase}
.proj-year{font-size:6pt;padding:1px 5px;border-radius:99px;background:var(--light);color:var(--muted);border:1px solid var(--border)}
.proj-title{font-size:8pt;font-weight:700;color:var(--dark);margin-bottom:3px}
.proj-desc{font-size:7pt;color:var(--muted);line-height:1.55;margin-bottom:4px}
.proj-tags{display:flex;flex-wrap:wrap;gap:3px;margin-bottom:4px}
.proj-tag{padding:1px 5px;border-radius:2px;background:var(--light);border:1px solid var(--border);font-size:6pt;color:var(--muted)}
.proj-links{display:flex;gap:6px}
.proj-link{font-size:6.5pt;color:var(--a1);text-decoration:none}
/* SKILLS */
.skill-item{margin-bottom:7px}
.skill-item:last-child{margin-bottom:0}
.skill-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:3px}
.skill-name{font-size:7.5pt;font-weight:600;color:var(--dark)}
.skill-pct{font-size:6.5pt}
.skill-track{height:4px;background:#e2e8f0;border-radius:99px;overflow:hidden}
.skill-bar{height:100%;border-radius:99px}
/* TOOLS */
.tools{display:flex;flex-wrap:wrap;gap:4px}
.tool{padding:2px 7px;border-radius:4px;background:var(--light);border:1px solid var(--border);font-size:7pt;color:var(--mid);font-weight:500}
/* LANGUAGES */
.lang-item{display:flex;justify-content:space-between;align-items:center;padding:4px 7px;border-radius:5px;background:var(--light);border:1px solid var(--border);margin-bottom:4px}
.lang-item:last-child{margin-bottom:0}
.lang-name{font-size:7.5pt;font-weight:500;color:var(--dark)}
.lang-level{font-size:6.5pt;padding:1px 6px;border-radius:99px;background:#fce7f3;border:1px solid #fbcfe8;color:var(--a3)}
/* DICODING */
.dc-section{margin-top:14px;padding-top:10px;border-top:1px solid var(--border)}
.dc-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.dc-badge{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:99px;background:#ede9fe;border:1px solid #c4b5fd;font-size:6.5pt;color:var(--a2);font-weight:700;letter-spacing:.1em;text-transform:uppercase}
.dc-badge-dot{width:5px;height:5px;border-radius:50%;background:var(--a2)}
.dc-count{font-size:7pt;color:var(--muted)}
.dc-count strong{color:var(--a2);font-weight:700}
.dc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.dc-card{padding:7px 7px 6px;border:1px solid var(--border);border-radius:6px;position:relative;overflow:hidden;background:#fafafa}
.dc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2.5px;background:var(--dc)}
.dc-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:4px}
.dc-lulus{display:inline-flex;align-items:center;gap:3px;font-size:5.5pt;letter-spacing:.1em;text-transform:uppercase;color:var(--dc);font-weight:700;padding:1px 5px;border-radius:99px;border:1px solid}
.dc-icon{font-size:6pt;font-weight:800;width:20px;height:20px;display:flex;align-items:center;justify-content:center;border-radius:4px;color:var(--dc);font-family:'Barlow',sans-serif;border:1px solid}
.dc-title{font-size:6.5pt;font-weight:700;color:var(--dark);line-height:1.35;margin-bottom:4px}
.dc-bar-wrap{display:flex;align-items:center;gap:4px;margin-bottom:4px}
.dc-bar-bg{flex:1;height:3px;background:var(--border);border-radius:99px;overflow:hidden}
.dc-bar-fill{height:100%;border-radius:99px}
.dc-rating{font-size:6pt;color:#b45309;white-space:nowrap;font-weight:600}
.dc-chips{display:flex;gap:3px;flex-wrap:wrap}
.dc-chip{font-size:5.5pt;padding:1px 4px;border-radius:99px;border:1px solid var(--border);color:var(--muted)}
.dc-link{font-size:6pt;text-decoration:none;display:inline-flex;align-items:center;gap:2px;margin-top:4px}
/* FOOTER */
.footer{margin-top:12px;padding-top:7px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center}
.footer-name{font-family:'Barlow',sans-serif;font-size:7pt;font-weight:700;color:var(--muted);letter-spacing:.12em;text-transform:uppercase}
.footer-note{font-size:6.5pt;color:var(--muted)}
@page{size:A4;margin:0}
@media print{
  html,body{background:#fff!important}
  .page{margin:0!important;padding:10mm 12mm!important;width:100%!important;box-shadow:none!important}
  .print-btn{display:none!important}
  *{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}
  .proj-card,.dc-card,.edu-item,.exp-item,.sec{page-break-inside:avoid}
}
@media screen{body{padding:20px 0 60px}.page{border-radius:4px;margin:0 auto}}
</style>
</head>
<body>
<button class="print-btn" onclick="window.print()">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
  Cetak / Simpan PDF
</button>
<div class="page">
  <div class="header">
    <div class="avatar">
      JD
      <img src="${photoSrc}" alt="Julius Djami" onerror="this.style.display='none'"/>
    </div>
    <div>
      <div class="hname">JULIUS DJAMI</div>
      <div class="htitle">Full-Stack Web Developer</div>
      <div class="contacts">
        <a href="mailto:juliusbungadjami@gmail.com" class="ci"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>juliusbungadjami@gmail.com</a>
        <span class="csep">·</span>
        <span class="ci"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>+62 852 1618 2664</span>
        <span class="csep">·</span>
        <span class="ci"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>Indonesia</span>
        <span class="csep">·</span>
        <a href="https://github.com/Julius010702" class="ci"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>github.com/Julius010702</a>
        <span class="csep">·</span>
        <a href="https://my-portofolio-five-mauve.vercel.app" class="ci"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>Portfolio ↗</a>
      </div>
    </div>
  </div>
  <div class="body">
    <div>
      <div class="sec"><div class="sec-title">Ringkasan Profil</div><div class="summary">Pengembang web yang termotivasi dan mahasiswa Teknik Informatika dengan pengalaman langsung membangun aplikasi web full-stack. Berfokus pada kode yang bersih, UI yang sempurna piksel, dan arsitektur yang skalabel. Mahir dalam Next.js, TypeScript, PHP, dan manajemen basis data.</div></div>
      <div class="sec"><div class="sec-title">Pengalaman</div>${expItems}</div>
      <div class="sec"><div class="sec-title">Pendidikan</div>${eduItems}</div>
      <div class="sec"><div class="sec-title">Proyek</div><div class="proj-grid">${projCards}</div></div>
      <div class="dc-section">
        <div class="dc-header">
          <div class="dc-badge"><div class="dc-badge-dot"></div>Dicoding Indonesia</div>
          <div class="dc-count"><strong>8</strong> sertifikat kelulusan</div>
        </div>
        <div class="dc-grid">${dcCards}</div>
      </div>
    </div>
    <div>
      <div class="sec"><div class="sec-title">Keahlian</div>${skillBars}</div>
      <div class="sec"><div class="sec-title">Tools</div><div class="tools">${CV_DATA.tools.map(t => `<span class="tool">${t}</span>`).join("")}</div></div>
      <div class="sec"><div class="sec-title">Bahasa</div>${CV_DATA.languages.map(l => `<div class="lang-item"><span class="lang-name">${l.lang}</span><span class="lang-level">${l.level}</span></div>`).join("")}</div>
    </div>
  </div>
  <div class="footer">
    <div class="footer-name">Julius Djami — CV · ${year}</div>
    <div class="footer-note">juliusbungadjami@gmail.com</div>
  </div>
</div>
</body>
</html>`;
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
type CVProps = { isOpen: boolean; onClose: () => void };

export default function CV({ isOpen, onClose }: CVProps) {
  const modalRef  = useRef<HTMLDivElement>(null);
  const cardRef   = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const cur       = useRef({ rx: 0, ry: 0 });
  const tgt       = useRef({ rx: 0, ry: 0 });
  const isHover   = useRef(false);

  const [skillsOn,   setSkillsOn]   = useState(false);
  const [mounted,    setMounted]    = useState(false);
  const [dcInView,   setDcInView]   = useState(false);
  const [dcBarsOn,   setDcBarsOn]   = useState(false);
  const [projInView, setProjInView] = useState(false);
  const dcRef   = useRef<HTMLDivElement>(null);
  const projRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => {
      setMounted(true);
      const t2 = setTimeout(() => setSkillsOn(true), 600);
      return () => clearTimeout(t2);
    }, 50);
    return () => { clearTimeout(t); setMounted(false); setSkillsOn(false); setDcInView(false); setDcBarsOn(false); setProjInView(false); };
  }, [isOpen]);

  useEffect(() => { document.body.style.overflow = isOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [isOpen]);
  useEffect(() => { const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", fn); return () => window.removeEventListener("keydown", fn); }, [onClose]);

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const root = modalRef.current;
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("cv-in"); }), { threshold: 0.08, root });
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
      if (cardRef.current)
        cardRef.current.style.transform = `perspective(1000px) rotateX(${cur.current.rx}deg) rotateY(${cur.current.ry}deg) translateZ(${isHover.current ? 25 : 0}px) scale(${isHover.current ? 1.02 : 1})`;
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

  // Buka jendela baru dengan HTML print-ready lalu trigger print dialog
  const handleDownload = useCallback(() => {
    const html = buildPrintHTML(CV_DATA.photo);
    const win  = window.open("", "_blank", "width=920,height=720");
    if (!win) { alert("Izinkan popup untuk membuka CV. Cek ikon blokir popup di browser."); return; }
    win.document.open();
    win.document.write(html);
    win.document.close();
    // Tunggu font Google Fonts dimuat dulu
    setTimeout(() => { win.focus(); win.print(); }, 900);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;600;800&display=swap');
        .cvm-overlay{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.88);backdrop-filter:blur(16px);display:flex;align-items:flex-start;justify-content:center;padding:1.5rem 1rem 2rem;overflow-y:auto;animation:cvmOvIn .3s ease forwards}
        @keyframes cvmOvIn{from{opacity:0}to{opacity:1}}
        .cvm-box{position:relative;width:min(980px,100%);background:#020408;border:1px solid rgba(255,255,255,.08);border-radius:1.6rem;overflow:hidden;margin:auto;opacity:0;transform:perspective(1000px) rotateX(12deg) translateY(60px) scale(.95);transition:opacity .55s cubic-bezier(.16,1,.3,1),transform .55s cubic-bezier(.16,1,.3,1)}
        .cvm-box.open{opacity:1;transform:none}
        .cvm-box-line{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#00f5c4 30%,#7b61ff 70%,transparent);z-index:2}
        .cvm-grid{position:absolute;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:55px 55px;mask-image:radial-gradient(ellipse 80% 60% at 50% 20%,black,transparent)}
        .cvm-orb{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;z-index:0}
        .cvm-orb-1{width:400px;height:400px;top:-120px;left:-120px;background:radial-gradient(circle,rgba(0,245,196,.08),transparent 70%);animation:cvmFa 9s ease-in-out infinite}
        .cvm-orb-2{width:350px;height:350px;bottom:-80px;right:-80px;background:radial-gradient(circle,rgba(123,97,255,.09),transparent 70%);animation:cvmFb 11s ease-in-out infinite}
        @keyframes cvmFa{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
        @keyframes cvmFb{0%,100%{transform:translateY(0)}50%{transform:translateY(18px)}}
        .cvm-scan{position:absolute;left:0;right:0;height:1px;z-index:1;background:linear-gradient(90deg,transparent,rgba(0,245,196,.45) 50%,transparent);animation:cvmScan 7s ease-in-out infinite;pointer-events:none}
        @keyframes cvmScan{0%{top:0%;opacity:0}5%{opacity:1}95%{opacity:.4}100%{top:100%;opacity:0}}
        .cvm-close{position:absolute;top:1.25rem;right:1.25rem;z-index:10;width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);color:rgba(255,255,255,.45);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .22s}
        .cvm-close:hover{border-color:rgba(255,97,97,.5);color:#ff6161;background:rgba(255,97,97,.08);transform:rotate(90deg)}
        .cvm-scroll{position:relative;z-index:2;padding:2.5rem 2rem 3rem;max-height:90vh;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(0,245,196,.25) transparent}
        .cvm-scroll::-webkit-scrollbar{width:3px}
        .cvm-scroll::-webkit-scrollbar-thumb{background:rgba(0,245,196,.25);border-radius:99px}
        .cvm-topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem}
        .cvm-topbar-label{font-family:'DM Mono',monospace;font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;color:rgba(0,245,196,.6);display:flex;align-items:center;gap:.6rem}
        .cvm-topbar-label::before{content:'';display:block;width:18px;height:1px;background:#00f5c4}
        .cvm-dl-btn{display:inline-flex;align-items:center;gap:.45rem;padding:.45rem 1rem;background:transparent;border:1px solid rgba(0,245,196,.3);border-radius:.4rem;color:#00f5c4;font-family:'DM Mono',monospace;font-size:.58rem;letter-spacing:.08em;cursor:pointer;transition:all .25s;position:relative;overflow:hidden}
        .cvm-dl-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,245,196,.08),transparent);transform:translateX(-100%);transition:transform .3s}
        .cvm-dl-btn:hover::before{transform:translateX(0)}
        .cvm-dl-btn:hover{border-color:rgba(0,245,196,.65);box-shadow:0 0 16px rgba(0,245,196,.15)}
        .cvm-hero{position:relative;will-change:transform;margin-bottom:1.75rem}
        .cvm-hero-inner{position:relative;padding:2rem 2rem 1.75rem;background:linear-gradient(140deg,rgba(255,255,255,.07),rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.09);border-radius:1.2rem;overflow:hidden;transition:border-color .4s,box-shadow .4s}
        .cvm-hero:hover .cvm-hero-inner{border-color:rgba(0,245,196,.3);box-shadow:0 30px 80px rgba(0,0,0,.5),0 0 50px rgba(0,245,196,.08)}
        .cvm-hero-line{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#00f5c4 40%,#7b61ff 70%,transparent)}
        .cvm-hero-glow{position:absolute;top:-70px;right:-70px;width:260px;height:260px;background:radial-gradient(circle,rgba(0,245,196,.12),transparent 70%);pointer-events:none}
        .cvm-hero-sheen{position:absolute;inset:0;border-radius:inherit;background:linear-gradient(135deg,rgba(255,255,255,.08) 0%,transparent 40%);pointer-events:none}
        .cvm-hero-body{position:relative;z-index:1;display:grid;grid-template-columns:auto 1fr;gap:1.75rem;align-items:center}
        .cvm-avatar{width:90px;height:90px;border-radius:.9rem;flex-shrink:0;border:2px solid rgba(0,245,196,.4);box-shadow:0 0 0 4px rgba(0,245,196,.08),0 0 28px rgba(0,245,196,.2);position:relative;overflow:hidden;background:linear-gradient(135deg,rgba(0,245,196,.15),rgba(123,97,255,.15))}
        .cvm-avatar::after{content:'';position:absolute;inset:-2px;border-radius:inherit;background:conic-gradient(from 0deg,transparent 0%,rgba(0,245,196,.5) 25%,transparent 50%);animation:cvmSpin 4s linear infinite;z-index:0}
        @keyframes cvmSpin{to{transform:rotate(360deg)}}
        .cvm-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(1.8rem,4.5vw,3rem);letter-spacing:.05em;line-height:1;background:linear-gradient(110deg,white,rgba(255,255,255,.75));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:.2rem}
        .cvm-job-title{font-family:'DM Mono',monospace;font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;background:linear-gradient(90deg,#00f5c4,#7b61ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:.65rem}
        .cvm-tagline{font-size:.8rem;color:rgba(255,255,255,.35);line-height:1.6;margin-bottom:1rem}
        .cvm-contacts{display:flex;flex-wrap:wrap;gap:.4rem}
        .cvm-chip{display:inline-flex;align-items:center;gap:.32rem;padding:.25rem .6rem;border-radius:99px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);font-family:'DM Mono',monospace;font-size:.54rem;color:rgba(255,255,255,.42);letter-spacing:.04em;transition:all .22s;text-decoration:none}
        .cvm-chip:hover{border-color:rgba(0,245,196,.4);color:#00f5c4}
        .cvm-cols{display:grid;grid-template-columns:1fr 280px;gap:1.25rem}
        .cvm-card{position:relative;padding:1.5rem 1.4rem;background:linear-gradient(145deg,rgba(255,255,255,.05),rgba(255,255,255,.01));border:1px solid rgba(255,255,255,.07);border-radius:1rem;overflow:hidden;transition:border-color .3s;margin-bottom:1.1rem}
        .cvm-card:last-child{margin-bottom:0}
        .cvm-card:hover{border-color:rgba(0,245,196,.16)}
        .cvm-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,var(--cc,rgba(0,245,196,.5)),transparent);opacity:.5}
        .cvm-sec-lbl{font-family:'DM Mono',monospace;font-size:.56rem;letter-spacing:.24em;text-transform:uppercase;color:rgba(0,245,196,.65);margin-bottom:1.1rem;display:flex;align-items:center;gap:.55rem}
        .cvm-sec-lbl::before{content:'';display:block;width:14px;height:1px;background:#00f5c4}
        .cvm-summary{font-size:.82rem;color:rgba(255,255,255,.38);line-height:1.85}
        .cvm-exp-item{margin-bottom:1.35rem;position:relative;padding-left:1rem}
        .cvm-exp-item:last-child{margin-bottom:0}
        .cvm-exp-item::before{content:'';position:absolute;left:0;top:6px;bottom:-1.35rem;width:1px;background:linear-gradient(to bottom,rgba(0,245,196,.4),transparent)}
        .cvm-exp-item:last-child::before{display:none}
        .cvm-exp-dot{position:absolute;left:-3.5px;top:5px;width:8px;height:8px;border-radius:50%;background:#00f5c4;box-shadow:0 0 7px rgba(0,245,196,.6);border:2px solid #020408}
        .cvm-exp-role{font-size:.86rem;font-weight:700;color:white;margin-bottom:.1rem}
        .cvm-exp-meta{display:flex;gap:.6rem;align-items:center;flex-wrap:wrap;font-family:'DM Mono',monospace;font-size:.54rem;color:rgba(255,255,255,.28);letter-spacing:.05em;margin-bottom:.45rem}
        .cvm-exp-period{padding:.12rem .45rem;border-radius:99px;background:rgba(0,245,196,.07);border:1px solid rgba(0,245,196,.2);color:rgba(0,245,196,.7);font-size:.52rem}
        .cvm-exp-desc{font-size:.76rem;color:rgba(255,255,255,.33);line-height:1.7;margin-bottom:.5rem}
        .cvm-exp-tags{display:flex;flex-wrap:wrap;gap:.28rem}
        .cvm-exp-tag{padding:.12rem .42rem;border-radius:.2rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);font-family:'DM Mono',monospace;font-size:.5rem;color:rgba(255,255,255,.26)}
        .cvm-edu-item{margin-bottom:1.2rem}
        .cvm-edu-item:last-child{margin-bottom:0}
        .cvm-edu-degree{font-size:.85rem;font-weight:700;color:white;margin-bottom:.12rem}
        .cvm-edu-school{font-family:'DM Mono',monospace;font-size:.56rem;color:rgba(123,97,255,.8);letter-spacing:.06em;margin-bottom:.35rem}
        .cvm-edu-period{display:inline-block;padding:.1rem .42rem;border-radius:99px;background:rgba(123,97,255,.07);border:1px solid rgba(123,97,255,.22);font-family:'DM Mono',monospace;font-size:.5rem;color:rgba(123,97,255,.7);margin-bottom:.35rem}
        .cvm-edu-desc{font-size:.73rem;color:rgba(255,255,255,.28);line-height:1.6}
        .cvm-skill-item{margin-bottom:.9rem}
        .cvm-skill-item:last-child{margin-bottom:0}
        .cvm-skill-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:.3rem}
        .cvm-skill-name{font-size:.75rem;color:rgba(255,255,255,.6);font-weight:500}
        .cvm-skill-pct{font-family:'DM Mono',monospace;font-size:.55rem;color:var(--sc);letter-spacing:.05em}
        .cvm-skill-track{height:3px;background:rgba(255,255,255,.06);border-radius:99px;overflow:hidden}
        .cvm-skill-bar{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--sc),color-mix(in srgb,var(--sc) 55%,transparent));box-shadow:0 0 7px var(--sc);width:0;transition:width 1.3s cubic-bezier(.16,1,.3,1)}
        .cvm-skill-bar.go{width:var(--sw)}
        .cvm-tools{display:flex;flex-wrap:wrap;gap:.35rem}
        .cvm-tool{padding:.26rem .58rem;border-radius:.3rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);font-family:'DM Mono',monospace;font-size:.55rem;color:rgba(255,255,255,.35);transition:all .2s}
        .cvm-tool:hover{background:rgba(0,245,196,.07);border-color:rgba(0,245,196,.28);color:#00f5c4;transform:translateY(-2px)}
        .cvm-lang-item{display:flex;justify-content:space-between;align-items:center;padding:.55rem .7rem;border-radius:.45rem;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);margin-bottom:.35rem;transition:all .2s}
        .cvm-lang-item:last-child{margin-bottom:0}
        .cvm-lang-item:hover{border-color:rgba(255,97,216,.2)}
        .cvm-lang-name{font-size:.78rem;color:rgba(255,255,255,.55)}
        .cvm-lang-level{font-family:'DM Mono',monospace;font-size:.52rem;color:rgba(255,97,216,.75);padding:.1rem .38rem;border-radius:99px;background:rgba(255,97,216,.07);border:1px solid rgba(255,97,216,.2)}
        .cv-reveal{opacity:0;transform:translateY(24px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
        .cv-reveal.d1{transition-delay:.08s}.cv-reveal.d2{transition-delay:.18s}.cv-reveal.d3{transition-delay:.28s}.cv-reveal.d4{transition-delay:.38s}.cv-reveal.d5{transition-delay:.48s}.cv-reveal.d6{transition-delay:.56s}
        .cv-in.cv-reveal{opacity:1;transform:translateY(0)}
        .cvm-divider{height:1px;margin:0 0 1.25rem;background:linear-gradient(90deg,transparent,rgba(0,245,196,.18),rgba(123,97,255,.18),transparent)}
        .cvm-sec-card{position:relative;padding:1.4rem;background:linear-gradient(145deg,rgba(255,255,255,.05),rgba(255,255,255,.01));border-radius:1rem;overflow:hidden;margin-top:1.1rem}
        .cvm-sec-card::after{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.025),transparent);animation:secScan 5s ease-in-out infinite}
        @keyframes secScan{0%{left:-60%}100%{left:160%}}
        .cvm-sec-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.1rem;flex-wrap:wrap;gap:.5rem}
        .cvm-sec-hdr-left{display:flex;align-items:center;gap:.65rem}
        .cvm-badge{display:inline-flex;align-items:center;gap:.4rem;padding:.25rem .7rem;border-radius:2rem;font-family:'DM Mono',monospace;font-size:.52rem;letter-spacing:.16em;text-transform:uppercase}
        .cvm-badge-dot{width:5px;height:5px;border-radius:50%;animation:bdgPulse 1.8s ease-in-out infinite}
        @keyframes bdgPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.6)}}
        .cvm-sec-count{font-family:'DM Mono',monospace;font-size:.56rem;color:rgba(255,255,255,.2)}
        .cvm-sec-count strong{color:rgba(0,245,196,.75)}
        .cvp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem}
        .cvp-card{position:relative;overflow:hidden;background:linear-gradient(135deg,rgba(255,255,255,.045),rgba(255,255,255,.01));border:1px solid rgba(255,255,255,.07);border-radius:.9rem;padding:1.05rem 1rem .9rem;display:block;text-decoration:none;cursor:pointer;transition:transform .28s cubic-bezier(.16,1,.3,1),border-color .28s,box-shadow .28s}
        .cvp-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,var(--pc),transparent);opacity:0;transition:opacity .28s}
        .cvp-card::after{content:'';position:absolute;inset:0;background:linear-gradient(110deg,transparent 35%,color-mix(in srgb,var(--pc) 7%,transparent) 50%,transparent 65%);transform:translateX(-100%);transition:transform .5s}
        .cvp-card:hover{transform:translateY(-4px);border-color:color-mix(in srgb,var(--pc) 28%,transparent);box-shadow:0 14px 32px rgba(0,0,0,.45)}
        .cvp-card:hover::before{opacity:1}.cvp-card:hover::after{transform:translateX(100%)}
        .cvp-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:.5rem}
        .cvp-type{font-family:'DM Mono',monospace;font-size:.46rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.22)}
        .cvp-yr{font-family:'DM Mono',monospace;font-size:.46rem;color:var(--pc);opacity:.7;background:color-mix(in srgb,var(--pc) 10%,transparent);border:1px solid color-mix(in srgb,var(--pc) 22%,transparent);padding:.08rem .36rem;border-radius:99px}
        .cvp-title{font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:.04em;color:white;line-height:1.15;margin-bottom:.4rem;transition:color .22s}
        .cvp-card:hover .cvp-title{color:var(--pc)}
        .cvp-desc{font-size:.63rem;color:rgba(255,255,255,.28);line-height:1.55;margin-bottom:.55rem}
        .cvp-tags{display:flex;gap:.25rem;flex-wrap:wrap;margin-bottom:.55rem}
        .cvp-tag{font-family:'DM Mono',monospace;font-size:.44rem;padding:.08rem .32rem;border-radius:.2rem;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);color:rgba(255,255,255,.28)}
        .cvp-footer{border-top:1px solid rgba(255,255,255,.05);padding-top:.42rem;display:flex;gap:.5rem}
        .cvp-link{display:inline-flex;align-items:center;gap:.22rem;font-family:'DM Mono',monospace;font-size:.45rem;letter-spacing:.07em;text-transform:uppercase;color:var(--pc);opacity:0;transform:translateX(-3px);transition:opacity .22s,transform .22s;text-decoration:none}
        .cvp-card:hover .cvp-link{opacity:.8;transform:translateX(0)}
        .cvp-link+.cvp-link{transition-delay:.05s}
        .cvp-num{position:absolute;bottom:.4rem;right:.6rem;font-family:'Bebas Neue',sans-serif;font-size:2.2rem;color:var(--pc);opacity:.04;line-height:1;pointer-events:none;user-select:none;transition:opacity .28s}
        .cvp-card:hover .cvp-num{opacity:.09}
        .dc-certs-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:.6rem}
        .dc-cert-item{position:relative;overflow:hidden;background:linear-gradient(135deg,rgba(255,255,255,.04),rgba(255,255,255,.01));border:1px solid rgba(255,255,255,.07);border-radius:.75rem;padding:.85rem .8rem .7rem;text-decoration:none;display:block;cursor:pointer;transition:transform .28s cubic-bezier(.16,1,.3,1),border-color .28s,box-shadow .28s}
        .dc-cert-item::before{content:'';position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,transparent,var(--dc),transparent);opacity:0;transition:opacity .28s}
        .dc-cert-item::after{content:'';position:absolute;inset:0;background:linear-gradient(110deg,transparent 35%,color-mix(in srgb,var(--dc) 7%,transparent) 50%,transparent 65%);transform:translateX(-100%);transition:transform .5s}
        .dc-cert-item:hover{transform:translateY(-3px);border-color:color-mix(in srgb,var(--dc) 28%,transparent);box-shadow:0 10px 24px rgba(0,0,0,.4)}
        .dc-cert-item:hover::before{opacity:1}.dc-cert-item:hover::after{transform:translateX(100%)}
        .dc-ci-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:.5rem}
        .dc-ci-lulus{display:inline-flex;align-items:center;gap:.28rem;font-family:'DM Mono',monospace;font-size:.44rem;letter-spacing:.12em;text-transform:uppercase;color:var(--dc);background:color-mix(in srgb,var(--dc) 10%,transparent);border:1px solid color-mix(in srgb,var(--dc) 22%,transparent);padding:.12rem .38rem;border-radius:2rem}
        .dc-ci-icon{font-family:'Bebas Neue',sans-serif;font-size:.7rem;width:24px;height:24px;border-radius:.35rem;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--dc) 12%,transparent);border:1px solid color-mix(in srgb,var(--dc) 22%,transparent);color:var(--dc);transition:transform .35s cubic-bezier(.34,1.56,.64,1)}
        .dc-cert-item:hover .dc-ci-icon{transform:rotate(-8deg) scale(1.12)}
        .dc-ci-title{font-size:.62rem;font-weight:700;color:rgba(255,255,255,.8);line-height:1.35;margin-bottom:.45rem;transition:color .22s}
        .dc-cert-item:hover .dc-ci-title{color:var(--dc)}
        .dc-ci-rating-wrap{display:flex;align-items:center;gap:.4rem;margin-bottom:.4rem}
        .dc-ci-bar-bg{flex:1;height:2px;border-radius:99px;background:rgba(255,255,255,.07);overflow:hidden}
        .dc-ci-bar-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--dc),color-mix(in srgb,var(--dc) 55%,white));box-shadow:0 0 5px var(--dc);width:0;transition:width 1.1s cubic-bezier(.16,1,.3,1)}
        .dc-ci-bar-fill.go{width:var(--dw)}
        .dc-ci-rating-num{font-family:'DM Mono',monospace;font-size:.48rem;color:rgba(255,200,60,.8);white-space:nowrap}
        .dc-ci-meta{display:flex;gap:.25rem;flex-wrap:wrap}
        .dc-ci-chip{font-family:'DM Mono',monospace;font-size:.43rem;padding:.1rem .32rem;border-radius:99px;border:1px solid rgba(255,255,255,.08);color:rgba(255,255,255,.28)}
        .dc-ci-chip-lvl{color:var(--dc);opacity:.75;border-color:color-mix(in srgb,var(--dc) 22%,transparent);background:color-mix(in srgb,var(--dc) 6%,transparent)}
        .dc-ci-view{display:flex;justify-content:flex-end;margin-top:.4rem;padding-top:.38rem;border-top:1px solid rgba(255,255,255,.05)}
        .dc-ci-view-link{font-family:'DM Mono',monospace;font-size:.44rem;letter-spacing:.08em;text-transform:uppercase;color:var(--dc);opacity:0;transform:translateX(-3px);display:inline-flex;align-items:center;gap:.22rem;transition:opacity .22s,transform .22s}
        .dc-cert-item:hover .dc-ci-view-link{opacity:.8;transform:translateX(0)}
        .dc-ci-num{position:absolute;bottom:.35rem;right:.55rem;font-family:'Bebas Neue',sans-serif;font-size:2rem;color:var(--dc);opacity:.04;line-height:1;pointer-events:none;user-select:none;transition:opacity .28s}
        .dc-cert-item:hover .dc-ci-num{opacity:.09}
        @media(max-width:720px){.cvm-cols{grid-template-columns:1fr}.cvm-hero-body{grid-template-columns:1fr;text-align:center}.cvm-contacts{justify-content:center}.cvm-scroll{padding:1.5rem 1rem 2rem}.cvm-topbar{flex-direction:column;gap:.75rem;align-items:flex-start}.dc-certs-grid{grid-template-columns:repeat(2,1fr)}.cvp-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:480px){.dc-certs-grid,.cvp-grid{grid-template-columns:1fr 1fr}}
      `}</style>

      <div className="cvm-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
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
              <button className="cvm-dl-btn" onClick={handleDownload}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download CV (PDF)
              </button>
            </div>

            {/* HERO */}
            <div className="cvm-hero cv-reveal" ref={cardRef}
              onMouseMove={onMouseMove}
              onMouseEnter={() => { isHover.current = true; }}
              onMouseLeave={() => { isHover.current = false; tgt.current = { rx: 0, ry: 0 }; }}>
              <div className="cvm-hero-inner">
                <div className="cvm-hero-line" /><div className="cvm-hero-glow" /><div className="cvm-hero-sheen" />
                <div className="cvm-hero-body">
                  <div className="cvm-avatar">
                    <Image src={CV_DATA.photo} alt={CV_DATA.name} width={90} height={90}
                      style={{ objectFit: "cover", borderRadius: ".9rem", position: "relative", zIndex: 1 }} priority />
                  </div>
                  <div>
                    <h1 className="cvm-name">{CV_DATA.name}</h1>
                    <p className="cvm-job-title">{CV_DATA.title}</p>
                    <p className="cvm-tagline">{CV_DATA.tagline}</p>
                    <div className="cvm-contacts">
                      {[
                        { href: `mailto:${CV_DATA.email}`, label: CV_DATA.email },
                        { href: `https://${CV_DATA.github}`, label: CV_DATA.github },
                        { href: `https://${CV_DATA.website}`, label: "Portfolio ↗" },
                      ].map(c => <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="cvm-chip">{c.label}</a>)}
                      <span className="cvm-chip">{CV_DATA.phone}</span>
                      <span className="cvm-chip">{CV_DATA.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cvm-divider" />

            {/* COLS */}
            <div className="cvm-cols">
              <div>
                <div className="cvm-card cv-reveal d1">
                  <p className="cvm-sec-lbl">Profile Summary</p>
                  <p className="cvm-summary">{CV_DATA.summary}</p>
                </div>
                <div className="cvm-card cv-reveal d2" style={{ "--cc": "rgba(0,245,196,.5)" } as React.CSSProperties}>
                  <p className="cvm-sec-lbl">Experience</p>
                  {CV_DATA.experience.map((exp, i) => (
                    <div className="cvm-exp-item" key={i}>
                      <div className="cvm-exp-dot" />
                      <div>
                        <div className="cvm-exp-role">{exp.role}</div>
                        <div className="cvm-exp-meta"><span>{exp.company}</span><span>·</span><span className="cvm-exp-period">{exp.period}</span></div>
                        <p className="cvm-exp-desc">{exp.desc}</p>
                        <div className="cvm-exp-tags">{exp.tags.map(t => <span key={t} className="cvm-exp-tag">{t}</span>)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cvm-card cv-reveal d3" style={{ "--cc": "rgba(123,97,255,.5)" } as React.CSSProperties}>
                  <p className="cvm-sec-lbl">Education</p>
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
                <div className="cvm-card cv-reveal d2" style={{ "--cc": "rgba(0,245,196,.4)" } as React.CSSProperties}>
                  <p className="cvm-sec-lbl">Skills</p>
                  {CV_DATA.skills.map(s => (
                    <div className="cvm-skill-item" key={s.name} style={{ "--sc": s.color, "--sw": `${s.level}%` } as React.CSSProperties}>
                      <div className="cvm-skill-row">
                        <span className="cvm-skill-name">{s.name}</span>
                        <span className="cvm-skill-pct">{s.level}%</span>
                      </div>
                      <div className="cvm-skill-track"><div className={`cvm-skill-bar${skillsOn ? " go" : ""}`} /></div>
                    </div>
                  ))}
                </div>
                <div className="cvm-card cv-reveal d3" style={{ "--cc": "rgba(255,97,216,.4)" } as React.CSSProperties}>
                  <p className="cvm-sec-lbl">Tools & Tech</p>
                  <div className="cvm-tools">{CV_DATA.tools.map(t => <span key={t} className="cvm-tool">{t}</span>)}</div>
                </div>
                <div className="cvm-card cv-reveal d4" style={{ "--cc": "rgba(123,97,255,.4)" } as React.CSSProperties}>
                  <p className="cvm-sec-lbl">Languages</p>
                  {CV_DATA.languages.map(l => (
                    <div className="cvm-lang-item" key={l.lang}>
                      <span className="cvm-lang-name">{l.lang}</span>
                      <span className="cvm-lang-level">{l.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PROJECTS */}
            <div className="cv-reveal d5" ref={projRef}>
              <div className="cvm-divider" style={{ marginTop: "1.1rem" }} />
              <div className="cvm-sec-card" style={{ border: "1px solid rgba(0,245,196,.15)" }}>
                <div className="cvm-sec-hdr">
                  <div className="cvm-sec-hdr-left">
                    <div className="cvm-badge" style={{ background: "rgba(0,245,196,.08)", border: "1px solid rgba(0,245,196,.25)", color: "#00f5c4" }}>
                      <span className="cvm-badge-dot" style={{ background: "#00f5c4", boxShadow: "0 0 7px #00f5c4" }} />
                      Selected Projects
                    </div>
                  </div>
                  <div className="cvm-sec-count"><strong>{CV_DATA.projects.length}</strong> proyek</div>
                </div>
                <div className="cvp-grid">
                  {CV_DATA.projects.map((proj, i) => (
                    <div key={proj.title} className="cvp-card"
                      onClick={() => window.open(proj.demo, "_blank", "noopener,noreferrer")}
                      style={{ "--pc": proj.color, opacity: projInView ? 1 : 0, translate: projInView ? "0 0" : "0 22px", transitionDelay: `${0.08 + i * .12}s`, cursor: "pointer" } as React.CSSProperties}>
                      <div className="cvp-top"><span className="cvp-type">{proj.type}</span><span className="cvp-yr">{proj.year}</span></div>
                      <div className="cvp-title">{proj.title}</div>
                      <div className="cvp-desc">{proj.desc}</div>
                      <div className="cvp-tags">{proj.tags.map(t => <span key={t} className="cvp-tag">{t}</span>)}</div>
                      <div className="cvp-footer">
                        <a href={proj.github} target="_blank" rel="noopener noreferrer" className="cvp-link" onClick={e => e.stopPropagation()}>GitHub</a>
                        <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="cvp-link" onClick={e => e.stopPropagation()}>Demo ↗</a>
                      </div>
                      <div className="cvp-num">{String(i + 1).padStart(2, "0")}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* DICODING */}
            <div className="cv-reveal d6" ref={dcRef}>
              <div className="cvm-divider" style={{ marginTop: "1.1rem" }} />
              <div className="cvm-sec-card" style={{ border: "1px solid rgba(123,97,255,.18)" }}>
                <div className="cvm-sec-hdr">
                  <div className="cvm-sec-hdr-left">
                    <div className="cvm-badge" style={{ background: "rgba(123,97,255,.1)", border: "1px solid rgba(123,97,255,.3)", color: "#7b61ff" }}>
                      <span className="cvm-badge-dot" style={{ background: "#7b61ff", boxShadow: "0 0 7px #7b61ff" }} />
                      Dicoding Indonesia
                    </div>
                  </div>
                  <div className="cvm-sec-count" style={{ color: "rgba(255,255,255,.2)" }}>
                    <strong style={{ color: "rgba(123,97,255,.75)" }}>{CV_DATA.dicoding.length}</strong> sertifikat
                  </div>
                </div>
                <div className="dc-certs-grid">
                  {CV_DATA.dicoding.map((cert, i) => (
                    <a key={cert.title}
                      href={cert.certUrl !== "#" ? cert.certUrl : undefined}
                      target="_blank" rel="noopener noreferrer"
                      className="dc-cert-item"
                      style={{ "--dc": cert.color, "--dw": `${(cert.rating / 5) * 100}%`, opacity: dcInView ? 1 : 0, translate: dcInView ? "0 0" : "0 18px", transitionDelay: `${0.04 + i * .06}s`, pointerEvents: cert.certUrl === "#" ? "none" : "auto" } as React.CSSProperties}>
                      <div className="dc-ci-top">
                        <div className="dc-ci-lulus"><svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>Lulus</div>
                        <div className="dc-ci-icon">{cert.icon}</div>
                      </div>
                      <div className="dc-ci-title">{cert.title}</div>
                      <div className="dc-ci-rating-wrap">
                        <div className="dc-ci-bar-bg"><div className={`dc-ci-bar-fill${dcBarsOn ? " go" : ""}`} style={{ transitionDelay: `${0.12 + i * .06}s` }} /></div>
                        <span className="dc-ci-rating-num">★ {cert.rating.toFixed(2)}</span>
                      </div>
                      <div className="dc-ci-meta">
                        <span className="dc-ci-chip">{cert.duration}</span>
                        <span className="dc-ci-chip dc-ci-chip-lvl">{cert.level}</span>
                        <span className="dc-ci-chip">{cert.modules}</span>
                      </div>
                      {cert.certUrl !== "#" && (
                        <div className="dc-ci-view"><span className="dc-ci-view-link">Lihat <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M7 7h10v10" /></svg></span></div>
                      )}
                      <div className="dc-ci-num">{String(i + 1).padStart(2, "0")}</div>
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