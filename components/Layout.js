import Sidebar from './Sidebar';

export default function Layout({ children, title, subtitle }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        {/* Top bar */}
        <header style={{
          background: 'var(--white)',
          borderBottom: '1px solid var(--slate-200)',
          padding: '18px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--slate-900)' }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{ fontSize: 13, color: 'var(--slate-500)', marginTop: 2 }}>{subtitle}</p>
            )}
          </div>

          {/* Badge */}
          <div style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--orange-light)',
            border: '1px solid rgba(249,115,22,.2)',
            padding: '6px 14px',
            borderRadius: 20,
            fontSize: 12,
            color: 'var(--orange)',
            fontWeight: 600,
          }}>
            <span>⚡</span> AI-Powered
          </div>
        </header>

        {/* Page content */}
        <div style={{ flex: 1, padding: 32 }}>
          {children}
        </div>
      </main>
    </div>
  );
}
