import { useBudget }         from "@context/BudgetContext";
import { useCategoryTotals } from "@hooks/useCategoryTotals";
import { BarChart }          from "@components/charts/index.jsx";
import { Card, SectionHeader, Badge } from "@components/ui/index.jsx";

export function BarChartCard() {
  const { expenses } = useBudget();
  const totals       = useCategoryTotals(expenses);
  const active       = totals.filter(c => c.value > 0);
  return (
    <Card>
      <SectionHeader>Spending by Category</SectionHeader>
      <BarChart data={totals}/>
      <div style={{ marginTop:14, display:"flex", flexWrap:"wrap", gap:6 }}>
        {active.map(c => <Badge key={c.id} color={c.color} icon={c.icon}>{c.label.split(" ")[0]}</Badge>)}
      </div>
    </Card>
  );
}
