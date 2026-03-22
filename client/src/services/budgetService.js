import api from "./api";

/**
 * budgetService — all HTTP calls related to the budget resource.
 */

/** Fetch the current budget amount */
export const fetchBudget = async () => {
  const res = await api.get("/budget");
  return res.data.data.amount;
};

/** Update the budget amount */
export const updateBudget = async (amount) => {
  const res = await api.put("/budget", { amount });
  return res.data.data.amount;
};
