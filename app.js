// Get Dom Elements

const taskName = document.getElementById("taskName");
const taskDescription = document.getElementById("taskDescription");
const taskList = document.getElementById("taskList");

let tasks = [];

// Check my code with taskManager.js

function addTask() {
  const name = taskName.value.trim();
  const description = taskDescription.value.trim();

  if (name === "") {
    alert("Please enter a name");
    return;
  }

  const task = {
    id: Date.now(),
    name: name,
    description: description,
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);
  console.log(tasks);
  renderTask(task);
  // Save Local Storage
  // Render Task

  // Count...
  clearInputs();
}

function renderTask(task) {
  const taskElement = document.createElement("li");

  // Remove the empty list element if any task.
  if (tasks.length >= 1) {
    document.querySelector(".empty-list").remove();
  }
  taskElement.classList.add("task-item");

  taskElement.innerHTML = `
  <span class="task-title">${task.name}</span>
  <span class="task-description">${task.description}</span>
  <span>${task.createdAt}</span>
  `;

  taskList.appendChild(taskElement);
}

function clearInputs() {
  taskName.value = "";
  taskDescription.value = "";
}
