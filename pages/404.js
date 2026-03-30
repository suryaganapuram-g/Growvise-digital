import { useRouter } from 'next/router';
export default function Custom404() {
  const router = useRouter();
  return (
    <div style={{ display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',gap:16,fontFamily:'DM Sans,sans-serif' }}>
      <div style={{ fontSize: 64 }}>🔍</div>
      <h1 style={{ fontFamily:'Syne,sans-serif', fontSize:32, color:'#0f2044' }}>Page not found</h1>
      <p style={{ color:'#64748b' }}>That page doesn't exist.</p>
      <button onClick={() => router.push('/')} style={{ marginTop:8,padding:'12px 28px',background:'#f97316',color:'white',border:'none',borderRadius:10,fontWeight:700,cursor:'pointer',fontSize:14 }}>
        ← Back to Dashboard
      </button>
    </div>
  );
}
