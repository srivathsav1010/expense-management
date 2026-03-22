import { useState } from "react";
import { CATEGORY_MAP }  from "@constants/categories";
import { formatCurrency } from "@utils/helpers";
import { Button }         from "@components/ui/index.jsx";
import { COLORS, FONT, RADIUS } from "@constants/theme";

export function ExpenseRow({ expense, onRemove, striped = false }) {
  const cat = CATEGORY_MAP[expense.category] ?? CATEGORY_MAP.other;
  const [removing, setRemoving] = useState(false);

  const handleRemove = async () => {
    setRemoving(true);
    try { await onRemove(expense.id); }
    catch { setRemoving(false); }
  };

  return (
    <div style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 24px",
      background: striped ? "rgba(255,255,255,0.012)" : "transparent",
      opacity: removing ? 0.5 : 1, transition:"all 0.2s" }}>
      <div style={{ width:44, height:44, borderRadius:RADIUS.md, display:"flex", alignItems:"center",
        justifyContent:"center", background:`${cat.color}22`, border:`1px solid ${cat.color}44`, fontSize:20, flexShrink:0 }}>
        {cat.icon}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontWeight:600, color:COLORS.textSecondary, fontSize:14, fontFamily:FONT.body,
          overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {expense.note || cat.label}
        </div>
        <div style={{ fontSize:12, color:COLORS.textDim, marginTop:2, fontFamily:FONT.body }}>
          <span style={{ color:cat.color, fontWeight:600 }}>{cat.label}</span> · {expense.date}
        </div>
      </div>
      <div style={{ fontSize:18, fontWeight:700, color:COLORS.textPrimary, fontFamily:FONT.display, minWidth:90, textAlign:"right", flexShrink:0 }}>
        {formatCurrency(expense.amount)}
      </div>
      <Button variant="danger" onClick={handleRemove} disabled={removing}
        aria-label={`Remove ${expense.note || cat.label}`}
        style={{ padding:"6px 10px", fontSize:12 }}>
        {removing ? "…" : "✕"}
      </Button>
    </div>
  );
}
