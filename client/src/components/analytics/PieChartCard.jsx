import { useBudget }         from "@context/BudgetContext";
import { useCategoryTotals } from "@hooks/useCategoryTotals";
import { PieChart }          from "@components/charts/index.jsx";
import { Card, SectionHeader } from "@components/ui/index.jsx";
import { formatCurrency }    from "@utils/helpers";
import { COLORS, FONT }      from "@constants/theme";

export function PieChartCard() {
  const { expenses } = useBudget();
  const totals       = useCategoryTotals(expenses);
  const active       = totals.filter(c => c.value > 0);
  return (
    <Card>
      <SectionHeader>Category Distribution</SectionHeader>
      <div style={{ display:"flex", alignItems:"center", gap:24 }}>
        <div style={{ flexShrink:0 }}><PieChart data={totals}/></div>
        <div style={{ display:"flex", flexDirection:"column", gap:8, flex:1, minWidth:0 }}>
          {active.length === 0
            ? <span style={{ fontSize:12, color:COLORS.textDim, fontFamily:FONT.body }}>No data yet</span>
            : active.map(c => (
                <div key={c.id} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:c.color, flexShrink:0 }}/>
                  <span style={{ fontSize:11, color:COLORS.textMuted, flex:1, fontFamily:FONT.body, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.label}</span>
                  <span style={{ fontSize:11, fontWeight:600, color:c.color, fontFamily:FONT.body, flexShrink:0 }}>{formatCurrency(c.value)}</span>
                </div>
              ))
          }
        </div>
      </div>
    </Card>
  );
}
