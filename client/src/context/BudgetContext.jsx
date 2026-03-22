import { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from "react";
import { fetchBudget, updateBudget as updateBudgetAPI } from "@services/budgetService";
import { fetchExpenses, createExpense as createExpenseAPI, deleteExpense as deleteExpenseAPI } from "@services/expenseService";

// ─────────────────────────────────────────────────────────────────────────────
// ACTION TYPES
// ─────────────────────────────────────────────────────────────────────────────
export const ACTIONS = {
  SET_LOADING:     "SET_LOADING",
  SET_ERROR:       "SET_ERROR",
  SET_BUDGET:      "SET_BUDGET",
  SET_EXPENSES:    "SET_EXPENSES",
  ADD_EXPENSE:     "ADD_EXPENSE",
  REMOVE_EXPENSE:  "REMOVE_EXPENSE",
};

// ─────────────────────────────────────────────────────────────────────────────
// REDUCER
// ─────────────────────────────────────────────────────────────────────────────
const initialState = {
  budget:   15000,
  expenses: [],
  loading:  true,   // true on first load
  error:    null,
};

function budgetReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:    return { ...state, loading: action.payload, error: null };
    case ACTIONS.SET_ERROR:      return { ...state, loading: false, error: action.payload };
    case ACTIONS.SET_BUDGET:     return { ...state, budget: action.payload };
    case ACTIONS.SET_EXPENSES:   return { ...state, expenses: action.payload, loading: false };
    case ACTIONS.ADD_EXPENSE:    return { ...state, expenses: [action.payload, ...state.expenses] };
    case ACTIONS.REMOVE_EXPENSE: return { ...state, expenses: state.expenses.filter(e => e.id !== action.payload) };
    default: return state;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTEXT + PROVIDER
// ─────────────────────────────────────────────────────────────────────────────
const BudgetContext = createContext(null);

export function BudgetProvider({ children }) {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  // ── Initial data fetch ─────────────────────────────────────────────────────
  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      try {
        const [budgetAmount, expenses] = await Promise.all([
          fetchBudget(),
          fetchExpenses(),
        ]);
        dispatch({ type: ACTIONS.SET_BUDGET,   payload: budgetAmount });
        dispatch({ type: ACTIONS.SET_EXPENSES,  payload: expenses });
      } catch (err) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: err.message });
      }
    };
    loadData();
  }, []);

  // ── Derived values ─────────────────────────────────────────────────────────
  const totalSpent = useMemo(
    () => state.expenses.reduce((sum, e) => sum + Number(e.amount), 0),
    [state.expenses]
  );
  const remaining = state.budget - totalSpent;

  // ── Action creators ────────────────────────────────────────────────────────
  const setBudget = useCallback(async (amount) => {
    try {
      const updated = await updateBudgetAPI(amount);
      dispatch({ type: ACTIONS.SET_BUDGET, payload: updated });
    } catch (err) {
      throw err;
    }
  }, []);

  const addExpense = useCallback(async (formData) => {
    try {
      const expense = await createExpenseAPI(formData);
      dispatch({ type: ACTIONS.ADD_EXPENSE, payload: expense });
    } catch (err) {
      throw err;
    }
  }, []);

  const removeExpense = useCallback(async (id) => {
    try {
      await deleteExpenseAPI(id);
      dispatch({ type: ACTIONS.REMOVE_EXPENSE, payload: id });
    } catch (err) {
      throw err;
    }
  }, []);

  const value = useMemo(() => ({
    budget:      state.budget,
    expenses:    state.expenses,
    loading:     state.loading,
    error:       state.error,
    totalSpent,
    remaining,
    setBudget,
    addExpense,
    removeExpense,
  }), [state, totalSpent, remaining, setBudget, addExpense, removeExpense]);

  return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>;
}

// ─────────────────────────────────────────────────────────────────────────────
// HOOK
// ─────────────────────────────────────────────────────────────────────────────
export function useBudget() {
  const ctx = useContext(BudgetContext);
  if (!ctx) throw new Error("useBudget must be inside <BudgetProvider>");
  return ctx;
}
