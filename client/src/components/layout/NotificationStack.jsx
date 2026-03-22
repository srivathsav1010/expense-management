import { useNotification } from "@context/NotificationContext";
import { COLORS, FONT, RADIUS } from "@constants/theme";

export function NotificationStack() {
  const { notifications, dismiss } = useNotification();
  if (!notifications.length) return null;
  return (
    <div aria-live="polite" style={{ position:"fixed", top:24, right:24, zIndex:9999, display:"flex", flexDirection:"column", gap:8 }}>
      {notifications.map(n => {
        const color = n.type === "error" ? COLORS.danger : COLORS.accent;
        return (
          <div key={n.id} role="alert" onClick={() => dismiss(n.id)} title="Click to dismiss"
            style={{ background:`${color}22`, border:`1px solid ${color}66`, borderRadius:RADIUS.md,
              padding:"12px 20px", fontSize:13, color, fontFamily:FONT.body,
              backdropFilter:"blur(10px)", cursor:"pointer",
              display:"flex", alignItems:"center", gap:8, animation:"toastIn 0.3s ease" }}>
            <span aria-hidden>{n.type === "error" ? "✕" : "✓"}</span>
            {n.message}
          </div>
        );
      })}
    </div>
  );
}
