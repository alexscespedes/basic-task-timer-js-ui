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
    elapsedTime: 0,
    isRunning: false,
    intervalId: null,
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

  updateEmptyState();

  taskItem.classList.add("task-item");
  taskItem.dataset.id = task.id;
  // taskItem.dataset.isRunning = task.isRunning;

  taskItem.innerHTML = `
  <div class="task-header">
    <span class="task-title">${task.name}</span>
  </div>
  <span class="task-description">${task.description}</span>
  <p class="task-timer">00:00:00</p>
  <div class="task-controls">
    <button onclick="startTimer(this)" class="start-btn">Start</button>
    <button onclick="pauseTimer(this)" class="pause-btn">Pause</button>
    <button onclick="resetTimer(this)" class="reset-btn">Reset</button>
  </div>
  <button onclick="deleteTask(this)" class="delete-btn">Delete</button>
  `;

  taskList.appendChild(taskItem);
}

function startTimer(button) {
  const taskElement = button.parentElement.parentElement;
  const taskId = parseInt(taskElement.dataset.id);

  const task = tasks.find((task) => task.id === taskId);

  const timerDisplay = taskElement.querySelector(".task-timer");

  if (!task.isRunning) {
    task.isRunning = true;
    let elapsedSeconds = task.elapsedTime;

    const intervalId = setInterval(function () {
      elapsedSeconds++;
      task.elapsedTime = elapsedSeconds;

      const hours = Math.floor(elapsedSeconds / 3600);
      remainingAfterHours = elapsedSeconds % 3600; // Making a copy for not modifying elapsedSeconds.
      const minutes = Math.floor(remainingAfterHours / 60);
      const seconds = remainingAfterHours % 60;

      const formattedTime = `${String(hours).padStart(2, "0")} : ${String(
        minutes
      ).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;

      timerDisplay.innerHTML = formattedTime;
    }, 1000);

    task.intervalId = intervalId;
  } else {
    alert("The task timer is already running");
  }
}

function pauseTimer(button) {
  const taskElement = button.parentElement.parentElement;
  const taskId = parseInt(taskElement.dataset.id);

  const task = tasks.find((task) => task.id === taskId);
  if (task.isRunning) {
    clearInterval(task.intervalId);
    task.isRunning = false;
  } else {
    alert("The task timer is already paused");
  }
}

function resetTimer(button) {
  const taskElement = button.parentElement.parentElement;
  const taskId = parseInt(taskElement.dataset.id);

  const task = tasks.find((task) => task.id === taskId);
  clearInterval(task.intervalId);
  document.querySelector(".task-timer").innerHTML = "00:00:00";
  task.isRunning = false;
  task.elapsedTime = 0;
}

function deleteTask(button) {
  // ul --> li --> button
  const taskElement = button.parentElement;
  const taskId = parseInt(taskElement.dataset.id);

  // Remove from tasks array
  const index = tasks.findIndex((task) => task.id === taskId);

  if (index !== -1) {
    tasks.splice(index, 1);
  }

  taskElement.remove();
  updateEmptyState();
}

function updateEmptyState() {
  const existingEmpty = document.querySelector(".empty-list");
  if (tasks.length === 0) {
    if (!existingEmpty) {
      const emptyMessage = document.createElement("li");
      emptyMessage.className = "empty-list";
      emptyMessage.textContent = "No tasks added yet";
      taskList.appendChild(emptyMessage);
    }
  } else {
    if (existingEmpty) {
      document.querySelector(".empty-list").remove();
    }
  }
}

function clearInputs() {
  taskName.value = "";
  taskDescription.value = "";
}
