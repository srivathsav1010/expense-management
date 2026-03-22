require("dotenv").config();

const express      = require("express");
const cors         = require("cors");
const connectDB    = require("./config/db");
const budgetRoutes  = require("./routes/budgetRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const errorHandler  = require("./middleware/errorHandler");

// ── Bootstrap ─────────────────────────────────────────────────────────────────
connectDB();

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL
    : "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/budget",   budgetRoutes);
app.use("/api/expenses", expenseRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "BudgetFlow API is running 🚀" });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ── Global error handler (must be last) ───────────────────────────────────────
app.use(errorHandler);

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || "development"}`);
});
