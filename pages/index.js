import { useRouter } from 'next/router';
import Head from 'next/head';

const tools = [
  {
    icon: '🔍',
    label: 'SEO Audit',
    desc: 'Full technical & on-page SEO analysis with actionable recommendations.',
    href: '/tools/seo-audit',
    color: '#2563eb',
    bg: '#eff6ff',
  },
  {
    icon: '🔑',
    label: 'Keyword Research',
    desc: 'Discover high-value keywords and long-tail opportunities for your niche.',
    href: '/tools/keyword-research',
    color: '#7c3aed',
    bg: '#f5f3ff',
  },
  {
    icon: '🏷️',
    label: 'Meta Generator',
    desc: 'AI-crafted title tags and meta descriptions optimized for clicks.',
    href: '/tools/meta-generator',
    color: '#0891b2',
    bg: '#ecfeff',
  },
  {
    icon: '✍️',
    label: 'Blog Writer',
    desc: 'Generate SEO-optimized blog outlines and introductions instantly.',
    href: '/tools/blog-writer',
    color: '#059669',
    bg: '#ecfdf5',
  },
  {
    icon: '📣',
    label: 'Ad Copy',
    desc: 'High-converting ad copy for Google, Facebook, and LinkedIn.',
    href: '/tools/ad-copy',
    color: '#dc2626',
    bg: '#fef2f2',
  },
  {
    icon: '📱',
    label: 'Social Posts',
    desc: 'A full week of social media content tailored to your brand.',
    href: '/tools/social-posts',
    color: '#d97706',
    bg: '#fffbeb',
  },
  {
    icon: '📊',
    label: 'Competitor Analysis',
    desc: 'Uncover competitor strategies and find your differentiation edge.',
    href: '/tools/competitor',
    color: '#7c3aed',
    bg: '#f5f3ff',
  },
  {
    icon: '🔗',
    label: 'Backlink Checker',
    desc: 'Evaluate your backlink profile and get a link-building action plan.',
    href: '/tools/backlinks',
    color: '#0f766e',
    bg: '#f0fdfa',
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>GrowVise Digital — AI Marketing Platform</title>
        <meta name="description" content="AI-powered SEO and marketing tools for digital growth." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <aside style={{
          width: 220,
          background: 'var(--blue-950)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}>
          <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, background: 'var(--orange)',
                borderRadius: 8, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 16,
              }}>⚡</div>
              <span style={{ color: 'white', fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 17 }}>
                GrowVise
              </span>
            </div>
          </div>
          <nav style={{ flex: 1, padding: '16px 10px' }}>
            {[
              { label: 'Dashboard', href: '/', icon: '🏠' },
              ...tools.map(t => ({ label: t.label, href: t.href, icon: t.icon })),
            ].map(item => (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 12px', borderRadius: 8, marginBottom: 2,
                  background: item.href === '/' ? 'rgba(59,130,246,.2)' : 'transparent',
                  color: item.href === '/' ? 'var(--blue-400)' : 'rgba(255,255,255,.6)',
                  fontSize: 13, fontWeight: item.href === '/' ? 600 : 400,
                  textAlign: 'left', transition: 'all .15s',
                }}
              >
                <span>{item.icon}</span> {item.label}
              </button>
            ))}
          </nav>
          <div style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,.08)', color: 'rgba(255,255,255,.25)', fontSize: 11 }}>
            © 2025 GrowVise Digital
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, overflow: 'auto' }}>
          {/* Header */}
          <header style={{
            background: 'white', borderBottom: '1px solid var(--slate-200)',
            padding: '20px 32px', display: 'flex', alignItems: 'center',
          }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Syne,sans-serif' }}>
                AI Marketing Platform
              </h1>
              <p style={{ fontSize: 13, color: 'var(--slate-500)', marginTop: 2 }}>
                All your AI-powered SEO & marketing tools in one place
              </p>
            </div>
            <div style={{
              marginLeft: 'auto', padding: '7px 16px',
              background: '#fff7ed', borderRadius: 20, fontSize: 12,
              color: 'var(--orange)', fontWeight: 600,
              border: '1px solid rgba(249,115,22,.2)',
            }}>
              ⚡ AI-Powered
            </div>
          </header>

          {/* Content */}
          <div style={{ padding: 32 }}>
            {/* Hero */}
            <div style={{
              background: 'linear-gradient(135deg, var(--blue-950) 0%, #1a3060 100%)',
              borderRadius: 16, padding: '40px 40px', marginBottom: 32,
              color: 'white', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', right: -30, top: -30,
                width: 200, height: 200, borderRadius: '50%',
                background: 'rgba(249,115,22,.15)',
              }} />
              <div style={{
                position: 'absolute', right: 60, bottom: -60,
                width: 150, height: 150, borderRadius: '50%',
                background: 'rgba(59,130,246,.15)',
              }} />
              <h2 style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Syne,sans-serif', marginBottom: 10, position: 'relative' }}>
                Grow smarter with AI 🚀
              </h2>
              <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 15, maxWidth: 500, position: 'relative' }}>
                Enter any website URL and let our AI analyse, audit, and generate
                marketing content in seconds. Pick a tool below to get started.
              </p>
              <button
                onClick={() => router.push('/tools/seo-audit')}
                style={{
                  marginTop: 24, padding: '12px 28px',
                  background: 'var(--orange)', color: 'white',
                  border: 'none', borderRadius: 10, fontWeight: 700,
                  fontSize: 14, cursor: 'pointer', position: 'relative',
                }}
              >
                🔍 Start SEO Audit
              </button>
            </div>

            {/* Tools grid */}
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--slate-700)' }}>
              All Tools
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 16,
            }}>
              {tools.map(tool => (
                <button
                  key={tool.href}
                  onClick={() => router.push(tool.href)}
                  style={{
                    background: 'white', border: '1px solid var(--slate-200)',
                    borderRadius: 14, padding: '20px', textAlign: 'left',
                    cursor: 'pointer', transition: 'all .2s',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = 'var(--shadow)';
                    e.currentTarget.style.borderColor = tool.color;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                    e.currentTarget.style.borderColor = 'var(--slate-200)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: tool.bg, fontSize: 22,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 14,
                  }}>
                    {tool.icon}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, fontFamily: 'Syne,sans-serif', color: 'var(--slate-900)' }}>
                    {tool.label}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--slate-500)', lineHeight: 1.5 }}>
                    {tool.desc}
                  </div>
                  <div style={{ marginTop: 16, color: tool.color, fontSize: 13, fontWeight: 600 }}>
                    Open tool →
                  </div>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
