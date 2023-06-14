import './styles/index.css';
import './assets/kebab-menu.png';
import './assets/trash-can-icon.png';
import './assets/refresh_reload_icon.png';

let tasks = [];

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskIndexes() {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
}

function renderTasks() {
  // eslint-disable-next-line no-use-before-define
  const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskIndexes();
    renderTasks();
    saveTasksToLocalStorage();
  };

  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.draggable = true;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      tasks[index].completed = checkbox.checked;
      renderTasks();
      saveTasksToLocalStorage();
    });

    const label = document.createElement('label');
    label.innerText = task.description;
    label.style.textDecoration = task.completed ? 'line-through' : 'none';

    const kebabMenu = document.createElement('div');
    kebabMenu.className = 'kebab-menu';

    listItem.addEventListener('click', () => {
      listItem.classList.toggle('selected');
    });

    kebabMenu.addEventListener('click', (event) => {
      event.stopPropagation();
      deleteTask(index);
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(kebabMenu);
    taskList.appendChild(listItem);
  });
}

function addTask(description) {
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1,
  };

  tasks.push(newTask);
  renderTasks();
  saveTasksToLocalStorage();
}

function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  updateTaskIndexes();
  renderTasks();
  saveTasksToLocalStorage();
}

window.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();

  const taskInput = document.getElementById('task-input');
  taskInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const description = taskInput.value.trim();
      if (description !== '') {
        addTask(description);
        taskInput.value = '';
      }
    }
  });

  const clearButton = document.getElementById('clear-button');
  clearButton.addEventListener('click', clearCompletedTasks);
});

renderTasks(); // Call renderTasks after all function declarations
