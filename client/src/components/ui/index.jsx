import { COLORS, RADIUS, FONT } from "@constants/theme";

/* ── Input ─────────────────────────────────────────────────────────────────── */
export function Input({ label, error, style, ...props }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
      {label && <label style={{ fontSize: 10, color: COLORS.textMuted, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: FONT.body, fontWeight: 600 }}>{label}</label>}
      <input {...props} style={{ background: COLORS.bgSurface, border: `1px solid ${error ? COLORS.danger : COLORS.borderMuted}`, borderRadius: RADIUS.md, padding: "10px 14px", color: COLORS.textPrimary, fontSize: 14, fontFamily: FONT.body, outline: "none", width: "100%", boxSizing: "border-box", transition: "border-color 0.2s", ...style }} />
      {error && <span style={{ fontSize: 11, color: COLORS.danger, fontFamily: FONT.body }}>{error}</span>}
    </div>
  );
}

/* ── Select ────────────────────────────────────────────────────────────────── */
export function Select({ label, error, children, style, ...props }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
      {label && <label style={{ fontSize: 10, color: COLORS.textMuted, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: FONT.body, fontWeight: 600 }}>{label}</label>}
      <select {...props} style={{ background: COLORS.bgSurface, border: `1px solid ${error ? COLORS.danger : COLORS.borderMuted}`, borderRadius: RADIUS.md, padding: "10px 14px", color: COLORS.textPrimary, fontSize: 14, fontFamily: FONT.body, outline: "none", width: "100%", boxSizing: "border-box", cursor: "pointer", ...style }}>{children}</select>
      {error && <span style={{ fontSize: 11, color: COLORS.danger, fontFamily: FONT.body }}>{error}</span>}
    </div>
  );
}

/* ── Button ────────────────────────────────────────────────────────────────── */
const BTN = {
  primary: { background: `linear-gradient(135deg,${COLORS.accent}cc,${COLORS.accent}88)`, border: `1px solid ${COLORS.accentBorder}`, color: "#0f172a" },
  danger:  { background: COLORS.dangerDim,  border: `1px solid ${COLORS.dangerBorder}`, color: COLORS.danger },
  ghost:   { background: "transparent",     border: `1px solid ${COLORS.borderMuted}`,  color: COLORS.textSecondary },
  muted:   { background: "linear-gradient(135deg,#6b728033,#6b728022)", border: "1px solid #6b728044", color: COLORS.textPrimary },
};
export function Button({ variant = "primary", fullWidth = false, disabled = false, style, children, ...props }) {
  const v = BTN[variant] ?? BTN.primary;
  return (
    <button {...props} disabled={disabled} style={{ ...v, borderRadius: RADIUS.md, padding: "10px 20px", fontSize: 14, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", fontFamily: FONT.body, transition: "all 0.2s", whiteSpace: "nowrap", width: fullWidth ? "100%" : undefined, opacity: disabled ? 0.6 : 1, ...style }}>
      {children}
    </button>
  );
}

/* ── Card ──────────────────────────────────────────────────────────────────── */
export function Card({ accent, children, style, ...props }) {
  return (
    <div {...props} style={{ background: `linear-gradient(135deg,${COLORS.bgSurface} 0%,${COLORS.bgHover} 100%)`, border: `1px solid ${accent ? `${accent}33` : COLORS.borderSubtle}`, borderRadius: RADIUS.xl, padding: "24px", position: "relative", overflow: "hidden", ...style }}>
      {accent && <div aria-hidden style={{ position: "absolute", top: -24, right: -24, width: 96, height: 96, borderRadius: "50%", background: `radial-gradient(circle,${accent}22,transparent 70%)`, pointerEvents: "none" }} />}
      {children}
    </div>
  );
}

/* ── SectionHeader ─────────────────────────────────────────────────────────── */
export function SectionHeader({ children, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
      <span style={{ fontSize: 13, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 2, fontWeight: 600, fontFamily: FONT.body }}>{children}</span>
      {action}
    </div>
  );
}

/* ── Badge ─────────────────────────────────────────────────────────────────── */
export function Badge({ color, icon, children, style }) {
  return (
    <span style={{ background: `${color}22`, border: `1px solid ${color}44`, borderRadius: RADIUS.sm, padding: "4px 10px", fontSize: 11, color, fontFamily: FONT.body, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4, ...style }}>
      {icon && <span>{icon}</span>}{children}
    </span>
  );
}

/* ── Spinner ───────────────────────────────────────────────────────────────── */
export function Spinner({ size = 40 }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 40 }}>
      <div style={{ width: size, height: size, border: `3px solid ${COLORS.borderMuted}`, borderTop: `3px solid ${COLORS.accent}`, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
    </div>
  );
}

/* ── ErrorBanner ───────────────────────────────────────────────────────────── */
export function ErrorBanner({ message, onRetry }) {
  return (
    <div style={{ background: COLORS.dangerDim, border: `1px solid ${COLORS.dangerBorder}`, borderRadius: RADIUS.lg, padding: "20px 24px", textAlign: "center", fontFamily: FONT.body }}>
      <div style={{ fontSize: 14, color: COLORS.danger, marginBottom: 12 }}>⚠️ {message}</div>
      {onRetry && <Button variant="danger" onClick={onRetry} style={{ fontSize: 12, padding: "8px 16px" }}>Retry</Button>}
    </div>
  );
}
