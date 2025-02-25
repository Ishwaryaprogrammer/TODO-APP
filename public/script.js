const API_URL = 'http://localhost:3000/tasks';
document.getElementById('add-task-button').addEventListener('click', async () => {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;

    const response = await fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
    });

    const task = await response.json();
    addTaskToList(task);
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
});

function addTaskToList(task) {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('div');
    taskItem.className = `task ${task.completed ? 'completed' : ''}`;
    taskItem.innerHTML = `
        <div>
            <strong>${task.title}</strong>
            <p>${task.description}</p>
        </div>
        <button class="delete-task" onclick="deleteTask('${task._id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

async function deleteTask(id) {
    await fetch(`/tasks/${id}`, { method: 'DELETE' });
    document.getElementById('task-list').innerHTML = '';
    loadTasks();
}

async function loadTasks() {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    tasks.forEach(task => addTaskToList(task));
}

// Load tasks on page load
window.onload = loadTasks;
