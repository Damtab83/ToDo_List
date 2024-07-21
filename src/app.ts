interface Task {
    id: number,
    description: string,
    completed: boolean
}

let tasks: Task[] = [];
let taskID = 0;

const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const addTaskButton = document.getElementById('addTaskButton') as HTMLButtonElement;
const taskList = document.getElementById('taskList') as HTMLUListElement;

addTaskButton.addEventListener('click', () => {
    const taskDescription = taskInput.value;
    if(taskDescription) {
        addTask(taskDescription);
        taskInput.value ="";
    }
})

function addTask(description: string) {
    const newTask: Task = {
        id: taskID++,
        description,
        completed: false
    }
    tasks.push(newTask);
    renderTasks();
}

function createButton(text: string, className: string, onClick: () => void): HTMLButtonElement {
    const button = document.createElement('button')
    button.textContent = text
    button.className = className
    button.addEventListener('click', onClick)
    return button;
}

function renderTasks(): void {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement('li');

        const deleteButton = createButton("❌", "delete-button", () => deleteTask(task.id));

        const span = document.createElement("span")
        span.textContent = task.description

        const toggleButton = createButton(task.completed ? "Faire" : "A faire",
            `task-button ${task.completed ? "done" : "todo"}`,
            () => {markAsCompleted(task.id)})

        li.appendChild(span);
        li.appendChild(deleteButton);
        li.appendChild(toggleButton);
        taskList.appendChild(li);
    })
}

function deleteTask(taskID: number):void {
    tasks = tasks.filter((t) => t.id !== taskID)
    renderTasks();
}
function markAsCompleted(taskID: number): void {
    const task = tasks.find((t) => t.id === taskID);
    if(task){
        task.completed = !task.completed;
    }
    renderTasks();
}