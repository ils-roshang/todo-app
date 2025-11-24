const express = require("express");
const path = require("path");
const getPool = require("./db");

const app = express();
app.use(express.json());

// Serve frontend
app.use("/", express.static(path.join(__dirname, "../frontend")));

// API: Get all todos
app.get("/api/todos", async (req, res) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.query("SELECT * FROM todos ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Add todo
app.post("/api/todos", async (req, res) => {
  try {
    const { text } = req.body;
    const pool = await getPool();
    await pool.query("INSERT INTO todos (task) VALUES (?)", [text]);
    res.json({ message: "Todo added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Delete todo
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const pool = await getPool();
    await pool.query("DELETE FROM todos WHERE id = ?", [req.params.id]);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server running on port " + port));
