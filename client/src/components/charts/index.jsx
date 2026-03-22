import { COLORS, FONT } from "@constants/theme";
import { formatCurrency, toRad } from "@utils/helpers";

/* ── DonutRing ─────────────────────────────────────────────────────────────── */
export function DonutRing({ pct, spent, accentColor }) {
  const r = 80, cx = 100, cy = 100, sw = 14;
  const circ = 2 * Math.PI * r;
  const dash  = (pct / 100) * circ;
  return (
    <svg viewBox="0 0 200 200" style={{ width: "100%", maxWidth: 220 }}>
      <defs>
        <filter id="ring-glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={COLORS.bgBase} strokeWidth={sw}/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={accentColor} strokeWidth={sw}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`} filter="url(#ring-glow)"
        style={{ transition: "stroke-dasharray 0.8s cubic-bezier(.4,0,.2,1)" }}/>
      <text x={cx} y={cy-14} textAnchor="middle" fill={accentColor} fontSize="28" fontWeight="700" fontFamily={FONT.display}>{Math.round(pct)}%</text>
      <text x={cx} y={cy+8}  textAnchor="middle" fill={COLORS.textMuted}   fontSize="9"  fontFamily={FONT.body}>USED</text>
      <text x={cx} y={cy+26} textAnchor="middle" fill={COLORS.textPrimary} fontSize="11" fontFamily={FONT.body}>{formatCurrency(spent)}</text>
    </svg>
  );
}

/* ── PieChart ──────────────────────────────────────────────────────────────── */
export function PieChart({ data }) {
  const total  = data.reduce((s, d) => s + d.value, 0);
  const active = data.filter(d => d.value > 0);
  if (!total) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:160, color:COLORS.textDim, fontSize:13, fontFamily:FONT.body }}>
      No expenses yet
    </div>
  );
  let angle = -90;
  const slices = active.map(d => {
    const pct = d.value / total, a1 = angle;
    angle += pct * 360;
    const a2 = angle;
    const x1 = 100 + 75*Math.cos(toRad(a1)), y1 = 100 + 75*Math.sin(toRad(a1));
    const x2 = 100 + 75*Math.cos(toRad(a2)), y2 = 100 + 75*Math.sin(toRad(a2));
    return { ...d, pct, path:`M100,100 L${x1},${y1} A75,75 0 ${pct>.5?1:0},1 ${x2},${y2} Z` };
  });
  return (
    <svg viewBox="0 0 200 200" style={{ width:"100%", maxWidth:200 }}>
      <defs>{slices.map(s=>(
        <radialGradient key={s.id} id={`pg-${s.id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={s.color} stopOpacity="0.9"/>
          <stop offset="100%" stopColor={s.color} stopOpacity="0.45"/>
        </radialGradient>
      ))}</defs>
      {slices.map(s=><path key={s.id} d={s.path} fill={`url(#pg-${s.id})`} stroke={COLORS.bgDeep} strokeWidth="2"/>)}
      <circle cx="100" cy="100" r="38" fill={COLORS.bgBase}/>
      <text x="100" y="97"  textAnchor="middle" fill={COLORS.textPrimary} fontSize="13" fontFamily={FONT.display} fontWeight="700">{active.length}</text>
      <text x="100" y="110" textAnchor="middle" fill={COLORS.textMuted}   fontSize="8"  fontFamily={FONT.body}>CATEGORIES</text>
    </svg>
  );
}

/* ── BarChart ──────────────────────────────────────────────────────────────── */
export function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:130, padding:"0 4px" }}>
      {data.map(d => {
        const h = (d.value / max) * 100;
        return (
          <div key={d.id} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            {d.value > 0 && <span style={{ fontSize:8, color:COLORS.textMuted, fontFamily:FONT.body, textAlign:"center" }}>{formatCurrency(d.value)}</span>}
            <div style={{ width:"100%", height:`${h}%`, minHeight:d.value?4:0, background:`linear-gradient(180deg,${d.color}cc,${d.color}44)`, borderRadius:"4px 4px 0 0", boxShadow:`0 0 10px ${d.color}55`, border:`1px solid ${d.color}66`, transition:"height 0.6s cubic-bezier(.4,0,.2,1)" }}/>
            <span style={{ fontSize:14, textAlign:"center" }}>{d.icon}</span>
          </div>
        );
      })}
    </div>
  );
}
