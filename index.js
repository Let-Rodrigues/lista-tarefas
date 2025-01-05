const form = document.querySelector("#todo-form");
const taskTitleInput = document.querySelector("#task-title-input");
const todoListUl = document.querySelector("#todo-list");
const clearAllButton = document.querySelector("#clear-all-button");

let tasks = [];

const storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
  renderTasks();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskTitle = taskTitleInput.value;

  if (taskTitle.length < 3) {
    alert("Sua tarefa precisa ter, pelo menos, 3 caracteres.");
    return;
  }

  const newTask = {
    title: taskTitle,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTask(newTask, tasks.length - 1);
  taskTitleInput.value = "";
});

clearAllButton.addEventListener("click", () => {
  if (confirm("Tem certeza que deseja limpar TODA a lista?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
});

clearSelectedButton.addEventListener("click", () => {
  const newTasks = tasks.filter((task) => !task.completed);
  tasks = newTasks;
  saveTasks();
  renderTasks();
});

function renderTask(task, index) {
  const li = document.createElement("li");
  li.classList.toggle("completed", task.completed); 
  li.dataset.index = index; 

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", () => toggleComplete(index,li));

  const label = document.createElement("label");
  label.textContent = task.title;

  const editButton = document.createElement("button");
  editButton.textContent = "Editar";
  editButton.classList.add("edit");
  editButton.addEventListener("click", () => editTask(index, label)); 

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Concluído";
  deleteButton.classList.add("delete");
  deleteButton.addEventListener("click", () => deleteTask(index));

  const controls = document.createElement("div");
  controls.classList.add("controls");
  controls.appendChild(editButton);
  controls.appendChild(deleteButton);

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(controls);
  todoListUl.appendChild(li);
}

function renderTasks() {
  todoListUl.innerHTML = "";
  tasks.forEach((task, index) => renderTask(task, index));
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleComplete(index, li) {
  tasks[index].completed = !tasks[index].completed;
  li.classList.toggle("completed", tasks[index].completed);
  saveTasks();
  renderTasks();
}

function editTask(index, label) {
  const newTitle = prompt("Editar tarefa", tasks[index].title);
  if (newTitle && newTitle.length >= 3) {
    tasks[index].title = newTitle;
    label.textContent = newTitle;
    saveTasks();
    renderTasks();
  } else if (newTitle) {
    alert("Sua tarefa precisa ter, pelo menos, 3 caracteres.");
  }
}

function deleteTask(index) {
  if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

