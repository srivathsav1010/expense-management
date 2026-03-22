import { PieChartCard }      from "@components/analytics/PieChartCard";
import { BarChartCard }      from "@components/analytics/BarChartCard";
import { CategoryBreakdown } from "@components/analytics/CategoryBreakdown";

export function AnalyticsPage() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <PieChartCard/>
        <BarChartCard/>
      </div>
      <CategoryBreakdown/>
    </div>
  );
}
