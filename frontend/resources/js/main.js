async function loadTodos() {
  const res = await fetch("/api/todos");
  const todos = await res.json();

  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  todos.forEach(todo => {
    list.innerHTML += `
      <li>
        ${todo.task}
        <button onclick="deleteTodo(${todo.id})">X</button>
      </li>
    `;
  });
}

async function addTodo() {
  const text = document.getElementById("todo-input").value;

  await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  loadTodos();
}

async function deleteTodo(id) {
  await fetch(`/api/todos/${id}`, { method: "DELETE" });
  loadTodos();
}

loadTodos();
