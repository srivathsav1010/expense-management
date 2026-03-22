import { useMemo } from "react";
import { calcUsagePct } from "@utils/helpers";
import { BUDGET_WARNING_THRESHOLD, BUDGET_CRITICAL_THRESHOLD } from "@constants/config";
import { COLORS } from "@constants/theme";

export function useBudgetStatus(totalSpent, budget) {
  return useMemo(() => {
    const pct    = calcUsagePct(totalSpent, budget);
    const isOver = totalSpent > budget;
    let color, status;
    if (pct >= BUDGET_CRITICAL_THRESHOLD)     { color = COLORS.danger;  status = "Over Budget"; }
    else if (pct >= BUDGET_WARNING_THRESHOLD) { color = COLORS.warning; status = "Warning";     }
    else                                      { color = COLORS.accent;  status = "On Track";    }
    return { pct, color, status, isOver, isWarning: pct >= BUDGET_WARNING_THRESHOLD };
  }, [totalSpent, budget]);
}
