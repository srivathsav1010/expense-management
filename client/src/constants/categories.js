export const CATEGORIES = [
  { id: "food",          label: "Food & Dining",  color: "#f59e0b", icon: "🍽️" },
  { id: "transport",     label: "Transport",       color: "#3b82f6", icon: "🚗" },
  { id: "shopping",      label: "Shopping",        color: "#ec4899", icon: "🛍️" },
  { id: "health",        label: "Health",          color: "#10b981", icon: "💊" },
  { id: "entertainment", label: "Entertainment",   color: "#8b5cf6", icon: "🎬" },
  { id: "utilities",     label: "Utilities",       color: "#06b6d4", icon: "⚡" },
  { id: "travel",        label: "Travel",          color: "#f97316", icon: "✈️" },
  { id: "other",         label: "Other",           color: "#6b7280", icon: "📦" },
];

export const CATEGORY_MAP     = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));
export const DEFAULT_CATEGORY = CATEGORIES[0].id;
