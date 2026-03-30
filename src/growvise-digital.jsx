import { useState, useRef, useEffect } from "react";
import { Search, FileText, BarChart2, Megaphone, LineChart, MessageCircle, X, Send, Zap, Globe, ArrowRight, CheckCircle, Sparkles, Brain, Target, Award, Cpu, Shield, Clock, BookOpen, Mail, Copy } from "lucide-react";

const BRAND = {
  navy: "#002B5B", navyLight: "#003a7a", orange: "#FF9933", orangeLight: "#ffad5c",
  sky: "#1DA1F2", bg: "#F9FAFB", dark: "#111827", muted: "#6B7280", card: "#FFFFFF", border: "#E5E7EB",
};

async function callClaude(prompt, systemPrompt = "") {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, systemPrompt }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.text || 'Unable to generate response.';
}

function Loader({ text = "AI is working..." }) {
  const [dots, setDots] = useState(".");
  useEffect(() => {
    const i = setInterval(() => setDots(d => d.length < 3 ? d + "." : "."), 400);
    return () => clearInterval(i);
  }, []);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, color: BRAND.orange, fontFamily: "'DM Sans'" }}>
      <div style={{ width: 18, height: 18, border: `2px solid ${BRAND.orange}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <span style={{ fontSize: 14 }}>{text}{dots}</span>
    </div>
  );
}

function Badge({ children, color = BRAND.orange }) {
  return <span style={{ background: color + "18", color, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, fontFamily: "'Poppins'" }}>{children}</span>;
}

function GlowBtn({ children, onClick, secondary = false, small = false, style = {} }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ background: secondary ? "transparent" : (hover ? BRAND.orangeLight : BRAND.orange), color: secondary ? (hover ? BRAND.orange : BRAND.navy) : "#fff", border: secondary ? `1.5px solid ${hover ? BRAND.orange : BRAND.border}` : "none", borderRadius: 10, padding: small ? "8px 18px" : "13px 28px", fontFamily: "'Poppins'", fontWeight: 600, fontSize: small ? 13 : 15, cursor: "pointer", transition: "all 0.18s", display: "inline-flex", alignItems: "center", gap: 8, transform: hover ? "translateY(-1px)" : "none", boxShadow: hover && !secondary ? `0 8px 24px ${BRAND.orange}44` : "none", ...style }}>
      {children}
    </button>
  );
}

function Card({ children, style = {}, hover = false }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => hover && setH(true)} onMouseLeave={() => hover && setH(false)}
      style={{ background: BRAND.card, border: `1px solid ${h ? BRAND.orange + "44" : BRAND.border}`, borderRadius: 16, padding: "24px 28px", transition: "all 0.2s", transform: h ? "translateY(-3px)" : "none", boxShadow: h ? "0 12px 40px #00000012" : "0 2px 8px #00000008", ...style }}>
      {children}
    </div>
  );
}

function IconBox({ icon: Icon, color = BRAND.orange, size = 22 }) {
  return <div style={{ width: 48, height: 48, borderRadius: 12, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={size} color={color} /></div>;
}

function ResultBox({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ background: "#F0F9FF", border: `1px solid ${BRAND.sky}44`, borderRadius: 12, padding: 20, marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Sparkles size={14} color={BRAND.sky} />
          <span style={{ fontSize: 12, color: BRAND.sky, fontWeight: 600, fontFamily: "'Poppins'" }}>AI OUTPUT</span>
        </div>
        <button onClick={() => { navigator.clipboard?.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          style={{ background: "none", border: "none", cursor: "pointer", color: BRAND.muted, display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontFamily: "'DM Sans'" }}>
          <Copy size={13} /> {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div style={{ fontSize: 14, color: BRAND.dark, lineHeight: 1.75, fontFamily: "'DM Sans'", whiteSpace: "pre-wrap" }}>{text}</div>
    </div>
  );
}

function InputField({ label, placeholder, value, onChange, type = "text", as = "input", rows = 4 }) {
  const Tag = as;
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: BRAND.dark, marginBottom: 6, fontFamily: "'Poppins'" }}>{label}</label>}
      <Tag type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        style={{ width: "100%", padding: "11px 14px", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, fontFamily: "'DM Sans'", fontSize: 14, color: BRAND.dark, background: "#fff", outline: "none", resize: as === "textarea" ? "vertical" : "none", boxSizing: "border-box" }} />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: BRAND.dark, marginBottom: 6, fontFamily: "'Poppins'" }}>{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ width: "100%", padding: "11px 14px", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, fontFamily: "'DM Sans'", fontSize: 14, color: BRAND.dark, background: "#fff", outline: "none", boxSizing: "border-box" }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function SEOAuditTool() {
  const [url, setUrl] = useState(""); const [loading, setLoading] = useState(false); const [result, setResult] = useState(""); const [error, setError] = useState("");
  const run = async () => {
    if (!url) return; setLoading(true); setResult(""); setError("");
    try {
      const r = await callClaude(`Perform a professional AI SEO audit for the website: ${url}. Structure the report with: 1) SEO Health Score (out of 100), 2) Technical SEO Analysis (meta tags, page speed, mobile-friendliness, structured data), 3) Content & Keyword Analysis, 4) Backlink Profile Assessment, 5) Top 5 Critical Issues Found, 6) 3-Step SEO Fix Plan with specific actionable steps. Be detailed, realistic and professional. Format with clear sections.`, "You are a senior SEO analyst. Provide detailed, realistic SEO audits with specific technical insights.");
      setResult(r);
    } catch (e) { setError("API error. Please check your API key in Vercel environment variables."); }
    setLoading(false);
  };
  return <div><InputField label="Website URL" placeholder="https://yourbusiness.com" value={url} onChange={setUrl} /><GlowBtn onClick={run} style={{ width: "100%", justifyContent: "center" }}><Search size={16} /> Run AI SEO Audit</GlowBtn>{loading && <div style={{ marginTop: 16 }}><Loader text="Scanning your website" /></div>}{error && <div style={{ marginTop: 12, color: "#EF4444", fontSize: 13, fontFamily: "'DM Sans'" }}>{error}</div>}{result && <ResultBox text={result} />}</div>;
}

function BlogGeneratorTool() {
  const [topic, setTopic] = useState(""); const [audience, setAudience] = useState(""); const [tone, setTone] = useState("professional"); const [loading, setLoading] = useState(false); const [result, setResult] = useState("");
  const run = async () => {
    if (!topic) return; setLoading(true); setResult("");
    try { const r = await callClaude(`Write a complete SEO-optimized blog post on the topic: "${topic}". Target audience: ${audience || "general readers"}. Tone: ${tone}. Include: an attention-grabbing title, meta description, introduction, 4-5 main sections with H2 headings, relevant keywords naturally integrated, conclusion, and a call-to-action. Make it engaging, informative, and approximately 600-800 words.`, "You are an expert content strategist and SEO copywriter."); setResult(r); } catch (e) { setResult("Error generating content. Please try again."); }
    setLoading(false);
  };
  return <div><InputField label="Blog Topic" placeholder="e.g. 10 Instagram marketing tips for restaurants" value={topic} onChange={setTopic} /><InputField label="Target Audience" placeholder="e.g. Restaurant owners in India" value={audience} onChange={setAudience} /><SelectField label="Tone" value={tone} onChange={setTone} options={[{ value: "professional", label: "Professional" }, { value: "conversational", label: "Conversational" }, { value: "educational", label: "Educational" }, { value: "persuasive", label: "Persuasive" }]} /><GlowBtn onClick={run} style={{ width: "100%", justifyContent: "center" }}><FileText size={16} /> Generate Blog Post</GlowBtn>{loading && <div style={{ marginTop: 16 }}><Loader text="Writing your content" /></div>}{result && <ResultBox text={result} />}</div>;
}

function KeywordPlannerTool() {
  const [niche, setNiche] = useState(""); const [location, setLocation] = useState(""); const [loading, setLoading] = useState(false); const [result, setResult] = useState("");
  const run = async () => {
    if (!niche) return; setLoading(true); setResult("");
    try { const r = await callClaude(`Generate a comprehensive keyword research plan for the niche: "${niche}" ${location ? `targeting ${location}` : ""}. Provide 20 keywords organized in these categories: 1) High-Volume Short-tail Keywords (5 keywords with estimated monthly searches and difficulty), 2) Long-tail Keywords (8 keywords with buyer intent, low competition), 3) Question-Based Keywords (5 keywords for featured snippets), 4) Local SEO Keywords (if applicable), 5) Competitor Gap Keywords (2 strategic suggestions). For each keyword include: search intent, difficulty (Easy/Medium/Hard), and a content suggestion.`, "You are an expert SEO keyword researcher."); setResult(r); } catch (e) { setResult("Error. Please try again."); }
    setLoading(false);
  };
  return <div><InputField label="Industry / Niche" placeholder="e.g. Cloud accounting software for SMBs" value={niche} onChange={setNiche} /><InputField label="Target Location (optional)" placeholder="e.g. Bangalore, India" value={location} onChange={setLocation} /><GlowBtn onClick={run} style={{ width: "100%", justifyContent: "center" }}><BarChart2 size={16} /> Find Keywords</GlowBtn>{loading && <div style={{ marginTop: 16 }}><Loader text="Researching keywords" /></div>}{result && <ResultBox text={result} />}</div>;
}

function AdCopyTool() {
  const [platform, setPlatform] = useState("google"); const [product, setProduct] = useState(""); const [usp, setUsp] = useState(""); const [loading, setLoading] = useState(false); const [result, setResult] = useState("");
  const run = async () => {
    if (!product) return; setLoading(true); setResult("");
    try { const r = await callClaude(`Create 3 complete ad copy variations for ${platform.toUpperCase()} Ads for: "${product}". USP: ${usp || "not specified"}. For each variation provide: Headline 1 (30 chars), Headline 2 (30 chars), Headline 3 (30 chars), Description 1 (90 chars), Description 2 (90 chars), and a strong CTA. Also suggest the best audience targeting parameters and bidding strategy.`, "You are a performance marketing expert specializing in paid advertising."); setResult(r); } catch (e) { setResult("Error. Please try again."); }
    setLoading(false);
  };
  return <div><SelectField label="Ad Platform" value={platform} onChange={setPlatform} options={[{ value: "google", label: "Google Ads" }, { value: "meta", label: "Meta (Facebook/Instagram)" }, { value: "linkedin", label: "LinkedIn Ads" }]} /><InputField label="Product / Service" placeholder="e.g. AI-powered accounting software" value={product} onChange={setProduct} /><InputField label="Unique Selling Point (USP)" placeholder="e.g. Save 10 hours/week, Free trial" value={usp} onChange={setUsp} /><GlowBtn onClick={run} style={{ width: "100%", justifyContent: "center" }}><Megaphone size={16} /> Generate Ad Copy</GlowBtn>{loading && <div style={{ marginTop: 16 }}><Loader text="Crafting your ads" /></div>}{result && <ResultBox text={result} />}</div>;
}

function AnalyticsTool() {
  const [metrics, setMetrics] = useState(""); const [goal, setGoal] = useState(""); const [loading, setLoading] = useState(false); const [result, setResult] = useState("");
  const run = async () => {
    if (!metrics) return; setLoading(true); setResult("");
    try { const r = await callClaude(`Analyze these marketing metrics: "${metrics}". Business goal: ${goal || "grow overall performance"}. Provide: 1) Performance Summary, 2) What's Working Well, 3) Critical Areas of Concern, 4) 5 specific data-driven recommendations, 5) 30-Day Action Plan, 6) KPIs to track.`, "You are a data-driven marketing analyst."); setResult(r); } catch (e) { setResult("Error. Please try again."); }
    setLoading(false);
  };
  return <div><InputField label="Paste Your Metrics / Data" placeholder="e.g. Website visits: 5,200/mo, Bounce rate: 74%, Conversion rate: 1.2%" value={metrics} onChange={setMetrics} as="textarea" rows={4} /><InputField label="Primary Business Goal" placeholder="e.g. Increase online sales by 40% in Q2" value={goal} onChange={setGoal} /><GlowBtn onClick={run} style={{ width: "100%", justifyContent: "center" }}><LineChart size={16} /> Analyse Performance</GlowBtn>{loading && <div style={{ marginTop: 16 }}><Loader text="Interpreting your data" /></div>}{result && <ResultBox text={result} />}</div>;
}

const TOOLS = [
  { id: "seo", icon: Search, label: "AI SEO Audit", desc: "Instant website health check & fix plan", color: BRAND.sky, component: SEOAuditTool },
  { id: "blog", icon: FileText, label: "Blog Generator", desc: "SEO-optimized content in seconds", color: BRAND.orange, component: BlogGeneratorTool },
  { id: "keywords", icon: BarChart2, label: "Keyword Planner", desc: "High-impact keywords with intent data", color: "#10B981", component: KeywordPlannerTool },
  { id: "ads", icon: Megaphone, label: "Ad Copy AI", desc: "Google, Meta & LinkedIn ad variations", color: "#8B5CF6", component: AdCopyTool },
  { id: "analytics", icon: LineChart, label: "Analytics AI", desc: "Smart performance insights & action plan", color: "#EF4444", component: AnalyticsTool },
];

function HomePage({ setPage }) {
  const features = [
    { icon: Zap, title: "Instant AI Execution", desc: "From input to insight in seconds — no waiting, no human bottlenecks." },
    { icon: Shield, title: "Zero Fake Data", desc: "No inflated stats, no pretend clients. Pure AI, pure transparency." },
    { icon: Brain, title: "Learns Your Business", desc: "Contextual AI that adapts outputs to your niche, audience, and goals." },
    { icon: Globe, title: "24/7 Availability", desc: "Your autonomous marketing partner never sleeps, never takes a break." },
    { icon: Target, title: "Goal-Driven Strategy", desc: "Every AI recommendation is aligned with your actual business objectives." },
    { icon: Cpu, title: "Enterprise-Grade AI", desc: "Powered by the most advanced language models available today." },
  ];
  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, ${BRAND.navy} 0%, #001a3a 50%, ${BRAND.navyLight} 100%)`, padding: "96px 0 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: `radial-gradient(ellipse at 60% 20%, ${BRAND.orange}18 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, ${BRAND.sky}18 0%, transparent 50%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
          <Badge color={BRAND.orange}>🚀 AI-Powered Marketing Platform</Badge>
          <h1 style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: "clamp(36px, 6vw, 60px)", color: "#fff", margin: "20px 0 16px", lineHeight: 1.15 }}>AI that grows your brand —<br /><span style={{ color: BRAND.orange }}>smarter, faster, effortlessly.</span></h1>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 18, color: "#B8CCE4", maxWidth: 560, margin: "0 auto 36px", lineHeight: 1.7 }}>Your 24/7 AI marketing partner. Generate SEO audits, blog posts, keyword plans, ad copy, and analytics insights — all instantly, all automated.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <GlowBtn onClick={() => setPage("tools")}>Try AI Tools Free <ArrowRight size={16} /></GlowBtn>
            <GlowBtn secondary onClick={() => setPage("contact")} style={{ color: "#fff", borderColor: "#ffffff44" }}>Talk to AI Expert</GlowBtn>
          </div>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
            {[["5 AI Tools", "Ready to use"], ["100%", "Automated"], ["0", "Fake data"], ["24/7", "Available"]].map(([v, l]) => (
              <div key={v} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: 28, color: BRAND.orange }}>{v}</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#7BA7CC" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background: BRAND.bg, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <Badge color={BRAND.sky}>Why GrowVise</Badge>
            <h2 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: "clamp(26px, 4vw, 40px)", color: BRAND.navy, margin: "14px 0 12px" }}>Built differently from the start</h2>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 17, color: BRAND.muted, maxWidth: 480, margin: "0 auto" }}>No agencies. No templates. No human delays. Just pure AI working for your business around the clock.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {features.map(f => <Card key={f.title} hover><IconBox icon={f.icon} color={BRAND.orange} /><h3 style={{ fontFamily: "'Poppins'", fontWeight: 600, fontSize: 17, color: BRAND.navy, margin: "14px 0 8px" }}>{f.title}</h3><p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: BRAND.muted, lineHeight: 1.65, margin: 0 }}>{f.desc}</p></Card>)}
          </div>
        </div>
      </div>
      <div style={{ background: `linear-gradient(135deg, ${BRAND.navy}, #001a3a)`, padding: "72px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: "clamp(26px, 4vw, 42px)", color: "#fff", margin: "0 0 16px" }}>Start growing with AI today.</h2>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 17, color: "#B8CCE4", margin: "0 0 32px" }}>No signup required. Pick a tool and let AI handle your marketing strategy instantly.</p>
          <GlowBtn onClick={() => setPage("tools")} style={{ fontSize: 17, padding: "16px 36px" }}>Launch AI Tools <Zap size={17} /></GlowBtn>
        </div>
      </div>
    </div>
  );
}

function ToolsPage() {
  const [activeTool, setActiveTool] = useState("seo");
  const active = TOOLS.find(t => t.id === activeTool);
  const ActiveComp = active?.component;
  return (
    <div style={{ background: BRAND.bg, minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Badge color={BRAND.orange}>AI Tools Hub</Badge>
          <h1 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: "clamp(26px, 4vw, 38px)", color: BRAND.navy, margin: "14px 0 10px" }}>Your AI Marketing Command Center</h1>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 16, color: BRAND.muted }}>Five powerful AI tools. Zero human delays. Real results, instantly.</p>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 36 }}>
          {TOOLS.map(t => <button key={t.id} onClick={() => setActiveTool(t.id)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 40, border: `1.5px solid ${activeTool === t.id ? t.color : BRAND.border}`, background: activeTool === t.id ? t.color + "14" : "#fff", color: activeTool === t.id ? t.color : BRAND.muted, fontFamily: "'Poppins'", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.18s" }}><t.icon size={15} />{t.label}</button>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 24, alignItems: "start" }}>
          <Card style={{ position: "sticky", top: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: active.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}><active.icon size={22} color={active.color} /></div>
              <div><h3 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: 17, color: BRAND.navy, margin: 0 }}>{active.label}</h3><p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: BRAND.muted, margin: 0 }}>{active.desc}</p></div>
            </div>
            <div style={{ background: BRAND.bg, borderRadius: 10, padding: 14 }}><p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: BRAND.muted, margin: 0, lineHeight: 1.6 }}><Sparkles size={13} style={{ marginRight: 5, verticalAlign: "middle" }} color={BRAND.orange} />Powered by advanced AI. Results are generated in real-time — no templates, no fake data.</p></div>
          </Card>
          <Card><h4 style={{ fontFamily: "'Poppins'", fontWeight: 600, fontSize: 15, color: BRAND.navy, margin: "0 0 20px", paddingBottom: 16, borderBottom: `1px solid ${BRAND.border}` }}>Configure & Run</h4>{ActiveComp && <ActiveComp />}</Card>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ background: BRAND.bg }}>
      <div style={{ background: `linear-gradient(135deg, ${BRAND.navy}, #001a3a)`, padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <Badge color={BRAND.orange}>About GrowVise Digital</Badge>
          <h1 style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: "clamp(30px, 5vw, 50px)", color: "#fff", margin: "18px 0 16px" }}>Built for builders.<br /><span style={{ color: BRAND.orange }}>Powered by AI.</span></h1>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 17, color: "#B8CCE4", lineHeight: 1.7, margin: 0 }}>GrowVise Digital is a fully AI-driven marketing platform built for startups and small businesses who want real growth without agencies, fake promises, or inflated costs.</p>
        </div>
      </div>
      <div style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", marginBottom: 72 }}>
            <div>
              <Badge color={BRAND.sky}>Our Mission</Badge>
              <h2 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: 30, color: BRAND.navy, margin: "14px 0 16px" }}>Empower startups with intelligence, not illusions.</h2>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 16, color: BRAND.muted, lineHeight: 1.75 }}>We believe every business deserves access to world-class marketing intelligence. GrowVise was founded on one principle: AI should work for you, not be a facade over human work. No human writers behind the curtain. No manually crafted "AI reports."</p>
            </div>
            <Card style={{ background: BRAND.navy, border: "none" }}>
              <h3 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: 22, color: "#fff", margin: "0 0 24px" }}>Our Commitments</h3>
              {["We never fake testimonials or client logos.", "We never use templates dressed as AI.", "We never hide pricing or inflate results.", "We build for real ROI, not vanity metrics.", "We improve our AI continuously, transparently."].map(c => (
                <div key={c} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 14 }}>
                  <CheckCircle size={16} color={BRAND.orange} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#B8CCE4", lineHeight: 1.6 }}>{c}</span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogPage() {
  const [topic, setTopic] = useState(""); const [article, setArticle] = useState(""); const [loading, setLoading] = useState(false);
  const previews = [
    { tag: "SEO", title: "10 Technical SEO Fixes That Double Organic Traffic", time: "5 min read", color: BRAND.sky },
    { tag: "Content", title: "How to Write Blog Posts That Rank #1 on Google in 2025", time: "7 min read", color: BRAND.orange },
    { tag: "Ads", title: "Meta Ads vs Google Ads: Which Delivers Better ROI for Startups?", time: "6 min read", color: "#8B5CF6" },
    { tag: "Social", title: "Instagram Marketing Strategy for Local Businesses in India", time: "8 min read", color: "#10B981" },
    { tag: "Analytics", title: "Understanding Bounce Rate: What It Really Means for Your Business", time: "4 min read", color: "#EF4444" },
    { tag: "Strategy", title: "Full-Funnel Digital Marketing Strategy for Small Budgets", time: "9 min read", color: BRAND.navy },
  ];
  const generateArticle = async () => {
    if (!topic) return; setLoading(true); setArticle("");
    try { const r = await callClaude(`Write a comprehensive educational article about: "${topic}" for marketers and business owners. Include: engaging title, key takeaways, 5 main sections with subheadings, practical examples, expert tips, and a conclusion with next steps. Around 700-900 words.`, "You are an expert digital marketing educator."); setArticle(r); } catch (e) { setArticle("Error generating article. Please try again."); }
    setLoading(false);
  };
  return (
    <div style={{ background: BRAND.bg, padding: "48px 24px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Badge color={BRAND.orange}>AI Learn Center</Badge>
          <h1 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: "clamp(26px, 4vw, 40px)", color: BRAND.navy, margin: "14px 0 12px" }}>Marketing Intelligence, Generated by AI</h1>
        </div>
        <Card style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: BRAND.navy, marginBottom: 6, fontFamily: "'Poppins'" }}>🧠 Request an AI Article</label>
              <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Email marketing best practices for e-commerce" style={{ width: "100%", padding: "11px 14px", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, fontFamily: "'DM Sans'", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
            </div>
            <GlowBtn onClick={generateArticle}><BookOpen size={15} /> Generate Article</GlowBtn>
          </div>
          {loading && <div style={{ marginTop: 16 }}><Loader text="Writing your article" /></div>}
          {article && <ResultBox text={article} />}
        </Card>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {previews.map(a => <Card key={a.title} hover style={{ cursor: "pointer" }}><Badge color={a.color}>{a.tag}</Badge><h4 style={{ fontFamily: "'Poppins'", fontWeight: 600, fontSize: 15, color: BRAND.navy, margin: "12px 0 10px", lineHeight: 1.4 }}>{a.title}</h4><div style={{ display: "flex", alignItems: "center", gap: 6 }}><Clock size={12} color={BRAND.muted} /><span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: BRAND.muted }}>{a.time}</span></div></Card>)}
        </div>
      </div>
    </div>
  );
}

function ContactPage({ setLeads }) {
  const [form, setForm] = useState({ name: "", email: "", business: "", goal: "", budget: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    await new Promise(r => setTimeout(r, 500));
    setLeads(prev => [...prev, { ...form, date: new Date().toLocaleDateString(), id: Date.now() }]);
    setSubmitted(true);
  };
  if (submitted) return (
    <div style={{ background: BRAND.bg, padding: "80px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 500, margin: "0 auto" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}><CheckCircle size={36} color="#10B981" /></div>
        <h2 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: 28, color: BRAND.navy, margin: "0 0 12px" }}>You're in the loop!</h2>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 16, color: BRAND.muted, lineHeight: 1.7 }}>Thank you <strong>{form.name}</strong>! We've received your details and will prepare a personalised AI marketing roadmap for you.</p>
        <GlowBtn onClick={() => setSubmitted(false)} style={{ marginTop: 24 }}>Submit Another Enquiry</GlowBtn>
      </div>
    </div>
  );
  return (
    <div style={{ background: BRAND.bg, padding: "48px 24px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Badge color={BRAND.orange}>Get in Touch</Badge>
          <h1 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: "clamp(26px, 4vw, 38px)", color: BRAND.navy, margin: "14px 0 12px" }}>Let's grow your business together</h1>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 32, alignItems: "start" }}>
          <Card style={{ background: BRAND.navy, border: "none" }}>
            <h3 style={{ fontFamily: "'Poppins'", fontWeight: 600, fontSize: 18, color: "#fff", margin: "0 0 20px" }}>Why Connect?</h3>
            {["Get a free AI-generated marketing audit", "Receive a custom 30-day growth roadmap", "Explore custom AI integrations", "Priority access to new AI tools"].map(i => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 12 }}>
                <CheckCircle size={15} color={BRAND.orange} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#B8CCE4" }}>{i}</span>
              </div>
            ))}
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #ffffff18" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <Mail size={16} color={BRAND.orange} />
                <span style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#B8CCE4" }}>hello@growvisedigital.com</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Globe size={16} color={BRAND.sky} />
                <span style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#B8CCE4" }}>Available 24/7 via AI Chat</span>
              </div>
            </div>
          </Card>
          <Card>
            <h4 style={{ fontFamily: "'Poppins'", fontWeight: 600, fontSize: 16, color: BRAND.navy, margin: "0 0 20px" }}>📋 Tell Us About You</h4>
            <InputField label="Full Name *" placeholder="Ravi Sharma" value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} />
            <InputField label="Business Email *" placeholder="ravi@company.com" value={form.email} onChange={v => setForm(p => ({ ...p, email: v }))} type="email" />
            <InputField label="Business Name" placeholder="Your company or startup" value={form.business} onChange={v => setForm(p => ({ ...p, business: v }))} />
            <InputField label="Primary Marketing Goal" placeholder="e.g. Increase website traffic" value={form.goal} onChange={v => setForm(p => ({ ...p, goal: v }))} />
            <SelectField label="Monthly Marketing Budget" value={form.budget} onChange={v => setForm(p => ({ ...p, budget: v }))} options={[{ value: "", label: "Select budget range" }, { value: "under-10k", label: "Under ₹10,000/mo" }, { value: "10k-50k", label: "₹10,000 – ₹50,000/mo" }, { value: "50k-2L", label: "₹50,000 – ₹2,00,000/mo" }, { value: "above-2L", label: "Above ₹2,00,000/mo" }]} />
            <GlowBtn onClick={handleSubmit} style={{ width: "100%", justifyContent: "center", marginTop: 4 }}><Send size={15} /> Submit & Get Free AI Audit</GlowBtn>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 12, color: BRAND.muted, textAlign: "center", marginTop: 12 }}>No spam. No sales calls. Your data stays private.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function LeadsDashboard({ leads, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#0009", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 700, maxHeight: "80vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${BRAND.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: 18, color: BRAND.navy, margin: 0 }}>📊 Lead Dashboard ({leads.length} leads)</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} color={BRAND.muted} /></button>
        </div>
        <div style={{ overflow: "auto", padding: 20 }}>
          {leads.length === 0 ? <p style={{ fontFamily: "'DM Sans'", color: BRAND.muted, textAlign: "center", padding: 40 }}>No leads yet. Share your platform to start collecting!</p> : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: "'DM Sans'" }}>
              <thead><tr style={{ background: BRAND.bg }}>{["Name", "Email", "Business", "Goal", "Budget", "Date"].map(h => <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: BRAND.navy, fontFamily: "'Poppins'", fontSize: 12, borderBottom: `1px solid ${BRAND.border}` }}>{h}</th>)}</tr></thead>
              <tbody>{leads.map(l => <tr key={l.id} style={{ borderBottom: `1px solid ${BRAND.border}` }}><td style={{ padding: "10px 12px" }}>{l.name}</td><td style={{ padding: "10px 12px", color: BRAND.sky }}>{l.email}</td><td style={{ padding: "10px 12px" }}>{l.business || "—"}</td><td style={{ padding: "10px 12px" }}>{l.goal || "—"}</td><td style={{ padding: "10px 12px" }}>{l.budget || "—"}</td><td style={{ padding: "10px 12px", color: BRAND.muted }}>{l.date}</td></tr>)}</tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", text: "Hi! I'm GrowVise AI. Ask me anything — SEO plans, content ideas, ad strategy, or marketing tips. Try: \"Create a 1-month SEO plan for a restaurant in Bangalore.\"" }]);
  const [input, setInput] = useState(""); const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim(); setInput("");
    setMessages(m => [...m, { role: "user", text: userMsg }]); setLoading(true);
    try { const r = await callClaude(userMsg, "You are GrowVise AI, an expert digital marketing assistant. Help with SEO, content, ads, social media, analytics, and growth strategy. Be concise but comprehensive. Use bullet points when helpful. Always be actionable and specific."); setMessages(m => [...m, { role: "assistant", text: r }]); } catch (e) { setMessages(m => [...m, { role: "assistant", text: "Sorry, I encountered an error. Please try again." }]); }
    setLoading(false);
  };
  return (
    <>
      <button onClick={() => setOpen(!open)} style={{ position: "fixed", bottom: 28, right: 28, width: 60, height: 60, borderRadius: "50%", background: BRAND.orange, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 32px ${BRAND.orange}66`, zIndex: 999, transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
        {open ? <X size={24} color="#fff" /> : <MessageCircle size={24} color="#fff" />}
      </button>
      {open && (
        <div style={{ position: "fixed", bottom: 100, right: 28, width: 360, height: 520, background: "#fff", borderRadius: 20, border: `1px solid ${BRAND.border}`, boxShadow: "0 24px 64px #00000022", zIndex: 998, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ background: BRAND.navy, padding: "16px 18px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: BRAND.orange, display: "flex", alignItems: "center", justifyContent: "center" }}><Brain size={18} color="#fff" /></div>
            <div><div style={{ fontFamily: "'Poppins'", fontWeight: 600, fontSize: 14, color: "#fff" }}>GrowVise AI</div><div style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 7, height: 7, borderRadius: "50%", background: "#34D399" }} /><span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#B8CCE4" }}>Always online</span></div></div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}><div style={{ maxWidth: "82%", background: m.role === "user" ? BRAND.orange : BRAND.bg, color: m.role === "user" ? "#fff" : BRAND.dark, padding: "10px 14px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", fontFamily: "'DM Sans'", fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{m.text}</div></div>)}
            {loading && <div style={{ display: "flex", justifyContent: "flex-start" }}><div style={{ background: BRAND.bg, padding: "10px 14px", borderRadius: "18px 18px 18px 4px" }}><Loader text="Thinking" /></div></div>}
            <div ref={endRef} />
          </div>
          <div style={{ padding: "12px 14px", borderTop: `1px solid ${BRAND.border}`, display: "flex", gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask anything about marketing..." style={{ flex: 1, padding: "9px 12px", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, fontFamily: "'DM Sans'", fontSize: 13, outline: "none" }} />
            <button onClick={send} style={{ width: 36, height: 36, borderRadius: 10, background: BRAND.orange, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Send size={15} color="#fff" /></button>
          </div>
        </div>
      )}
    </>
  );
}

function Nav({ page, setPage, leads, setShowLeads }) {
  const links = [{ id: "home", label: "Home" }, { id: "tools", label: "AI Tools" }, { id: "about", label: "About" }, { id: "blog", label: "Learn" }, { id: "contact", label: "Contact" }];
  return (
    <nav style={{ background: "#fff", borderBottom: `1px solid ${BRAND.border}`, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 8px #0000000a" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: BRAND.orange, display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={18} color="#fff" /></div>
          <span style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: 18, color: BRAND.navy }}>Grow<span style={{ color: BRAND.orange }}>Vise</span></span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {links.map(l => <button key={l.id} onClick={() => setPage(l.id)} style={{ background: page === l.id ? BRAND.orange + "12" : "none", border: "none", cursor: "pointer", padding: "8px 14px", borderRadius: 8, fontFamily: "'Poppins'", fontWeight: 600, fontSize: 14, color: page === l.id ? BRAND.orange : BRAND.muted, transition: "all 0.15s" }}>{l.label}</button>)}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={() => setShowLeads(true)} style={{ background: BRAND.navy + "0e", border: `1px solid ${BRAND.navy}22`, borderRadius: 8, padding: "7px 14px", fontFamily: "'Poppins'", fontWeight: 600, fontSize: 13, color: BRAND.navy, cursor: "pointer" }}>📊 Leads {leads.length > 0 && `(${leads.length})`}</button>
          <GlowBtn small onClick={() => setPage("tools")}>Try AI Free</GlowBtn>
        </div>
      </div>
    </nav>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: BRAND.navy, padding: "48px 24px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>
          <div style={{ maxWidth: 260 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: BRAND.orange, display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={16} color="#fff" /></div>
              <span style={{ fontFamily: "'Poppins'", fontWeight: 800, fontSize: 18, color: "#fff" }}>GrowVise Digital</span>
            </div>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#7BA7CC", lineHeight: 1.7 }}>AI that grows your brand — smarter, faster, and effortlessly. 100% automation, zero fake data.</p>
          </div>
          {[{ title: "Platform", links: [["AI Tools", "tools"], ["SEO Audit", "tools"], ["Blog Generator", "tools"]] }, { title: "Company", links: [["About Us", "about"], ["Learn Center", "blog"], ["Contact", "contact"]] }].map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "'Poppins'", fontWeight: 700, fontSize: 13, color: "#fff", margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{col.title}</h4>
              {col.links.map(([label, pg]) => <button key={label} onClick={() => setPage(pg)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans'", fontSize: 14, color: "#7BA7CC", marginBottom: 8, padding: 0 }}>{label}</button>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #ffffff18", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#4A7BA7" }}>© 2025 GrowVise Digital. All rights reserved.</span>
          <span style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#4A7BA7" }}>Powered by AI · No fake data · No human delays</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [leads, setLeads] = useState([]);
  const [showLeads, setShowLeads] = useState(false);
  const pages = { home: HomePage, tools: ToolsPage, about: AboutPage, blog: BlogPage };
  const PageComp = pages[page] || HomePage;
  useEffect(() => { window.scrollTo(0, 0); }, [page]);
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column", background: BRAND.bg }}>
        <Nav page={page} setPage={setPage} leads={leads} setShowLeads={setShowLeads} />
        <main style={{ flex: 1 }}>
          {page === "contact" ? <ContactPage setLeads={setLeads} /> : <PageComp setPage={setPage} />}
        </main>
        <Footer setPage={setPage} />
        <Chatbot />
        {showLeads && <LeadsDashboard leads={leads} onClose={() => setShowLeads(false)} />}
      </div>
    </>
  );
}
