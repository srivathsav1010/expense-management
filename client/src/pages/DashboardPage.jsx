import { useBudget }       from "@context/BudgetContext";
import { useBudgetStatus } from "@hooks/useBudgetStatus";
import { StatCard }        from "@components/budget/StatCard";
import { BudgetRingCard }  from "@components/budget/BudgetRingCard";
import { ExpenseForm }     from "@components/expenses/ExpenseForm";
import { ExpenseList }     from "@components/expenses/ExpenseList";
import { formatCurrency }  from "@utils/helpers";
import { COLORS }          from "@constants/theme";

export function DashboardPage({ onNavigate }) {
  const { budget, totalSpent, remaining, expenses } = useBudget();
  const { pct, color } = useBudgetStatus(totalSpent, budget);

  const stats = [
    { label:"Total Budget",  value:formatCurrency(budget),                  accent:COLORS.accent,                               icon:"🎯", sub:"Monthly limit"               },
    { label:"Total Spent",   value:formatCurrency(totalSpent),               accent:color,                                       icon:"💸", sub:`${Math.round(pct)}% of budget`},
    { label:"Remaining",     value:formatCurrency(Math.abs(remaining)),      accent:remaining<0 ? COLORS.danger : COLORS.info,   icon:remaining<0 ? "⚠️" : "💚", sub:remaining<0 ? "Over budget!" : "Available to spend" },
    { label:"Transactions",  value:expenses.length,                          accent:"#8b5cf6",                                   icon:"📋", sub:"Total expenses logged"        },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16 }}>
        {stats.map(s => <StatCard key={s.label} {...s}/>)}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <BudgetRingCard/>
        <ExpenseForm layout="stacked"/>
      </div>
      <ExpenseList limit={5} onViewAll={() => onNavigate("expenses")}/>
    </div>
  );
}
