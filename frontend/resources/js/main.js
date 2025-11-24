const todoList = document.getElementById("todo");
const addBtn = document.getElementById("add");
const itemInput = document.getElementById("item");

// Fetch existing todos from backend
async function loadTodos() {
  const res = await fetch("/api/todos");
  const todos = await res.json();
  todoList.innerHTML = "";
  todos.forEach(todo => addItemToDOM(todo));
}

// Add item to backend
async function addTodo(text) {
  await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  loadTodos();
}

// Delete item from backend
async function deleteTodo(id) {
  await fetch(`/api/todos/${id}`, { method: "DELETE" });
  loadTodos();
}

// Render item in DOM
function addItemToDOM(todo) {
  const li = document.createElement("li");
  li.textContent = todo.task;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.onclick = () => deleteTodo(todo.id);

  li.appendChild(delBtn);
  todoList.appendChild(li);
}

// Event listener for add button
addBtn.addEventListener("click", () => {
  const value = itemInput.value.trim();
  if (!value) return;
  addTodo(value);
  itemInput.value = "";
});

// Load todos on page load
loadTodos();
