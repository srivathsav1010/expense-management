import { useState } from "react";
import { useBudget } from "@context/BudgetContext";
import { useNotification } from "@context/NotificationContext";
import { validateBudget } from "@utils/validators";
import { formatCurrency } from "@utils/helpers";
import { Button, Input } from "@components/ui/index.jsx";
import { COLORS, FONT, RADIUS } from "@constants/theme";

export function BudgetHeader() {
  const { budget, setBudget } = useBudget();
  const { notify }            = useNotification();
  const [editing,  setEditing]  = useState(false);
  const [input,    setInput]    = useState("");
  const [error,    setError]    = useState(null);
  const [saving,   setSaving]   = useState(false);

  const openEdit = () => { setInput(String(budget)); setEditing(true); setError(null); };

  const save = async () => {
    const { valid, error: err } = validateBudget(input);
    if (!valid) { setError(err); return; }
    setSaving(true);
    try {
      await setBudget(Number(input));
      notify("Budget updated successfully");
      setEditing(false);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const cancel = () => { setEditing(false); setError(null); };

  if (editing) return (
    <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
      <Input type="number" value={input} error={error}
        onChange={e => { setInput(e.target.value); setError(null); }}
        onKeyDown={e => { if (e.key==="Enter") save(); if (e.key==="Escape") cancel(); }}
        style={{ width:140 }} autoFocus/>
      <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
      <Button onClick={cancel} variant="muted">✕</Button>
    </div>
  );

  return (
    <div onClick={openEdit} title="Click to edit monthly budget"
      style={{ background:COLORS.bgSurface, border:`1px solid ${COLORS.borderSubtle}`, borderRadius:RADIUS.md,
        padding:"10px 18px", cursor:"pointer", textAlign:"right", transition:"border-color 0.2s" }}>
      <div style={{ fontSize:10, color:COLORS.textDim, letterSpacing:1.5, textTransform:"uppercase", marginBottom:2, fontFamily:FONT.body }}>Monthly Budget</div>
      <div style={{ fontSize:20, fontWeight:700, color:COLORS.accent, fontFamily:FONT.display }}>{formatCurrency(budget)}</div>
      <div style={{ fontSize:10, color:COLORS.borderMuted, marginTop:2, fontFamily:FONT.body }}>click to edit ✏️</div>
    </div>
  );
}
