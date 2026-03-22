const Expense = require("../models/Expense");

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/expenses
// Returns all expenses sorted by date descending.
// ─────────────────────────────────────────────────────────────────────────────
const getExpenses = async (_req, res, next) => {
  try {
    const expenses = await Expense.find().sort({ date: -1, createdAt: -1 });
    res.json({ success: true, data: expenses });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/expenses
// Body: { amount, category, date, note? }
// Creates and returns a new expense.
// ─────────────────────────────────────────────────────────────────────────────
const createExpense = async (req, res, next) => {
  try {
    const { amount, category, date, note } = req.body;

    const expense = await Expense.create({ amount, category, date, note: note || "" });

    res.status(201).json({ success: true, data: expense });
  } catch (err) {
    // Mongoose validation errors → 400
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((e) => e.message).join(", ");
      return res.status(400).json({ success: false, message });
    }
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/expenses/:id
// Deletes the expense with the given MongoDB id.
// ─────────────────────────────────────────────────────────────────────────────
const deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    res.json({ success: true, data: { id: req.params.id } });
  } catch (err) {
    // Invalid ObjectId format
    if (err.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid expense id" });
    }
    next(err);
  }
};

module.exports = { getExpenses, createExpense, deleteExpense };
