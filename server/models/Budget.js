const mongoose = require("mongoose");

/**
 * Budget — stores the user's single monthly budget document.
 * We use a singleton pattern (only one doc ever exists, identified by a
 * fixed key) so the client always reads/writes the same record.
 */
const budgetSchema = new mongoose.Schema(
  {
    amount: {
      type:     Number,
      required: [true, "Budget amount is required"],
      min:      [1, "Budget must be greater than zero"],
    },
    // Singleton key — guarantees only one Budget document
    _key: {
      type:    String,
      default: "singleton",
      unique:  true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Budget", budgetSchema);
