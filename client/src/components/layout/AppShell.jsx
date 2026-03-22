import { COLORS, FONT, RADIUS } from "@constants/theme";
import { TABS } from "@constants/config";

export function AppShell({ activeTab, onTabChange, headerSlot, children }) {
  return (
    <div style={{ minHeight:"100vh", background:COLORS.bgDeep, fontFamily:FONT.body, color:COLORS.textPrimary }}>
      {/* Grid bg */}
      <div aria-hidden style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0,
        backgroundImage:`linear-gradient(${COLORS.accentBorder}55 1px,transparent 1px),linear-gradient(90deg,${COLORS.accentBorder}55 1px,transparent 1px)`,
        backgroundSize:"40px 40px" }}/>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"24px 20px", position:"relative", zIndex:1 }}>

        {/* Header */}
        <header style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
              <span style={{ fontSize:24 }}>💰</span>
              <h1 style={{ margin:0, fontFamily:FONT.display, fontSize:24, fontWeight:800, letterSpacing:-0.5, color:COLORS.textPrimary }}>
                Budget<span style={{ color:COLORS.accent }}>Flow</span>
              </h1>
            </div>
            <p style={{ margin:0, fontSize:13, color:COLORS.textDim }}>Your personal finance command center</p>
          </div>
          {headerSlot}
        </header>

        {/* Tab nav */}
        <nav role="tablist" style={{ display:"flex", gap:4, marginBottom:28, background:COLORS.bgBase, borderRadius:14, padding:4, border:`1px solid ${COLORS.borderSubtle}` }}>
          {TABS.map(t => {
            const active = activeTab === t.id;
            return (
              <button key={t.id} role="tab" aria-selected={active} onClick={() => onTabChange(t.id)}
                style={{ flex:1, padding:"10px 16px", borderRadius:RADIUS.md, border:"none", cursor:"pointer",
                  background: active ? `linear-gradient(135deg,${COLORS.bgSurface},${COLORS.bgHover})` : "transparent",
                  color: active ? COLORS.accent : COLORS.textDim,
                  fontFamily:FONT.body, fontSize:13, fontWeight:600, transition:"all 0.2s",
                  boxShadow: active ? `0 2px 12px ${COLORS.accentDim}` : "none",
                  borderBottom: active ? `1px solid ${COLORS.accentBorder}` : "1px solid transparent" }}>
                {t.icon} {t.label}
              </button>
            );
          })}
        </nav>

        <main role="tabpanel">{children}</main>

        <footer style={{ marginTop:40, textAlign:"center", fontSize:11, color:COLORS.bgSurface }}>
          BudgetFlow · MERN Full-Stack Finance Dashboard
        </footer>
      </div>
    </div>
  );
}
