import { useBudget }         from "@context/BudgetContext";
import { useCategoryTotals } from "@hooks/useCategoryTotals";
import { Card, SectionHeader, Badge } from "@components/ui/index.jsx";
import { formatCurrency }    from "@utils/helpers";
import { COLORS, FONT, RADIUS } from "@constants/theme";

export function CategoryBreakdown() {
  const { expenses, totalSpent } = useBudget();
  const totals  = useCategoryTotals(expenses);
  const active  = totals.filter(c => c.value > 0);

  return (
    <Card style={{ padding:0 }}>
      <div style={{ padding:"16px 24px", borderBottom:`1px solid ${COLORS.borderSubtle}` }}>
        <SectionHeader>Spending Breakdown</SectionHeader>
      </div>
      {active.length === 0 ? (
        <div style={{ padding:40, textAlign:"center", color:COLORS.textDim, fontSize:14, fontFamily:FONT.body }}>
          Add expenses to see your spending breakdown
        </div>
      ) : (
        active.map((c, i) => {
          const barPct = totalSpent > 0 ? (c.value / totalSpent) * 100 : 0;
          return (
            <div key={c.id} style={{ padding:"16px 24px", borderBottom: i < active.length-1 ? `1px solid ${COLORS.bgBase}` : "none" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                <span style={{ fontSize:14, color:COLORS.textSecondary, fontFamily:FONT.body }}>{c.icon}&nbsp;{c.label}</span>
                <div style={{ display:"flex", gap:14, alignItems:"center" }}>
                  <Badge color={c.color}>{barPct.toFixed(1)}% of total</Badge>
                  <span style={{ fontSize:15, fontWeight:700, color:c.color, fontFamily:FONT.display }}>{formatCurrency(c.value)}</span>
                </div>
              </div>
              <div style={{ height:6, background:COLORS.bgBase, borderRadius:RADIUS.sm, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${barPct}%`, background:`linear-gradient(90deg,${c.color},${c.color}88)`,
                  borderRadius:RADIUS.sm, boxShadow:`0 0 8px ${c.color}66`, transition:"width 0.8s cubic-bezier(.4,0,.2,1)" }}/>
              </div>
            </div>
          );
        })
      )}
    </Card>
  );
}
