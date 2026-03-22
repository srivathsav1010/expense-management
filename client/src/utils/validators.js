export const validateAmount = v => {
  const n = Number(v);
  if (!v || v === "")  return { valid: false, error: "Amount is required" };
  if (isNaN(n))        return { valid: false, error: "Amount must be a number" };
  if (n <= 0)          return { valid: false, error: "Amount must be greater than zero" };
  if (n > 10_000_000)  return { valid: false, error: "Amount is unrealistically large" };
  return { valid: true, error: null };
};

export const validateBudget = v => {
  const n = Number(v);
  if (!v || v === "")  return { valid: false, error: "Budget is required" };
  if (isNaN(n))        return { valid: false, error: "Budget must be a number" };
  if (n <= 0)          return { valid: false, error: "Budget must be greater than zero" };
  return { valid: true, error: null };
};

export const validateExpenseForm = ({ amount, category, date }) => {
  const a = validateAmount(amount);
  if (!a.valid)  return a;
  if (!category) return { valid: false, error: "Category is required" };
  if (!date)     return { valid: false, error: "Date is required" };
  return { valid: true, error: null };
};
