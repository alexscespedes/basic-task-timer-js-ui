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
    <button onclick="pauseTimer()" class="pause-btn">Pause</button>
    <button onclick="resetTimer()" class="reset-btn">Reset</button>
  </div>
  <button onclick="deleteTask(this)" class="delete-btn">Delete</button>
  `;

  taskList.appendChild(taskItem);
}

function startTimer(button) {
  const taskElement = button.parentElement.parentElement;
  const taskId = parseInt(taskElement.dataset.id);
  // const running = taskElement.dataset.isRunning;

  const task = tasks.find((task) => task.id === taskId);

  const timerDisplay = taskElement.querySelector(".task-timer");

  if (!task.isRunning) {
    elapsedSeconds = task.elapsedTime;
    setInterval(function () {
      elapsedSeconds++;

      const hours = Math.floor(elapsedSeconds / 3600);
      elapsedSeconds %= 3600;
      const minutes = Math.floor(elapsedSeconds / 60);
      const seconds = elapsedSeconds % 60;

      const formattedTime = `${String(hours).padStart(2, "0")} : ${String(
        minutes
      ).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;
      console.log(formattedTime);

      timerDisplay.innerHTML = formattedTime;
    }, 1000);
  }
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
  if (tasks.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "empty-list";
    emptyMessage.textContent = "No tasks added yet";
    taskList.appendChild(emptyMessage);
  } else {
    document.querySelector(".empty-list").remove();
    // Consider add the task timer remove here when there is not tasks
  }
}

function clearInputs() {
  taskName.value = "";
  taskDescription.value = "";
}

function taskTimer() {
  let elapsedSeconds = 0;

  const startBtn = taskItem.querySelector(".start-btn");
  const pauseBtn = taskItem.querySelector(".pause-btn");
  const resetBtn = taskItem.querySelector(".reset-btn");

  // function startTimer() {
  setInterval(function () {
    elapsedSeconds++;

    const hours = Math.floor(elapsedSeconds / 3600);
    elapsedSeconds %= 3600;
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;

    const formattedTime = `${String(hours).padStart(2, "0")} : ${String(
      minutes
    ).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;
    console.log(formattedTime);

    taskTimer.innerHTML = formattedTime;
  }, 1000);
  // }
}

function resetTimer(x) {
  clearInterval(x);
}
