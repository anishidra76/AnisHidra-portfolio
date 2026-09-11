import { useEffect, useRef, useState } from "react";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Qualifications from "./pages/Qualifications";
import Achievements from "./pages/Achievements.jsx";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Footer from "./components/Footer.jsx";
import Login from "./layouts/Login.jsx";
import Dashboard from "./layouts/Dashboard.jsx";

 
/* ============================================================================
   Anis Hidra — Portfolio
   App.jsx is the page shell: it owns the things that don't belong to any one
   section — the aurora canvas background, the certificate modal overlay, and
   the back-to-top button — and composes the nine section components below.
   ============================================================================ */
 
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 
function App() {


  const isDashboard = window.location.pathname === "/dashboard";
  const isLogin = window.location.pathname === "/login";
  const token = localStorage.getItem("token");
  if(isLogin) {
    return <Login />
  }
  if(isDashboard) {
    if(!token) {
      window.location.href = "/login";
      return null;
    }
    return <Dashboard />
  }


  const canvasRef = useRef(null);
  const modalCloseRef = useRef(null);
  const lastFocusedElRef = useRef(null);
 
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState("null");
  const [backToTopVisible, setBackToTopVisible] = useState(false);
 
  /* AURORA WAVE FIELD — animated canvas background, ported from script.js */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
 
    const HORIZON_RATIO = 0.7;
    let stars = [];
    let rafId = null;
    const mouse = { tx: 0, ty: 0, sx: 0, sy: 0 };
 
    const NUM_SKY_LINES = 7;
    const skyLines = Array.from({ length: NUM_SKY_LINES }).map((_, i) => {
      const p = i / (NUM_SKY_LINES - 1);
      return {
        baseYRatio: 0.14 + p * 0.36,
        ampA: 58 - p * 32,
        ampB: 24 - p * 12,
        freqA: 0.0017 + p * 0.0005,
        freqB: 0.0009 + p * 0.0003,
        speed: 0.1 + p * 0.05,
        phase: i * 1.8,
        lineWidth: 1 + (1 - p) * 0.5,
        opacity: 0.12 + (1 - p) * 0.1,
        glow: 4 + (1 - p) * 4,
        depth: p,
        colorStops: p < 0.5 ? ["#3b82f6", "#8b5cf6"] : ["#8b5cf6", "#d946ef"],
      };
    });
 
    const heroGlow = {
      baseYRatio: 0.58, ampA: 68, ampB: 32, freqA: 0.0018, freqB: 0.0009,
      speed: 0.16, phase: 0.6, lineWidth: 10, opacity: 0.22, glow: 30, depth: 1,
      colorStops: ["#22d3ee", "#38bdf8", "#d946ef"],
    };
    const heroCore = {
      baseYRatio: 0.58, ampA: 68, ampB: 32, freqA: 0.0018, freqB: 0.0009,
      speed: 0.16, phase: 0.6, lineWidth: 2, opacity: 0.95, glow: 16, depth: 1,
      colorStops: ["#67e8f9", "#38bdf8", "#e879f9"],
    };
 
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateStars();
      if (prefersReducedMotion) renderFrame(0);
    }
 
    function generateStars() {
      const horizonY = canvas.height * HORIZON_RATIO;
      const area = canvas.width * horizonY;
      const count = Math.min(200, Math.floor(area / 5000));
      stars = Array.from({ length: count }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * horizonY * 0.94,
        r: Math.random() * 1.1 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.25,
        speed: Math.random() * 1.4 + 0.4,
        phase: Math.random() * Math.PI * 2,
        bright: Math.random() < 0.07,
      }));
    }
 
    function drawBackground(w, h, horizonY) {
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#03040f");
      g.addColorStop(Math.max(0, (horizonY / h) * 0.65), "#060a1f");
      g.addColorStop(horizonY / h, "#0a0e27");
      g.addColorStop(1, "#000000");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }
 
    function drawStars(t) {
      stars.forEach((s) => {
        const alpha = prefersReducedMotion
          ? s.baseAlpha
          : s.baseAlpha * (0.55 + 0.45 * Math.sin(t * s.speed + s.phase));
        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = s.bright ? "#bfe8ff" : "#e4e8ff";
        if (s.bright) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = "#38bdf8";
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.bright ? s.r * 1.8 : s.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }
 
    function drawWaveLine(cfg, t, w, h) {
      const parallaxX = mouse.sx * 22 * cfg.depth;
      const parallaxY = mouse.sy * 12 * cfg.depth;
      const step = 6;
 
      ctx.save();
      ctx.globalAlpha = cfg.opacity;
      ctx.lineWidth = cfg.lineWidth;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.shadowBlur = cfg.glow;
      ctx.shadowColor = cfg.colorStops[Math.floor(cfg.colorStops.length / 2)];
 
      const gradient = ctx.createLinearGradient(0, 0, w, 0);
      const n = cfg.colorStops.length;
      cfg.colorStops.forEach((c, idx) => gradient.addColorStop(n === 1 ? 0 : idx / (n - 1), c));
      ctx.strokeStyle = gradient;
 
      ctx.beginPath();
      for (let x = -step; x <= w + step; x += step) {
        const y =
          cfg.baseYRatio * h +
          Math.sin(x * cfg.freqA + t * cfg.speed + cfg.phase) * cfg.ampA +
          Math.sin(x * cfg.freqB - t * cfg.speed * 0.7 + cfg.phase * 1.3) * cfg.ampB +
          parallaxX * Math.sin(x * 0.001) +
          parallaxY;
        if (x === -step) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();
    }
 
    function drawGlowBlobs(w, h, horizonY) {
      const blobs = [
        { x: w * 0.1, y: h * 0.97, r: w * 0.3, color: "rgba(217,70,239,0.10)" },
        { x: w * 0.88, y: h * 0.95, r: w * 0.28, color: "rgba(45,212,191,0.08)" },
      ];
      blobs.forEach((b) => {
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, horizonY, w, h - horizonY);
        ctx.clip();
        ctx.fillStyle = grad;
        ctx.fillRect(0, horizonY, w, h - horizonY);
        ctx.restore();
      });
    }
 
    function drawReflection(w, h, horizonY) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, horizonY, w, h - horizonY);
      ctx.clip();
      ctx.globalAlpha = 0.28;
      ctx.translate(0, horizonY * 2);
      ctx.scale(1, -1);
      ctx.drawImage(canvas, 0, 0, w, h);
      ctx.restore();
 
      const fade = ctx.createLinearGradient(0, horizonY, 0, h);
      fade.addColorStop(0, "rgba(3,4,15,0)");
      fade.addColorStop(1, "rgba(3,4,15,1)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, horizonY, w, h - horizonY);
 
      ctx.save();
      ctx.globalAlpha = 0.45;
      ctx.strokeStyle = "rgba(125, 211, 252, 0.6)";
      ctx.lineWidth = 1;
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#38bdf8";
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(w, horizonY);
      ctx.stroke();
      ctx.restore();
    }
 
    function renderFrame(elapsedMs) {
      const w = canvas.width, h = canvas.height;
      if (w === 0 || h === 0) return;
      const horizonY = h * HORIZON_RATIO;
      const t = elapsedMs * 0.001;
 
      mouse.sx += (mouse.tx - mouse.sx) * 0.05;
      mouse.sy += (mouse.ty - mouse.sy) * 0.05;
 
      drawBackground(w, h, horizonY);
      drawStars(t);
      skyLines.forEach((cfg) => drawWaveLine(cfg, t, w, h));
      drawWaveLine(heroGlow, t, w, h);
      drawWaveLine(heroCore, t, w, h);
      drawGlowBlobs(w, h, horizonY);
      drawReflection(w, h, horizonY);
    }
 
    function loop(now) {
      renderFrame(now);
      rafId = requestAnimationFrame(loop);
    }
    function startLoop() {
      if (rafId === null && !prefersReducedMotion) rafId = requestAnimationFrame(loop);
    }
    function stopLoop() {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }
 
    function handleMouseMove(e) {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
    }
 
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);
    resize();
 
    if (prefersReducedMotion) {
      renderFrame(0);
    } else {
      startLoop();
    }
 
    return () => {
      stopLoop();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);
 
  /* CERTIFICATE MODAL — Escape key + focus handling */
  useEffect(() => {
    function handleKeydown(e) {
      if (e.key === "Escape" && modalOpen) closeModal();
    }
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [modalOpen]);
 
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      modalCloseRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
  }, [modalOpen]);
 
  function openModal(imgSrc, e) {
    lastFocusedElRef.current = e?.currentTarget ?? document.activeElement;
    setModalSrc(imgSrc);
    setModalOpen(true);
  }
 
  function closeModal() {
    setModalOpen(false);
    setModalSrc("");
    lastFocusedElRef.current?.focus();
  }
 
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) closeModal();
  }
 
  /* BACK TO TOP BUTTON */
  useEffect(() => {
    function handleScroll() {
      setBackToTopVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }
 
  return (
    <>

    <style>{`#root { display: contents; }`}</style>
 
      <a className="skip-link" href="#home">Skip to content</a>
 
      {/* AURORA CANVAS */}
      <canvas id="aurora-canvas" aria-hidden="true" ref={canvasRef}></canvas>
 
      <Header />
 
      {/* MAIN CONTENT AREA */}
      <div className="main-wrapper">
        <main className="content">
          <Home />
          <About />
          <Skills />
          <Qualifications openModal={openModal} />
          <Achievements />
          <Projects />
          <Services />
          <Contact />
        </main>
 
        <Footer />
      </div>
 
      {/* BACK TO TOP */}
      <button id="backToTop" className={`back-to-top${backToTopVisible ? ' visible' : ''}`} aria-label="Back to top" onClick={scrollToTop}>
        <i className="fa-solid fa-arrow-up"></i>
      </button>
 
      {/* CERTIFICATE MODAL */}
      <div className={`modal${modalOpen ? ' open' : ''}`} id="certModal" role="dialog" aria-modal="true" aria-label="Certificate preview" onClick={handleBackdropClick}>
        <button type="button" className="modal-close" id="modalClose" aria-label="Close preview" ref={modalCloseRef} onClick={closeModal}>&times;</button>
        <img id="modalImg" src={modalSrc} alt="Enlarged certificate view" onClick={(e) => e.stopPropagation()} />
      </div>
    </>
  );
}

export default App