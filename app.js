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

  updateEmptyState();

  taskItem.classList.add("task-item");
  taskItem.dataset.id = task.id;

  taskItem.innerHTML = `
  <div class="task-header">
    <span class="task-title">${task.name}</span>
  </div>
  <span class="task-description">${task.description}</span>
  <span>${task.createdAt}</span>
  <button onclick="deleteTask(this)" class="delete-btn">Delete</button>
  `;

  taskList.appendChild(taskItem);
  taskTimer();
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
  const taskTimer = document.createElement("p");
  taskTimer.className = "task-timer";
  // taskTimer.textContent = "testing";

  var x = setInterval(function () {
    var now = new Date().getDate();
    var countUpTimer = new Date("Mar 8, 2025 00:00:00").getTime();

    var distance = countUpTimer - now;

    // var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    taskTimer.innerHTML = hours + "h " + minutes + "m " + seconds + "s";

    if (distance < 0) {
      clearInterval(x);
      taskTimer.innerHTML = "Unavailable";
    }
  }, 1000);

  taskList.appendChild(taskTimer);
}
