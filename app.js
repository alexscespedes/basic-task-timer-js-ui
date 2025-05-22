// Get Dom Elements

const taskName = document.getElementById("taskName");
const taskDescription = document.getElementById("taskDescription");
const taskList = document.getElementById("taskList");

const taskItem = document.createElement("li");

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
  updateEmptyState();

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
    tasks.pop();
    taskItem.remove();

    updateEmptyState();
  });

  taskList.appendChild(taskItem);
}

function updateEmptyState() {
  if (tasks.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "empty-list";
    emptyMessage.textContent = "No tasks added yet";
    taskList.appendChild(emptyMessage);
  } else {
    document.querySelector(".empty-list").remove();
  }
}

function clearInputs() {
  taskName.value = "";
  taskDescription.value = "";
}
