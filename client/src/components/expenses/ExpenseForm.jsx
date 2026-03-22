import { useBudget }       from "@context/BudgetContext";
import { useNotification } from "@context/NotificationContext";
import { useExpenseForm }  from "@hooks/useExpenseForm";
import { CATEGORIES }      from "@constants/categories";
import { Card, SectionHeader, Input, Select, Button } from "@components/ui/index.jsx";

export function ExpenseForm({ layout = "stacked" }) {
  const { addExpense } = useBudget();
  const { notify }     = useNotification();

  const { form, setField, error, submit, submitting } = useExpenseForm(async data => {
    await addExpense(data);
    notify("Expense added successfully");
  });

  const isInline = layout === "inline";
  const gridStyle = isInline
    ? { display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr auto", gap:12, alignItems:"end" }
    : { display:"flex", flexDirection:"column", gap:12 };

  return (
    <Card>
      <SectionHeader>{isInline ? "New Expense" : "Add Expense"}</SectionHeader>
      <div style={gridStyle}>
        <Input label="Amount" type="number" placeholder="₹ 0" value={form.amount} error={error}
          onChange={e => setField("amount", e.target.value)}
          onKeyDown={e => e.key==="Enter" && submit()}/>
        <Select label="Category" value={form.category} onChange={e => setField("category", e.target.value)}>
          {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
        </Select>
        <Input label="Date" type="date" value={form.date} onChange={e => setField("date", e.target.value)}/>
        <Input label="Note" type="text" placeholder="Optional note" value={form.note}
          onChange={e => setField("note", e.target.value)}
          onKeyDown={e => e.key==="Enter" && submit()}/>
        <Button onClick={submit} disabled={submitting} fullWidth={!isInline}
          style={isInline ? { alignSelf:"flex-end" } : { marginTop:4, padding:"13px" }}>
          {submitting ? "Adding…" : "+ Add"}
        </Button>
      </div>
    </Card>
  );
}
