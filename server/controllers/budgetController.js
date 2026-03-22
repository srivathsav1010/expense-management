const Budget = require("../models/Budget");

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/budget
// Returns the singleton budget document. Creates it with 15000 default if absent.
// ─────────────────────────────────────────────────────────────────────────────
const getBudget = async (_req, res, next) => {
  try {
    let budget = await Budget.findOne({ _key: "singleton" });

    if (!budget) {
      budget = await Budget.create({ amount: 15000 });
    }

    res.json({ success: true, data: { amount: budget.amount } });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/budget
// Body: { amount: number }
// Updates (or creates) the singleton budget document.
// ─────────────────────────────────────────────────────────────────────────────
const updateBudget = async (req, res, next) => {
  try {
    const { amount } = req.body;

    if (amount === undefined || amount === null) {
      return res.status(400).json({ success: false, message: "amount is required" });
    }

    const parsed = Number(amount);
    if (isNaN(parsed) || parsed <= 0) {
      return res.status(400).json({ success: false, message: "amount must be a positive number" });
    }

    const budget = await Budget.findOneAndUpdate(
      { _key: "singleton" },
      { amount: parsed },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ success: true, data: { amount: budget.amount } });
  } catch (err) {
    next(err);
  }
};

module.exports = { getBudget, updateBudget };
