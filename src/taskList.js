import { saveTasks } from './localStorage.js';

export function renderTaskList(tasks) {
  const deleteTask = (task) => {
    const taskIndex = tasks.findIndex((t) => t.index === task.index);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);

      for (let i = taskIndex; i < tasks.length; i += 1) {
        tasks[i].index -= 1;
      }

      saveTasks(tasks);
      renderTaskList(tasks);
    }
  };

  const makeTaskDescriptionEditable = (taskDescription, task) => {
    taskDescription.contentEditable = true;
    taskDescription.focus();
    taskDescription.classList.add('editable');

    const originalDescription = task.description;

    taskDescription.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        taskDescription.blur();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        taskDescription.innerText = originalDescription;
        taskDescription.blur();
      }
    });

    taskDescription.addEventListener('blur', () => {
      const newDescription = taskDescription.innerText.trim();
      taskDescription.contentEditable = false;

      if (newDescription !== '') {
        task.description = newDescription;
        saveTasks(tasks);
        renderTaskList(tasks);
      } else {
        taskDescription.innerText = originalDescription;
      }
    });
  };

  const taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; // Clear previous list

  tasks.forEach((task) => {
    const listItem = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    listItem.appendChild(checkbox);

    const taskDescription = document.createElement('span');
    taskDescription.innerText = task.description;
    if (task.completed) {
      taskDescription.classList.add('completed');
    }
    listItem.appendChild(taskDescription);

    const kebabMenuIcon = document.createElement('img');
    kebabMenuIcon.src = 'kebab-menu.png';
    kebabMenuIcon.alt = 'Kebab Menu';
    kebabMenuIcon.classList.add('kebab-menu');
    listItem.appendChild(kebabMenuIcon);

    const trashCanIcon = document.createElement('img');
    trashCanIcon.src = 'trash-can-icon.png';
    trashCanIcon.alt = 'Trash Can';
    trashCanIcon.classList.add('trash-can-icon');
    trashCanIcon.style.display = 'none';
    listItem.appendChild(trashCanIcon);

    // Add event listener to the checkbox
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks(tasks);
      renderTaskList(tasks);
    });

    // Add event listener to the trash can icon
    trashCanIcon.addEventListener('click', () => {
      deleteTask(task);
    });

    taskDescription.addEventListener('click', () => {
      makeTaskDescriptionEditable(taskDescription, task);
    });

    taskList.appendChild(listItem);
  });
}
