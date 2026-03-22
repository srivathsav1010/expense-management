import { useBudget }       from "@context/BudgetContext";
import { useNotification } from "@context/NotificationContext";
import { ExpenseRow }      from "./ExpenseRow";
import { SectionHeader }   from "@components/ui/index.jsx";
import { formatCurrency }  from "@utils/helpers";
import { COLORS, FONT, RADIUS } from "@constants/theme";

export function ExpenseList({ limit, onViewAll }) {
  const { expenses, totalSpent, removeExpense } = useBudget();
  const { notify } = useNotification();

  const handleRemove = async id => {
    await removeExpense(id);
    notify("Expense removed");
  };

  const visible = limit ? expenses.slice(0, limit) : expenses;

  const viewAllBtn = onViewAll ? (
    <button onClick={onViewAll} style={{ background:"none", border:"none", color:COLORS.accent, cursor:"pointer", fontSize:12, fontFamily:FONT.body }}>
      View all →
    </button>
  ) : null;

  return (
    <div style={{ background:`linear-gradient(135deg,${COLORS.bgSurface} 0%,${COLORS.bgBase} 100%)`,
      border:`1px solid ${COLORS.borderSubtle}`, borderRadius:RADIUS.xl, overflow:"hidden" }}>

      <div style={{ padding:"16px 24px", borderBottom:`1px solid ${COLORS.borderSubtle}`,
        display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <SectionHeader action={viewAllBtn}>
          {limit ? "Recent Expenses" : "All Expenses"}
        </SectionHeader>
        <span style={{ fontSize:12, color:COLORS.textDim, fontFamily:FONT.body }}>
          {expenses.length} records · {formatCurrency(totalSpent)}
        </span>
      </div>

      {visible.length === 0 ? (
        <div style={{ padding:40, textAlign:"center", color:COLORS.textDim, fontSize:14, fontFamily:FONT.body }}>
          No expenses recorded yet. Add one above!
        </div>
      ) : (
        visible.map((expense, i) => (
          <div key={expense.id} style={{ borderBottom: i < visible.length-1 ? `1px solid ${COLORS.bgBase}` : "none" }}>
            <ExpenseRow expense={expense} onRemove={handleRemove} striped={i % 2 !== 0}/>
          </div>
        ))
      )}
    </div>
  );
}
