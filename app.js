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
  const taskItem = document.createElement("li");

  // Remove the empty list element if any task.
  if (tasks.length >= 1) {
    document.querySelector(".empty-list").remove();
  }
  taskItem.classList.add("task-item");

  taskItem.innerHTML = `
  <div class="task-header">
    <span class="task-title">${task.name}</span>
  </div>
  <span class="task-description">${task.description}</span>
  <span>${task.createdAt}</span>
  <button class="delete-btn">Delete</button>
  `;

  taskItem.querySelector(".delete-btn").addEventListener("click", () => {
    taskItem.remove();
    // Check if empty list to render again "No added list"
  });

  taskList.appendChild(taskItem);
}

function clearInputs() {
  taskName.value = "";
  taskDescription.value = "";
}
