import { useMemo } from "react";
import { CATEGORIES } from "@constants/categories";
import { buildCategoryTotals } from "@utils/helpers";

export function useCategoryTotals(expenses) {
  return useMemo(() => buildCategoryTotals(expenses, CATEGORIES), [expenses]);
}
