# 💰 BudgetFlow — MERN Full-Stack Expense Budget Platform

A production-grade personal finance dashboard built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Vite**.

---

## 🏗️ Project Architecture

```
budgetflow-mern/
├── server/                     ← Express + MongoDB REST API
│   ├── config/
│   │   └── db.js               ← Mongoose connection
│   ├── models/
│   │   ├── Budget.js           ← Budget mongoose model
│   │   └── Expense.js          ← Expense mongoose model
│   ├── controllers/
│   │   ├── budgetController.js
│   │   └── expenseController.js
│   ├── routes/
│   │   ├── budgetRoutes.js
│   │   └── expenseRoutes.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── .env.example
│   ├── package.json
│   └── index.js                ← Express entry point
│
└── client/                     ← React + Vite frontend
    ├── src/
    │   ├── constants/          ← categories, theme, config
    │   ├── utils/              ← helpers, validators
    │   ├── services/           ← axios API layer
    │   │   ├── api.js          ← axios instance
    │   │   ├── budgetService.js
    │   │   └── expenseService.js
    │   ├── context/
    │   │   ├── BudgetContext.jsx
    │   │   └── NotificationContext.jsx
    │   ├── hooks/
    │   │   ├── useExpenseForm.js
    │   │   ├── useCategoryTotals.js
    │   │   └── useBudgetStatus.js
    │   ├── components/
    │   │   ├── ui/             ← Input, Select, Button, Card, Badge, SectionHeader
    │   │   ├── charts/         ← DonutRing, PieChart, BarChart
    │   │   ├── layout/         ← AppShell, NotificationStack
    │   │   ├── budget/         ← BudgetHeader, BudgetRingCard, StatCard
    │   │   ├── expenses/       ← ExpenseForm, ExpenseList, ExpenseRow
    │   │   └── analytics/      ← PieChartCard, BarChartCard, CategoryBreakdown
    │   ├── pages/
    │   │   ├── DashboardPage.jsx
    │   │   ├── ExpensesPage.jsx
    │   │   └── AnalyticsPage.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── styles/global.css
    ├── index.html
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB (local or [MongoDB Atlas](https://cloud.mongodb.com))

### 1. Clone & Install

```bash
# Install all dependencies at once
npm run install:all
```

### 2. Configure Environment

```bash
cd server
cp .env.example .env
# Edit .env and set your MONGO_URI
```

```env
MONGO_URI=mongodb://localhost:27017/budgetflow
PORT=5000
NODE_ENV=development
```

### 3. Run Development Servers

```bash
# From root — starts both server (port 5000) and client (port 3000) concurrently
npm run dev
```

Or separately:
```bash
npm run server   # Express API on http://localhost:5000
npm run client   # Vite React on http://localhost:3000
```

---

## 📡 API Endpoints

### Budget
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/budget` | Get current budget |
| PUT    | `/api/budget` | Update budget amount |

### Expenses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/expenses` | Get all expenses |
| POST   | `/api/expenses` | Create new expense |
| DELETE | `/api/expenses/:id` | Delete expense |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 5 |
| Backend | Node.js + Express 4 |
| Database | MongoDB + Mongoose |
| HTTP Client | Axios |
| State | React Context + useReducer |
| Charts | Custom SVG |
| Fonts | Syne + DM Sans |
