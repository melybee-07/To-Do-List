import './styles/index.css';
import './assets/kebab-menu.png';
import './assets/trash-can-icon.png';
import './assets/refresh_reload_icon.png';

const tasks = [
  { description: 'Task 1', completed: false, index: 1 },
  { description: 'Task 2', completed: true, index: 2 },
  { description: 'Task 3', completed: false, index: 3 },
];

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.draggable = true; // Enable draggable for list item

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      tasks[index].completed = checkbox.checked;
      renderTasks();
    });

    const label = document.createElement('label');
    label.innerText = task.description;
    label.style.textDecoration = task.completed ? 'line-through' : 'none';

    const kebabMenu = document.createElement('div');
    kebabMenu.className = 'kebab-menu';

    // Add event listener for clicking the list item
    listItem.addEventListener('click', () => {
      listItem.classList.toggle('selected'); // Toggle the "selected" class on click
    });

    // Add event listener for clicking the trash can icon
    kebabMenu.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent the click event from propagating to the list item

      const index = tasks.findIndex(
        (task) => task.description === label.innerText,
      );
      tasks.splice(index, 1); // Remove the corresponding task from the array

      renderTasks();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(kebabMenu);
    taskList.appendChild(listItem);
  });
}

function addTask(event) {
  if (event.key === 'Enter') {
    const taskInput = document.getElementById('task-input');
    const description = taskInput.value.trim();

    if (description !== '') {
      const newTask = {
        description,
        completed: false,
        index: tasks.length + 1,
      };

      tasks.push(newTask);
      renderTasks();
      taskInput.value = '';
    }
  }
}

function clearCompletedTasks() {
  const completedTasks = tasks.filter((task) => task.completed);
  completedTasks.forEach((task) => {
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
  });

  renderTasks();
}

window.addEventListener('DOMContentLoaded', () => {
  renderTasks();

  const taskInput = document.getElementById('task-input');
  taskInput.addEventListener('keyup', addTask);

  const clearButton = document.getElementById('clear-button');
  clearButton.addEventListener('click', clearCompletedTasks);
});
