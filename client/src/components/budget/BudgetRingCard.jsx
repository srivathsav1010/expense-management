import { useBudget }       from "@context/BudgetContext";
import { useBudgetStatus } from "@hooks/useBudgetStatus";
import { DonutRing }       from "@components/charts/index.jsx";
import { Card, SectionHeader } from "@components/ui/index.jsx";
import { formatCurrency }  from "@utils/helpers";
import { COLORS, FONT, RADIUS } from "@constants/theme";

export function BudgetRingCard() {
  const { budget, totalSpent, remaining } = useBudget();
  const { pct, color, isWarning, isOver } = useBudgetStatus(totalSpent, budget);
  const remColor = remaining < 0 ? COLORS.danger : COLORS.info;

  return (
    <Card style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
      <SectionHeader>Budget Usage</SectionHeader>
      <DonutRing pct={pct} spent={totalSpent} accentColor={color}/>
      <div style={{ display:"flex", gap:28, width:"100%", justifyContent:"center" }}>
        {[{ label:"Spent", value:formatCurrency(totalSpent), color:COLORS.warning },
          { label:"Remaining", value:formatCurrency(Math.abs(remaining)), color:remColor }]
          .map((s, i) => (
            <div key={s.label} style={{ textAlign:"center", display:"flex", alignItems:"center", gap: i===1 ? 28 : 0 }}>
              {i===1 && <div style={{ width:1, height:32, background:COLORS.borderSubtle, marginRight:28 }}/>}
              <div>
                <div style={{ fontSize:11, color:COLORS.textDim, fontFamily:FONT.body }}>{s.label}</div>
                <div style={{ fontSize:16, fontWeight:700, color:s.color, fontFamily:FONT.display }}>{s.value}</div>
              </div>
            </div>
          ))}
      </div>
      {isWarning && (
        <div style={{ background:COLORS.dangerDim, border:`1px solid ${COLORS.dangerBorder}`, borderRadius:RADIUS.sm,
          padding:"8px 14px", fontSize:12, color:COLORS.danger, textAlign:"center", width:"100%", boxSizing:"border-box", fontFamily:FONT.body }}>
          ⚠️ {isOver ? "Budget exceeded! Review your expenses." : "Approaching your budget limit!"}
        </div>
      )}
    </Card>
  );
}
