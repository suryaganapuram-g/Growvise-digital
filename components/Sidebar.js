import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const tools = [
  {
    group: 'SEO Tools',
    items: [
      { label: 'SEO Audit', href: '/tools/seo-audit', icon: '🔍' },
      { label: 'Keyword Research', href: '/tools/keyword-research', icon: '🔑' },
      { label: 'Meta Generator', href: '/tools/meta-generator', icon: '🏷️' },
    ],
  },
  {
    group: 'Content AI',
    items: [
      { label: 'Blog Writer', href: '/tools/blog-writer', icon: '✍️' },
      { label: 'Ad Copy', href: '/tools/ad-copy', icon: '📣' },
      { label: 'Social Posts', href: '/tools/social-posts', icon: '📱' },
    ],
  },
  {
    group: 'Analytics',
    items: [
      { label: 'Competitor Analysis', href: '/tools/competitor', icon: '📊' },
      { label: 'Backlink Checker', href: '/tools/backlinks', icon: '🔗' },
    ],
  },
];

export default function Sidebar() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside style={{
      width: collapsed ? 68 : 240,
      minHeight: '100vh',
      background: 'var(--blue-950)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width .25s ease',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{
        padding: collapsed ? '20px 16px' : '20px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        borderBottom: '1px solid rgba(255,255,255,.08)',
      }}>
        <div style={{
          width: 32, height: 32,
          background: 'var(--orange)',
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, flexShrink: 0,
        }}>⚡</div>
        {!collapsed && (
          <span style={{ color: 'white', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16 }}>
            GrowVise
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            marginLeft: 'auto',
            background: 'transparent',
            color: 'rgba(255,255,255,.4)',
            fontSize: 14,
            padding: 4,
          }}
        >
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 10px', overflowY: 'auto' }}>
        {tools.map(group => (
          <div key={group.group} style={{ marginBottom: 24 }}>
            {!collapsed && (
              <div style={{
                color: 'rgba(255,255,255,.35)',
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0 10px',
                marginBottom: 6,
              }}>
                {group.group}
              </div>
            )}
            {group.items.map(item => {
              const active = router.pathname === item.href;
              return (
                <Link key={item.href} href={item.href} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: collapsed ? '10px 14px' : '10px 12px',
                  borderRadius: 8,
                  marginBottom: 2,
                  background: active ? 'rgba(59,130,246,.2)' : 'transparent',
                  color: active ? 'var(--blue-400)' : 'rgba(255,255,255,.6)',
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  transition: 'all .15s',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                }}>
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  {!collapsed && item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{
        padding: 16,
        borderTop: '1px solid rgba(255,255,255,.08)',
        color: 'rgba(255,255,255,.3)',
        fontSize: 11,
        textAlign: collapsed ? 'center' : 'left',
      }}>
        {collapsed ? '⚡' : '© 2025 GrowVise Digital'}
      </div>
    </aside>
  );
}
