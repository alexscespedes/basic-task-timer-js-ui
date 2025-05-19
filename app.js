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
  // Save Local Storage
  // Render Task
  // Count...
  clearInputs();
}

function clearInputs() {
  taskName.value = "";
  taskDescription.value = "";
}
