import { ExpenseForm } from "@components/expenses/ExpenseForm";
import { ExpenseList } from "@components/expenses/ExpenseList";

export function ExpensesPage() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <ExpenseForm layout="inline"/>
      <ExpenseList/>
    </div>
  );
}
