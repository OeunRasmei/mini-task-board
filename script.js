const form = document.querySelector("#taskForm");
const input = document.querySelector("#taskInput");
const list = document.querySelector("#taskList");
const count = document.querySelector("#taskCount");
const clearCompleted = document.querySelector("#clearCompleted");
const filterButtons = [...document.querySelectorAll(".filter")];

let tasks = [];
let currentFilter = "all";

function render() {
  const visibleTasks = tasks.filter((task) => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  list.innerHTML = "";

  visibleTasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `task${task.completed ? " completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      render();
    });

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      render();
    });

    item.append(checkbox, title, deleteButton);
    list.appendChild(item);
  });

  count.textContent = `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = input.value.trim();
  if (!title) return;

  tasks.unshift({
    id: crypto.randomUUID(),
    title,
    completed: false,
  });

  input.value = "";
  render();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    render();
  });
});

clearCompleted.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  render();
});

render();
