import { Card } from "@components/ui/index.jsx";
import { COLORS, FONT } from "@constants/theme";

export function StatCard({ label, value, sub, accent, icon }) {
  return (
    <Card accent={accent}>
      <div style={{ fontSize:22, marginBottom:8 }}>{icon}</div>
      <div style={{ fontSize:10, color:COLORS.textMuted, fontFamily:FONT.body, textTransform:"uppercase", letterSpacing:1.5, marginBottom:6 }}>{label}</div>
      <div style={{ fontSize:26, fontWeight:700, color:accent, fontFamily:FONT.display, lineHeight:1 }}>{value}</div>
      {sub && <div style={{ fontSize:11, color:COLORS.textDim, fontFamily:FONT.body, marginTop:6 }}>{sub}</div>}
    </Card>
  );
}
