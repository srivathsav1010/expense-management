import api from "./api";

/**
 * expenseService — all HTTP calls related to the expenses resource.
 */

/** Fetch all expenses */
export const fetchExpenses = async () => {
  const res = await api.get("/expenses");
  return res.data.data;
};

/** Create a new expense */
export const createExpense = async ({ amount, category, date, note }) => {
  const res = await api.post("/expenses", { amount, category, date, note });
  return res.data.data;
};

/** Delete an expense by id */
export const deleteExpense = async (id) => {
  await api.delete(`/expenses/${id}`);
  return id;
};
