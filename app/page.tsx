import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Skills from "@/components/Skills";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <>
      <style>{`
        /* ── Global reset & scroll ── */
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 64px;
        }

        body {
          background: #020408;
          color: white;
          margin: 0;
          overflow-x: hidden;
        }

        /* ── Section transitions ── */
        /* Each section fades into the next via a subtle gradient border */
        .section-connector {
          position: relative;
          height: 0;
        }
        .section-connector::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, rgba(0,245,196,0.3), transparent);
          top: 0;
        }

        /* ── Custom scrollbar ── */
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: #020408;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(0,245,196,0.3);
          border-radius: 99px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0,245,196,0.6);
        }

        /* ── Selection color ── */
        ::selection {
          background: rgba(0,245,196,0.2);
          color: #00f5c4;
        }
      `}</style>

      <Navbar />

      <main style={{ background: "#020408", color: "white", overflowX: "hidden" }}>
        {/* Hero */}
        <Hero />

        {/* Connector */}
        <div className="section-connector" />

        {/* About */}
        <About />

        {/* Connector */}
        <div className="section-connector" style={{ "--connector-color": "#7b61ff" } as React.CSSProperties} />

        {/* Skills */}
        <Skills />

        {/* Connector */}
        <div className="section-connector" style={{ "--connector-color": "#ff61d8" } as React.CSSProperties} />

        {/* Projects */}
        <Projects />

        {/* Connector */}
        <div className="section-connector" />

        {/* Contact */}
        <Contact />
      </main>
    </>
  );
}