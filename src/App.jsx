import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════
   APEXLY — DIGITAL GROWTH CONSULTING
   Cinematic scroll website
   ═══════════════════════════════════════════════════ */

const B = {
  name: "APEXLY",
  full: "Apexly Consulting",
  tagline: "Digital Growth Consulting",
  email: "hello@apexlyconsulting.com",
  domain: "apexlyconsulting.com",
  phone: "",
  ac: "#00d4aa",
  acLight: "#5aedc7",
  acDark: "#00a88a",
};

/* ── Hooks ── */
function useReveal(threshold = 0.14) {
  const ref = useRef(null);
  const [vis, set] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { set(true); o.unobserve(el); } },
      { threshold }
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return [ref, vis];
}

function useParallax(speed = 0.3) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const fn = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setOffset((rect.top + rect.height / 2 - window.innerHeight / 2) * speed);
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [speed]);
  return [ref, offset];
}

function Counter({ end, suffix = "", active }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / 2000, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, end]);
  return <>{val}{suffix}</>;
}

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/* ═══════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav role="navigation" aria-label="Main navigation" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      padding: "0 clamp(20px,4vw,56px)", height: 72,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      background: scrolled ? "rgba(7,10,12,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,212,170,0.06)" : "none",
      transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
    }}>
      <a onClick={() => go("hero")} aria-label="Home" style={{
        fontFamily: "'Outfit',sans-serif", fontSize: 24, fontWeight: 800,
        letterSpacing: 4, color: "#fff", cursor: "pointer", textDecoration: "none",
      }}>
        APEXLY<span style={{ color: B.ac }}>.</span>
      </a>

      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {["services", "approach", "about", "faq"].map((id) => (
          <a key={id} onClick={() => go(id)} className="dsk-lnk" style={{
            fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 600,
            letterSpacing: 2, textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)", cursor: "pointer",
            transition: "color 0.3s", textDecoration: "none", display: "none",
          }}>{id}</a>
        ))}
        <button onClick={() => go("contact")} style={{
          fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 700,
          letterSpacing: 1.5, textTransform: "uppercase",
          padding: "11px 28px", background: "transparent",
          border: `1px solid ${B.ac}`, color: B.ac,
          borderRadius: 0, cursor: "pointer", transition: "all 0.3s",
        }}
        onMouseEnter={e => { e.target.style.background = B.ac; e.target.style.color = "#070a0c"; }}
        onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = B.ac; }}
        >Let's Talk</button>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════ */
function Hero() {
  const [show, setShow] = useState(false);
  const [pRef, pOff] = useParallax(0.15);
  useEffect(() => { setTimeout(() => setShow(true), 200); }, []);

  return (
    <header id="hero" ref={pRef} style={{
      position: "relative", minHeight: "100vh", display: "flex",
      flexDirection: "column", justifyContent: "center", alignItems: "center",
      background: "#070a0c", overflow: "hidden", padding: "0 24px",
    }}>
      {/* Grain */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      }} />

      {/* Geometric accent lines */}
      <div style={{
        position: "absolute", top: "-20%", right: "-8%", width: "55vw", height: "140vh",
        border: "1px solid rgba(0,212,170,0.035)",
        transform: `rotate(-14deg) translateY(${pOff}px)`, zIndex: 1, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "-10%", left: "-5%", width: "35vw", height: "120vh",
        border: "1px solid rgba(0,212,170,0.02)",
        transform: `rotate(8deg) translateY(${pOff * 0.6}px)`, zIndex: 1, pointerEvents: "none",
      }} />

      {/* Radial glow */}
      <div style={{
        position: "absolute", top: "35%", left: "50%", transform: "translate(-50%,-50%)",
        width: "50vw", height: "50vw", maxWidth: 600, maxHeight: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,212,170,0.06), transparent 65%)",
        filter: "blur(40px)", zIndex: 1,
      }} />

      {/* Corner accent */}
      <div style={{
        position: "absolute", top: 100, left: "clamp(20px,5vw,60px)",
        width: 40, height: 40, borderLeft: `1px solid ${B.ac}`, borderTop: `1px solid ${B.ac}`,
        opacity: show ? 0.25 : 0, transition: "opacity 2s ease 1.5s", zIndex: 2,
      }} />

      <div style={{
        position: "relative", zIndex: 3, textAlign: "center", maxWidth: 1000,
        transform: `translateY(${pOff}px)`,
      }}>
        {/* Overline */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 16,
          marginBottom: 40,
          opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(12px)",
          transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s",
        }}>
          <div style={{ width: 40, height: 1, background: B.ac, opacity: 0.4 }} />
          <span style={{
            fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: 4, textTransform: "uppercase", color: B.ac,
          }}>Digital Growth Consulting</span>
          <div style={{ width: 40, height: 1, background: B.ac, opacity: 0.4 }} />
        </div>

        <h1 style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: "clamp(3.5rem,11vw,9rem)",
          lineHeight: 0.92, letterSpacing: "0.02em",
          color: "#fff", margin: 0, fontWeight: 400,
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0) scale(1)" : "translateY(60px) scale(0.96)",
          transition: "all 1.4s cubic-bezier(0.16,1,0.3,1) 0.5s",
        }}>
          WE BUILD
          <br />
          <span style={{
            background: `linear-gradient(135deg, ${B.ac}, ${B.acLight})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>DIGITAL</span>
          {" "}GROWTH
        </h1>

        <p style={{
          fontFamily: "'Lora',serif", fontSize: "clamp(1.05rem,2.2vw,1.4rem)",
          color: "rgba(255,255,255,0.35)", lineHeight: 1.8,
          maxWidth: 520, margin: "36px auto 0", fontWeight: 400, fontStyle: "italic",
          opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(20px)",
          transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.9s",
        }}>
          Websites that convert. Marketing that reaches the right people.
          Automation that gives you back your time.
        </p>

        <div style={{
          display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", marginTop: 52,
          opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(20px)",
          transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 1.2s",
        }}>
          <button onClick={() => go("contact")} style={{
            fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 700,
            letterSpacing: 2, textTransform: "uppercase",
            padding: "18px 44px", background: B.ac, color: "#070a0c",
            border: "none", borderRadius: 0, cursor: "pointer",
            transition: "all 0.3s", boxShadow: `0 0 50px rgba(0,212,170,0.15)`,
          }}
          onMouseEnter={e => { e.target.style.background = B.acLight; e.target.style.boxShadow = "0 0 60px rgba(0,212,170,0.25)"; }}
          onMouseLeave={e => { e.target.style.background = B.ac; e.target.style.boxShadow = "0 0 50px rgba(0,212,170,0.15)"; }}
          >Book a Free Call</button>

          <button onClick={() => go("services")} style={{
            fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 600,
            letterSpacing: 2, textTransform: "uppercase",
            padding: "18px 44px", background: "transparent",
            color: "rgba(255,255,255,0.5)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 0, cursor: "pointer", transition: "all 0.3s",
          }}
          onMouseEnter={e => { e.target.style.borderColor = "rgba(0,212,170,0.3)"; e.target.style.color = B.ac; }}
          onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.color = "rgba(255,255,255,0.5)"; }}
          >See Our Work ↓</button>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10, zIndex: 3,
        opacity: show ? 0.25 : 0, transition: "opacity 2s ease 2s",
      }}>
        <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 9, letterSpacing: 4, color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${B.ac}, transparent)`, animation: "breathe 2.5s ease infinite" }} />
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════
   BRAND STATEMENT
   ═══════════════════════════════════════════════════ */
function BrandStatement() {
  const [ref, vis] = useReveal();
  return (
    <section ref={ref} style={{
      padding: "clamp(80px,12vw,160px) 24px", background: "#0a0e10",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
        fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(120px,22vw,320px)",
        color: "rgba(0,212,170,0.015)", lineHeight: 1, letterSpacing: 12, pointerEvents: "none",
      }}>APEX</div>

      <div style={{
        maxWidth: 780, margin: "0 auto", position: "relative", zIndex: 2,
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(50px)",
        transition: "all 1.2s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{ width: 48, height: 1, background: B.ac, marginBottom: 40, opacity: 0.4 }} />
        <h2 style={{
          fontFamily: "'Lora',serif", fontSize: "clamp(1.6rem,3.8vw,2.8rem)",
          color: "rgba(255,255,255,0.85)", lineHeight: 1.55, fontWeight: 400, margin: 0,
        }}>
          Most businesses know they need a stronger digital presence — but between
          outdated websites, invisible search rankings, and hours wasted on
          repetitive tasks, it's hard to know <em style={{ color: B.ac, fontStyle: "italic" }}>where to begin</em>.
        </h2>
        <p style={{
          fontFamily: "'Outfit',sans-serif", fontSize: 15, color: "rgba(255,255,255,0.3)",
          lineHeight: 1.9, marginTop: 32, maxWidth: 600,
        }}>
          That's where Apexly comes in. We're a focused digital consulting studio that
          partners with businesses to build real, measurable online growth — through
          design, strategy, and modern technology. No jargon. No bloat. Just results.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════════════ */
function ServiceBlock({ num, title, subtitle, desc, details, deliverables, idx }) {
  const [ref, vis] = useReveal(0.12);
  const isEven = idx % 2 === 0;

  return (
    <div ref={ref} style={{
      display: "flex", flexWrap: "wrap", gap: "clamp(32px,5vw,80px)",
      alignItems: "flex-start", marginBottom: "clamp(80px,10vw,140px)",
      flexDirection: isEven ? "row" : "row-reverse",
      opacity: vis ? 1 : 0,
      transform: vis ? "translateX(0)" : `translateX(${isEven ? -60 : 60}px)`,
      transition: "all 1.1s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div style={{ flex: "1 1 320px" }}>
        <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(72px,12vw,140px)", color: "rgba(0,212,170,0.05)", lineHeight: 0.85, display: "block" }}>{num}</span>
        <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2rem,5vw,3.4rem)", color: "#fff", lineHeight: 1.0, letterSpacing: 2, margin: "-20px 0 12px", whiteSpace: "pre-line" }}>{title}</h3>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: B.ac, margin: "0 0 20px" }}>{subtitle}</p>
        <p style={{ fontFamily: "'Lora',serif", fontSize: 19, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>{desc}</p>
      </div>
      <div style={{ flex: "1 1 360px" }}>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14.5, color: "rgba(255,255,255,0.4)", lineHeight: 1.85, margin: "0 0 28px", paddingTop: 8 }}>{details}</p>
        <div style={{ borderTop: "1px solid rgba(0,212,170,0.1)", paddingTop: 24 }}>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.25)", margin: "0 0 16px" }}>What You Get</p>
          {deliverables.map((d, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 14, padding: "10px 0",
              borderBottom: i < deliverables.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(12px)",
              transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.4 + i * 0.08}s`,
            }}>
              <span style=={{ color: B.ac, fontSize: 8, marginTop: 7, flexShrink: 0 }}>▶</span>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Services() {
  const [hRef, hVis] = useReveal();
  const services = [
    {
      num: "01", title: "WEBSITE DESIGN\n& DEVELOPMENT", subtitle: "Your 24/7 Sales Engine",
      desc: "A beautiful website means nothing if it doesn\u2019t convert. We design and build sites that look exceptional and turn visitors into paying customers.",
      details: "Every website starts with strategy \u2014 understanding your audience, your goals, what action you want visitors to take. We craft a custom design that reflects your brand, build it on modern technology for speed and reliability, and optimize every page for search engines from day one. From concept to launch, we handle everything \u2014 and make sure you can manage it after.",
      deliverables: ["Custom-designed pages tailored to your brand and audience", "Mobile-first responsive design across all devices", "On-page SEO foundations \u2014 meta tags, structure, speed", "Contact forms, booking systems, and lead capture", "Google Analytics and conversion tracking setup", "Content management system for easy self-updates", "Post-launch support and training walkthrough"],
    },
    {
      num: "02", title: "DIGITAL MARKETING\n& SEO", subtitle: "Get Found. Get Chosen.",
      desc: "Visibility is everything. We build strategies that put your business in front of the right people \u2014 on Google, social media, and beyond.",
      details: "We start with a deep audit of your current online presence \u2014 where you rank, where competitors rank, and where the opportunities are. From there, we build a tailored strategy combining SEO, Google and Meta advertising, social media management, and email marketing. Everything is tracked and reported monthly. No vanity metrics \u2014 we focus on leads, calls, and revenue impact.",
      deliverables: ["Comprehensive audit of your current online footprint", "Google Business Profile setup and optimization", "Keyword research and on-page SEO implementation", "Google Ads and Meta Ads campaign management", "Social media content strategy and scheduling", "Email marketing setup \u2014 sequences, campaigns, nurturing", "Monthly reports with clear, actionable insights", "Competitor analysis and positioning recommendations"],
    },
    {
      num: "03", title: "AI & BUSINESS\nAUTOMATION", subtitle: "Work Smarter. Scale Faster.",
      desc: "The businesses that win aren\u2019t working harder \u2014 they\u2019re automating the repetitive and focusing on what matters.",
      details: "We audit your daily operations and identify every task that can be automated \u2014 follow-up emails, scheduling, invoicing, lead routing, customer support, data entry. Then we build systems using Zapier, Make, HubSpot, GoHighLevel, and AI assistants. Most clients save 10 to 20 hours per week. We also train your team so systems don\u2019t depend on us.",
      deliverables: ["Full operations audit identifying automation opportunities", "CRM selection, setup, and pipeline configuration", "Automated email and SMS follow-up sequences", "AI-powered chatbot for customer inquiries", "Workflow automation connecting your tools", "Custom dashboard for key business metrics", "Team training on all new tools and workflows", "Ongoing optimization as your needs evolve"],
    },
  ];

  return (
    <section id="services" aria-label="Our services" style={{ padding: "clamp(80px,10vw,140px) 24px", background: "#070a0c" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div ref={hRef} style={{
          marginBottom: "clamp(60px,8vw,100px)",
          opacity: hVis ? 1 : 0, transform: hVis ? "translateY(0)" : "translateY(40px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <div style={{ width: 32, height: 1, background: B.ac, opacity: 0.4 }} />
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: B.ac }}>What We Do</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.4rem,6vw,4.5rem)", color: "#fff", lineHeight: 1.0, letterSpacing: 3, margin: 0 }}>
            THREE DISCIPLINES.
            <br />ONE MISSION: <span style={{ color: B.ac }}>YOUR GROWTH.</span>
          </h2>
        </div>
        {services.map((s, i) => <ServiceBlock key={i} idx={i} {...s} />)}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CINEMATIC DIVIDER
   ═══════════════════════════════════════════════════ */
function CinematicDivider() {
  const [ref, vis] = useReveal();
  return (
    <div style={{ position: "relative", padding: "clamp(100px,14vw,200px) 24px", background: "#050808", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 50%, rgba(0,212,170,0.025), transparent 70%)` }} />
      <div ref={ref} style={{
        maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2,
        opacity: vis ? 1 : 0, transform: vis ? "scale(1)" : "scale(0.94)",
        transition: "all 1.2s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{ fontFamily: "'Lora',serif", fontSize: 56, color: B.ac, opacity: 0.15, lineHeight: 1, marginBottom: -10 }}>"</div>
        <p style={{ fontFamily: "'Lora',serif", fontSize: "clamp(1.4rem,3vw,2.2rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, fontStyle: "italic", margin: 0 }}>
          We don't just build websites or run ads.
          We build systems that let business owners
          focus on what they love — while their digital
          presence works in the background, every single day.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   APPROACH
   ═══════════════════════════════════════════════════ */
function Approach() {
  const [ref, vis] = useReveal();
  const steps = [
    { n: "01", title: "Discovery", desc: "A free, no-pressure conversation about your business, goals, and challenges. We listen first.", time: "Day 1" },
    { n: "02", title: "Strategy", desc: "We audit your presence, research your market, and deliver a custom roadmap with clear recommendations.", time: "Day 3\u20137" },
    { n: "03", title: "Execution", desc: "We build, launch, and implement everything. Regular updates and full visibility at every stage.", time: "Week 1\u20134" },
    { n: "04", title: "Growth", desc: "We stay. Optimizing, reporting, and finding new opportunities to grow your results month after month.", time: "Ongoing" },
  ];

  return (
    <section id="approach" style={{ padding: "clamp(80px,10vw,140px) 24px", background: "#0a0e10" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div ref={ref} style={{
          marginBottom: 72, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <div style={{ width: 32, height: 1, background: B.ac, opacity: 0.4 }} />
            <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: B.ac }}>How It Works</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.2rem,6vw,4rem)", color: "#fff", lineHeight: 1.0, letterSpacing: 3, margin: 0 }}>
            NO SURPRISES.<br /><span style={{ color: B.ac }}>JUST CLARITY.</span>
          </h2>
        </div>
        {steps.map((s, i) => {
          const [sRef, sVis] = useReveal(0.2);
          return (
            <div key={i} ref={sRef} style={{
              display: "flex", gap: "clamp(20px,4vw,40px)", alignItems: "flex-start", marginBottom: 56,
              opacity: sVis ? 1 : 0, transform: sVis ? "translateX(0)" : "translateX(-40px)",
              transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
            }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 52, color: "rgba(0,212,170,0.07)", lineHeight: 1, flexShrink: 0, minWidth: 60 }}>{s.n}</div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 10 }}>
                  <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, color: "#fff", letterSpacing: 2, margin: 0 }}>{s.title}</h3>
                  <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 2, color: B.ac, background: "rgba(0,212,170,0.06)", border: "1px solid rgba(0,212,170,0.12)", padding: "4px 14px" }}>{s.time}</span>
                </div>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, color: "rgba(255,255,255,0.38)", lineHeight: 1.8, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════════ */
function About() {
  const [ref, vis] = useReveal();
  const values = [
    { title: "Earn Every Project", desc: "Trust is built, not bought. Every engagement is a chance to prove ourselves." },
    { title: "Radical Transparency", desc: "You always know what we\u2019re doing, why, and how it\u2019s performing. No black boxes." },
    { title: "Results First, Always", desc: "We measure success in leads, revenue, and time saved \u2014 never vanity metrics." },
    { title: "Built for the Long Run", desc: "We\u2019re building Apexly one exceptional project at a time. Your growth fuels ours." },
  ];

  return (
    <section id="about" style={{ padding: "clamp(80px,10vw,140px) 24px", background: "#0a0e10", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: "-5%", top: "50%", transform: "translateY(-50%)", fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(100px,18vw,280px)", color: "rgba(0,212,170,0.012)", lineHeight: 1, letterSpacing: 10, pointerEvents: "none" }}>APEXLY</div>

      <div ref={ref} style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "clamp(40px,6vw,80px)", alignItems: "flex-start",
          opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)",
          transition: "all 1.1s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <div style={{ flex: "1 1 400px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
              <div style={{ width: 32, height: 1, background: B.ac, opacity: 0.4 }} />
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: B.ac }}>Who We Are</span>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2rem,5vw,3.2rem)", color: "#fff", lineHeight: 1.0, letterSpacing: 3, margin: "0 0 28px" }}>
              A STUDIO IN ITS<br /><span style={{ color: B.ac }}>FOUNDING CHAPTER.</span>
            </h2>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.85, margin: "0 0 20px" }}>
              We're in the early days — and we think that's our greatest advantage.
              Every project gets our full, undivided attention. Every client gets
              direct access to the people doing the work. No layers, no account managers,
              no passing you off to a junior team.
            </p>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.85, margin: "0 0 20px" }}>
              We're building Apexly one exceptional project at a time. Our reputation is
              everything — which means your results aren't just important, they're
              existential. When you win, we build our name.
            </p>
            <p style={{ fontFamily: "'Lora',serif", fontSize: 19, color: "rgba(255,255,255,0.6)", fontStyle: "italic", lineHeight: 1.6, margin: 0 }}>
              We don't have decades of case studies yet — but we have the hunger,
              the skill, and the commitment to over-deliver on every engagement.
            </p>
          </div>
          <div style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", gap: 24 }}>
            {values.map((v, i) => (
              <div key={i} style={{
                padding: "24px 28px", borderLeft: `1px solid rgba(0,212,170,${vis ? 0.2 : 0})`,
                opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(24px)",
                transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.12}s`,
              }}>
                <h4 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>{v.title}</h4>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════ */
function FAQ() {
  const [ref, vis] = useReveal();
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "What types of businesses do you work with?", a: "We work with businesses of all sizes and across all industries \u2014 from local shops and restaurants to e-commerce brands, professional services, startups, and established companies looking to modernize their digital presence." },
    { q: "How do I know which services I need?", a: "That\u2019s exactly what the free discovery call is for. We\u2019ll talk through your goals, assess where you stand, and recommend only what will actually move the needle. No upselling, no pressure." },
    { q: "How long does it take to see results?", a: "Websites launch in 2\u20134 weeks. Paid ads can drive leads within the first week. SEO takes 3\u20136 months for meaningful traction. Automation saves time from day one." },
    { q: "You\u2019re a newer studio. Why should I trust you?", a: "Because your project isn\u2019t one of hundreds on our plate \u2014 it\u2019s one of a handful. That means faster communication, more personal attention, and a team genuinely invested in your results. We also offer a satisfaction guarantee on all project work." },
    { q: "Do you lock clients into contracts?", a: "No. For ongoing services we work month-to-month. You stay because the results are worth it, not because a contract says you have to." },
    { q: "Do you work remotely?", a: "Absolutely. Everything is handled via video calls, screen shares, and collaboration tools. We work with businesses across all time zones." },
    { q: "What if I already have a website?", a: "We do audits and optimization projects regularly. Sometimes a few strategic changes outperform a full rebuild. We\u2019ll tell you which approach makes more sense for your situation." },
  ];

  return (
    <section id="faq" style={{ padding: "clamp(80px,10vw,140px) 24px", background: "#070a0c" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: 56, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1)" }}>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: B.ac }}>FAQ</span>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2rem,5vw,3.2rem)", color: "#fff", letterSpacing: 3, margin: "20px 0 0" }}>
            QUESTIONS? <span style={{ color: B.ac }}>ANSWERED.</span>
          </h2>
        </div>
        {faqs.map((f, i) => {
          const [fRef, fVis] = useReveal(0.3);
          return (
            <div key={i} ref={fRef} style={{ borderBottom: "1px solid rgba(0,212,170,0.06)", opacity: fVis ? 1 : 0, transform: fVis ? "translateY(0)" : "translateY(12px)", transition: `all 0.5s ease ${i * 0.05}s` }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: "100%", padding: "22px 0", background: "none", border: "none", cursor: "pointer",
                display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left",
                fontFamily: "'Outfit',sans-serif", fontSize: 15, fontWeight: 600,
                color: open === i ? B.ac : "rgba(255,255,255,0.65)", transition: "color 0.3s",
              }}>
                <span style={{ paddingRight: 20 }}>{f.q}</span>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, color: B.ac, transform: open === i ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.4s", flexShrink: 0 }}>+</span>
              </button>
              <div style={{ maxHeight: open === i ? 250 : 0, overflow: "hidden", transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14.5, color: "rgba(255,255,255,0.38)", lineHeight: 1.8, padding: "0 0 24px", margin: 0 }}>{f.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════ */
function Contact() {
  const [ref, vis] = useReveal();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", business: "", goals: "" });

  const labelStyle = { fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.25)", display: "block", marginBottom: 10 };
  const inputStyle = {
    width: "100%", padding: "14px 18px", background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(0,212,170,0.08)", color: "#fff",
    fontFamily: "'Outfit',sans-serif", fontSize: 15, outline: "none", transition: "border-color 0.3s",
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please fill in your name and email.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/xrbqwdlo", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          business: form.business,
          goals: form.goals,
          _replyto: form.email,
        }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError("Something went wrong. Please try again or email us directly at hello@apexlyconsulting.com");
      }
    } catch {
      setError("Unable to send — please email hello@apexlyconsulting.com directly.");
    }
    setLoading(false);
  };

  return (
    <section id="contact" style={{
      padding: "clamp(80px,10vw,140px) 24px",
      background: "radial-gradient(ellipse at 50% 20%, #0d1614 0%, #070a0c 60%)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,170,0.035), transparent 65%)", filter: "blur(40px)" }} />

      <div ref={ref} style={{
        maxWidth: 580, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2,
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: "all 1.1s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 28 }}>
          <div style={{ width: 32, height: 1, background: B.ac, opacity: 0.4 }} />
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: B.ac }}>Start Here</span>
          <div style={{ width: 32, height: 1, background: B.ac, opacity: 0.4 }} />
        </div>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.4rem,7vw,4.5rem)", color: "#fff", lineHeight: 1.0, letterSpacing: 3, margin: "0 0 16px" }}>
          LET'S BUILD<br /><span style={{ color: B.ac }}>SOMETHING GREAT.</span>
        </h2>
        <p style={{ fontFamily: "'Lora',serif", fontSize: 18, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, fontStyle: "italic", marginBottom: 48 }}>
          Book a free discovery call. Twenty minutes. No pitch, no commitment {"\u2014"} just an honest conversation about where your business could go.
        </p>

        {!sent ? (
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,170,0.1)", padding: "clamp(28px,4vw,44px)", textAlign: "left" }}>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Your Name</label>
              <input placeholder="John Smith" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(0,212,170,0.3)"}
                onBlur={e => e.target.style.borderColor = "rgba(0,212,170,0.08)"} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Email</label>
              <input type="email" placeholder="john@business.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(0,212,170,0.3)"}
                onBlur={e => e.target.style.borderColor = "rgba(0,212,170,0.08)"} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Business Name</label>
              <input placeholder="Smith & Co." value={form.business} onChange={e => setForm({ ...form, business: e.target.value })} style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(0,212,170,0.3)"}
                onBlur={e => e.target.style.borderColor = "rgba(0,212,170,0.08)"} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Tell us about your goals</label>
              <textarea placeholder="I need help with..." rows={3} value={form.goals} onChange={e => setForm({ ...form, goals: e.target.value })} style={{ ...inputStyle, resize: "vertical", fontFamily: "'Outfit',sans-serif" }}
                onFocus={e => e.target.style.borderColor = "rgba(0,212,170,0.3)"}
                onBlur={e => e.target.style.borderColor = "rgba(0,212,170,0.08)"} />
            </div>
            {error && <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: "#ff6b6b", marginBottom: 16, textAlign: "center" }}>{error}</p>}
            <button onClick={handleSubmit} disabled={loading} style={{
              width: "100%", padding: "18px", marginTop: 8,
              fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 700,
              letterSpacing: 2, textTransform: "uppercase",
              background: loading ? "rgba(0,212,170,0.5)" : B.ac, color: "#070a0c", border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s", boxShadow: "0 0 40px rgba(0,212,170,0.12)",
            }}
            onMouseEnter={e => { if (!loading) e.target.style.background = B.acLight; }}
            onMouseLeave={e => { if (!loading) e.target.style.background = B.ac; }}
            >{loading ? "Sending..." : "Book My Free Discovery Call \u2192"}</button>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.15)", textAlign: "center", marginTop: 20 }}>No spam {"\u00B7"} No obligation {"\u00B7"} Response within 24 hours</p>
          </div>
        ) : (
          <div style={{ background: "rgba(0,212,170,0.03)", border: "1px solid rgba(0,212,170,0.12)", padding: "60px 40px", textAlign: "center" }}>
            <div style={{ width: 48, height: 48, margin: "0 auto 24px", border: `2px solid ${B.ac}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: B.ac, fontSize: 24 }}>{"\u2713"}</span>
            </div>
            <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, color: "#fff", letterSpacing: 3, margin: "0 0 12px" }}>MESSAGE RECEIVED</h3>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
              We'll reach out within 24 hours to schedule your free discovery call.
              Excited to learn about your business!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer role="contentinfo" style={{ padding: "48px 24px", background: "#040606", borderTop: "1px solid rgba(0,212,170,0.06)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
        <div>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: 4 }}>APEXLY<span style={{ color: B.ac }}>.</span></span>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.2)", marginTop: 6 }}>{B.tagline}</p>
        </div>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.15)" }}>
          © 2026 {B.full}. All rights reserved. · {B.email}
        </p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════ */
export default function App() {
  return (
    <div style={{ overflowX: "hidden", background: "#070a0c" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lora:ital,wght@0,400;0,600;1,400&family=Outfit:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
        body{background:#070a0c;color:#fff}
        ::placeholder{color:rgba(255,255,255,0.18)}
        ::selection{background:rgba(0,212,170,0.3);color:#fff}
        textarea{font-family:inherit}
        @keyframes breathe{0%,100%{opacity:0.2;transform:scaleY(1)}50%{opacity:0.6;transform:scaleY(1.15)}}
        @media(min-width:768px){.dsk-lnk{display:inline-block!important}.dsk-lnk:hover{color:#00d4aa!important}}
      `}</style>
      <Nav />
      <Hero />
      <BrandStatement />
      <Services />
      <CinematicDivider />
      <Approach />
      <About />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
