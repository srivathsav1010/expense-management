export const todayISO        = () => new Date().toISOString().slice(0, 10);
export const formatCurrency  = n  => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
export const clamp           = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
export const calcUsagePct    = (spent, budget) => budget > 0 ? clamp((spent / budget) * 100, 0, 100) : 0;
export const toRad           = deg => (deg * Math.PI) / 180;

export const groupByCategory = expenses =>
  expenses.reduce((acc, e) => { acc[e.category] = (acc[e.category] || 0) + Number(e.amount); return acc; }, {});

export const buildCategoryTotals = (expenses, categories) => {
  const totals = groupByCategory(expenses);
  return [...categories].map(c => ({ ...c, value: totals[c.id] || 0 })).sort((a, b) => b.value - a.value);
};
