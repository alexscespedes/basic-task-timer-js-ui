// === DOM ELEMENTS ===

const taskName = document.getElementById("taskName");
const taskDescription = document.getElementById("taskDescription");
const taskList = document.getElementById("taskList");

let tasks = [];

window.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  renderAllTasks();
});

// === EVENT LISTENERS ===
document.getElementById("addTaskBtn").addEventListener("click", handleAddTask);

// === TASK FUNCTIONS ===

function handleAddTask() {
  const name = taskName.value.trim();
  const description = taskDescription.value.trim();

  if (name === "") {
    alert("Please enter a name");
    return;
  }

  const task = {
    id: Date.now(),
    name,
    description,
    elapsedTime: 0,
    isRunning: false,
    intervalId: null,
    createdAt: new Date().toISOString(),
  };

  tasks.unshift(task);
  saveToLocalStorage();
  renderAllTasks();
  clearInputs();
}

function renderAllTasks() {
  taskList.innerHTML = "";
  if (tasks.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-list";
    empty.textContent = "No tasks added yet";
    taskList.appendChild(empty);
    return;
  }

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.dataset.id = task.id;

    taskItem.innerHTML = `
    <div class="task-header">
      <span class="task-title">${task.name}</span>
    </div>
    <span class="task-description">${task.description}</span>
    <p class="task-timer">${formatTime(task.elapsedTime)}</p>
    <div class="task-controls">
      <button class="start-btn">Start</button>
      <button class="pause-btn">Pause</button>
      <button class="reset-btn">Reset</button>
    </div>
    <button class="delete-btn">Delete</button>
    `;

    // Attach event listeners
    taskItem
      .querySelector(".start-btn")
      .addEventListener("click", () => startTimer(task.id, taskItem));
    taskItem
      .querySelector(".pause-btn")
      .addEventListener("click", () => pauseTimer(task.id));
    taskItem
      .querySelector(".reset-btn")
      .addEventListener("click", () => resetTimer(task.id, taskItem));
    taskItem
      .querySelector(".delete-btn")
      .addEventListener("click", () => deleteTask(task.id));

    taskList.appendChild(taskItem);
  });
}

function startTimer(id, element) {
  const task = tasks.find((task) => task.id === id);
  if (!task || task.isRunning) {
    alert("Timer already running");
    return;
  }

  task.isRunning = true;
  task.intervalId = setInterval(() => {
    task.elapsedTime++;
    const timerDisplay = element.querySelector(".task-timer");
    timerDisplay.textContent = formatTime(task.elapsedTime);
    saveToLocalStorage();
  }, 1000);
}

function pauseTimer(id) {
  const task = tasks.find((task) => task.id === id);
  if (!task || !task.isRunning) {
    alert("Timer is not running.");
    return;
  }

  clearInterval(task.intervalId);
  task.intervalId = null;
  task.isRunning = false;
  saveToLocalStorage();
}

function resetTimer(id, element) {
  const task = tasks.find((task) => task.id === id);
  if (!task) return;

  clearInterval(task.intervalId);
  task.elapsedTime = 0;
  task.isRunning = false;
  task.intervalId = null;

  element.querySelector(".task-timer").textContent = formatTime(0);
  saveToLocalStorage();
}

function deleteTask(id) {
  const task = tasks.find((task) => task.id === id);
  if (task && task.intervalId) {
    clearInterval(task.intervalId);
  }

  tasks = tasks.filter((task) => task.id !== id);
  saveToLocalStorage();
  renderAllTasks();
}

// === UTILITIES ===

function clearInputs() {
  taskName.value = "";
  taskDescription.value = "";
}

function formatTime(seconds) {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${secs}`;
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadFromLocalStorage() {
  const stored = localStorage.getItem("tasks");
  tasks = stored ? JSON.parse(stored) : [];
}
