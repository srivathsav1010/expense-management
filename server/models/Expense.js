const mongoose = require("mongoose");

const VALID_CATEGORIES = [
  "food",
  "transport",
  "shopping",
  "health",
  "entertainment",
  "utilities",
  "travel",
  "other",
];

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type:     Number,
      required: [true, "Amount is required"],
      min:      [0.01, "Amount must be greater than zero"],
    },
    category: {
      type:     String,
      required: [true, "Category is required"],
      enum:     {
        values:  VALID_CATEGORIES,
        message: "Invalid category: {VALUE}",
      },
    },
    date: {
      type:     String,          // stored as YYYY-MM-DD string
      required: [true, "Date is required"],
      match:    [/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD format"],
    },
    note: {
      type:    String,
      default: "",
      trim:    true,
      maxlength: [200, "Note cannot exceed 200 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Index for fast sorted queries
expenseSchema.index({ date: -1, createdAt: -1 });

module.exports = mongoose.model("Expense", expenseSchema);
