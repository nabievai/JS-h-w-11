document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const errorMessage = document.getElementById('error-message');
    const taskList = document.getElementById('task-ul');

    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(function (storedTask) {
        addTaskToDOM(storedTask.text, storedTask.time);
    });

    addTaskButton.addEventListener('click', function (event) {
        event.preventDefault();

        const taskText = taskInput.value.trim();
        if (taskText === '') {
            errorMessage.textContent = 'Please, write text';
            return;
        }

        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, "0");
        const minutes = currentTime.getMinutes().toString().padStart(2, "0");

        const newTask = { text: taskText, time: `${hours}:${minutes}` };
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        addTaskToDOM(taskText, `${hours}:${minutes}`);

        taskInput.value = '';
        errorMessage.textContent = '';
    });

    function addTaskToDOM(text, time) {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `${text} - ${time}`;

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'X';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', function () {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const updatedTasks = tasks.filter(task => task.text !== text);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));

            taskList.removeChild(taskItem);
        });

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    }
});
