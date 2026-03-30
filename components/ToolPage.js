import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const allTools = [
  { icon: '🔍', label: 'SEO Audit',           href: '/tools/seo-audit',         tool: 'seo-audit' },
  { icon: '🔑', label: 'Keyword Research',    href: '/tools/keyword-research',  tool: 'keyword-research' },
  { icon: '🏷️', label: 'Meta Generator',      href: '/tools/meta-generator',    tool: 'meta-generator' },
  { icon: '✍️', label: 'Blog Writer',         href: '/tools/blog-writer',       tool: 'blog-writer' },
  { icon: '📣', label: 'Ad Copy',             href: '/tools/ad-copy',           tool: 'ad-copy' },
  { icon: '📱', label: 'Social Posts',        href: '/tools/social-posts',      tool: 'social-posts' },
  { icon: '📊', label: 'Competitor Analysis', href: '/tools/competitor',        tool: 'competitor' },
  { icon: '🔗', label: 'Backlink Checker',    href: '/tools/backlinks',         tool: 'backlinks' },
];

function renderMarkdown(text) {
  // Simple markdown-ish renderer
  return text
    .replace(/^## (.+)$/gm, '<h2 style="font-size:17px;font-weight:700;color:#0f2044;margin:20px 0 8px;font-family:Syne,sans-serif">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:15px;font-weight:600;color:#1a3060;margin:14px 0 6px">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li style="margin:4px 0;padding-left:4px">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li style="margin:4px 0;padding-left:4px"><strong>$1.</strong> $2</li>')
    .replace(/\n\n/g, '<br/>')
    .replace(/\n/g, '<br/>');
}

export default function ToolPage({ toolId, title, subtitle, placeholder = 'https://example.com/' }) {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleRun = async () => {
    if (!url.trim()) {
      setError('Please enter a website URL.');
      return;
    }
    setError('');
    setResult('');
    setLoading(true);

    try {
      const res = await fetch('/api/seo-audit', {           // ← calls YOUR serverless route, not Anthropic directly
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim(), tool: toolId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
      } else {
        setResult(data.result);
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Head>
        <title>{title} — GrowVise Digital</title>
      </Head>

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <aside style={{
          width: 220, background: 'var(--blue-950)',
          display: 'flex', flexDirection: 'column', flexShrink: 0,
        }}>
          <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
            <button onClick={() => router.push('/')} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'transparent', color: 'white',
            }}>
              <div style={{
                width: 32, height: 32, background: 'var(--orange)',
                borderRadius: 8, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 16,
              }}>⚡</div>
              <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 17 }}>GrowVise</span>
            </button>
          </div>
          <nav style={{ flex: 1, padding: '16px 10px', overflowY: 'auto' }}>
            <button
              onClick={() => router.push('/')}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 8, marginBottom: 8,
                background: 'transparent', color: 'rgba(255,255,255,.5)',
                fontSize: 13, textAlign: 'left',
              }}
            >
              🏠 Dashboard
            </button>
            <div style={{
              color: 'rgba(255,255,255,.3)', fontSize: 10, fontWeight: 600,
              letterSpacing: '.1em', textTransform: 'uppercase',
              padding: '0 12px', marginBottom: 6,
            }}>
              Tools
            </div>
            {allTools.map(t => (
              <button
                key={t.href}
                onClick={() => router.push(t.href)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 12px', borderRadius: 8, marginBottom: 2,
                  background: t.tool === toolId ? 'rgba(59,130,246,.2)' : 'transparent',
                  color: t.tool === toolId ? 'var(--blue-400)' : 'rgba(255,255,255,.6)',
                  fontSize: 13, fontWeight: t.tool === toolId ? 600 : 400,
                  textAlign: 'left', transition: 'all .15s',
                }}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </nav>
          <div style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,.08)', color: 'rgba(255,255,255,.25)', fontSize: 11 }}>
            © 2025 GrowVise Digital
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, overflow: 'auto' }}>
          {/* Header */}
          <header style={{
            background: 'white', borderBottom: '1px solid var(--slate-200)',
            padding: '20px 32px', display: 'flex', alignItems: 'center',
            position: 'sticky', top: 0, zIndex: 10,
          }}>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 800, fontFamily: 'Syne,sans-serif' }}>{title}</h1>
              {subtitle && <p style={{ fontSize: 13, color: 'var(--slate-500)', marginTop: 2 }}>{subtitle}</p>}
            </div>
            <div style={{
              marginLeft: 'auto', padding: '7px 16px',
              background: '#fff7ed', borderRadius: 20, fontSize: 12,
              color: 'var(--orange)', fontWeight: 600,
              border: '1px solid rgba(249,115,22,.2)',
            }}>⚡ AI-Powered</div>
          </header>

          {/* Tool Area */}
          <div style={{ padding: 32, maxWidth: 800 }}>
            {/* Configure Card */}
            <div style={{
              background: 'white', borderRadius: 16, padding: 28,
              border: '1px solid var(--slate-200)', boxShadow: 'var(--shadow-sm)',
              marginBottom: 20,
            }}>
              <h2 style={{
                fontSize: 16, fontWeight: 700, color: 'var(--blue-600)',
                fontFamily: 'Syne,sans-serif', marginBottom: 20,
                paddingBottom: 16, borderBottom: '1px solid var(--slate-100)',
              }}>
                Configure &amp; Run
              </h2>

              <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8, color: 'var(--slate-700)' }}>
                Website URL
              </label>
              <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRun()}
                placeholder={placeholder}
                style={{
                  width: '100%', padding: '12px 16px',
                  border: '1.5px solid var(--slate-200)', borderRadius: 10,
                  fontSize: 14, outline: 'none', fontFamily: 'DM Sans,sans-serif',
                  transition: 'border-color .15s', color: 'var(--slate-900)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--blue-500)'}
                onBlur={e => e.target.style.borderColor = 'var(--slate-200)'}
              />
              {error && (
                <div style={{
                  marginTop: 10, padding: '10px 14px',
                  background: '#fef2f2', border: '1px solid #fecaca',
                  borderRadius: 8, color: '#dc2626', fontSize: 13,
                }}>
                  ⚠️ {error}
                </div>
              )}

              <button
                onClick={handleRun}
                disabled={loading}
                style={{
                  marginTop: 16, width: '100%',
                  padding: '14px 24px',
                  background: loading ? '#fed7aa' : 'var(--orange)',
                  color: 'white', borderRadius: 10,
                  fontWeight: 700, fontSize: 15,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'background .2s',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? (
                  <>
                    <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⚙️</span>
                    Analysing with AI…
                  </>
                ) : (
                  <>{allTools.find(t => t.tool === toolId)?.icon || '🔍'} Run {title}</>
                )}
              </button>
            </div>

            {/* Output Card */}
            <div style={{
              background: 'white', borderRadius: 16,
              border: '1px solid var(--slate-200)', boxShadow: 'var(--shadow-sm)',
              overflow: 'hidden',
            }}>
              {/* Output header */}
              <div style={{
                padding: '14px 20px',
                background: 'var(--blue-50)',
                borderBottom: '1px solid var(--blue-100)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ color: 'var(--blue-600)', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                  ✨ AI OUTPUT
                </span>
                {result && (
                  <button
                    onClick={handleCopy}
                    title="Copy to clipboard"
                    style={{
                      background: copied ? 'var(--blue-600)' : 'white',
                      color: copied ? 'white' : 'var(--slate-500)',
                      border: '1px solid var(--slate-200)',
                      borderRadius: 6, padding: '5px 10px',
                      fontSize: 12, fontWeight: 600,
                      display: 'flex', alignItems: 'center', gap: 5,
                      transition: 'all .15s',
                    }}
                  >
                    {copied ? '✓ Copied!' : '⎘ Copy'}
                  </button>
                )}
              </div>

              {/* Output body */}
              <div style={{ padding: '20px 24px', minHeight: 120 }}>
                {loading && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0', gap: 14 }}>
                    <div style={{
                      width: 40, height: 40, border: '3px solid var(--blue-100)',
                      borderTopColor: 'var(--blue-600)', borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                    }} />
                    <p style={{ color: 'var(--slate-500)', fontSize: 14 }}>AI is analysing your website…</p>
                  </div>
                )}
                {!loading && !result && (
                  <p style={{ color: 'var(--slate-400)', fontSize: 14, fontStyle: 'italic' }}>
                    Results will appear here after you run the tool.
                  </p>
                )}
                {!loading && result && (
                  <div
                    style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--slate-700)' }}
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(result) }}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
