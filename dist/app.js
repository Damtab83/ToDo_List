"use strict";
let tasks = [];
let taskID = 0;
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
addTaskButton.addEventListener('click', () => {
    const taskDescription = taskInput.value;
    if (taskDescription) {
        addTask(taskDescription);
        taskInput.value = "";
    }
});
function addTask(description) {
    const newTask = {
        id: taskID++,
        description,
        completed: false
    };
    tasks.push(newTask);
    renderTasks();
}
function createButton(text, className, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = className;
    button.addEventListener('click', onClick);
    return button;
}
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement('li');
        const deleteButton = createButton("❌", "delete-button", () => deleteTask(task.id));
        const span = document.createElement("span");
        span.textContent = task.description;
        const toggleButton = createButton(task.completed ? "Faire" : "A faire", `task-button ${task.completed ? "done" : "todo"}`, () => { markAsCompleted(task.id); });
        li.appendChild(span);
        li.appendChild(deleteButton);
        li.appendChild(toggleButton);
        taskList.appendChild(li);
    });
}
function deleteTask(taskID) {
    tasks = tasks.filter((t) => t.id !== taskID);
    renderTasks();
}
function markAsCompleted(taskID) {
    const task = tasks.find((t) => t.id === taskID);
    if (task) {
        task.completed = !task.completed;
    }
    renderTasks();
}
