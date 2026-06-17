import "./App.css";
import { useState, useMemo } from "react";

const CATEGORIES = ["Food", "Transport", "Shopping", "Health", "Bills", "Other"];

const CAT_COLORS = {
  Food: "#1D9E75", Transport: "#378ADD", Shopping: "#7F77DD",
  Health: "#D85A30", Bills: "#BA7517", Other: "#888780",
};

function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [filter, setFilter] = useState("All");

  const addExpense = (e) => {
    e.preventDefault();
    if (!description || !amount || Number(amount) <= 0) return;
    setExpenses([
      ...expenses,
      { id: Date.now(), description, amount: Number(amount), category },
    ]);
    setDescription("");
    setAmount("");
  };

  const deleteExpense = (id) =>
    setExpenses(expenses.filter((e) => e.id !== id));

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const avg = expenses.length ? total / expenses.length : 0;

  // Group totals by category for the chart
  const byCategory = useMemo(() => {
    return CATEGORIES.reduce((acc, cat) => {
      acc[cat] = expenses
        .filter((e) => e.category === cat)
        .reduce((s, e) => s + e.amount, 0);
      return acc;
    }, {});
  }, [expenses]);

  const maxCatValue = Math.max(...Object.values(byCategory), 1);

  const filtered =
    filter === "All" ? expenses : expenses.filter((e) => e.category === filter);

  return (
    <div className="app">
      <h1>Expense tracker</h1>

      {/* Stats row */}
      <div className="stats">
        <div className="stat">
          <span className="stat-label">Total spent</span>
          <span className="stat-value danger">Rs. {total.toFixed(2)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Entries</span>
          <span className="stat-value">{expenses.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Avg per entry</span>
          <span className="stat-value">Rs. {avg.toFixed(0)}</span>
        </div>
      </div>

      {/* Form */}
      <form className="form-card" onSubmit={addExpense}>
        <div className="form-row-3">
          <div className="field">
            <label>Description</label>
            <input
              type="text"
              placeholder="e.g. Lunch"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Amount (Rs.)</label>
            <input
              type="number"
              placeholder="0"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <button type="submit" className="btn-add">+ Add expense</button>
      </form>

      {/* Bar chart */}
      {expenses.length > 0 && (
        <div className="chart-card">
          <p className="chart-title">Spending by category</p>
          {Object.entries(byCategory)
            .filter(([, v]) => v > 0)
            .map(([cat, val]) => (
              <div key={cat} className="bar-row">
                <span className="bar-label">{cat}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(val / maxCatValue) * 100}%`,
                      background: CAT_COLORS[cat],
                    }}
                  />
                </div>
                <span className="bar-val">Rs. {val.toFixed(0)}</span>
              </div>
            ))}
        </div>
      )}

      {/* Filter buttons */}
      <div className="filter-row">
        {["All", ...CATEGORIES].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <p className="empty">No expenses here yet.</p>
      ) : (
        <div className="list">
          {[...filtered].reverse().map((e) => (
            <div key={e.id} className="expense-item">
              <div
                className="cat-dot"
                style={{ background: CAT_COLORS[e.category] }}
              />
              <div style={{ flex: 1 }}>
                <div className="item-desc">{e.description}</div>
                <div className="item-cat">{e.category}</div>
              </div>
              <div className="item-amount">Rs. {e.amount.toFixed(2)}</div>
              <button
                className="btn-del"
                onClick={() => deleteExpense(e.id)}
                aria-label="Delete"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;