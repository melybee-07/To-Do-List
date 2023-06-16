import { renderTaskList } from './taskList.js';
import { addTask } from './addTask.js';
import { initializeListUI } from './listUI.js';
import { saveTasks, loadTasks } from './localStorage.js';
import { clearCompletedTasks } from './clearCompletedTasks.js';

import './styles/index.css';

let tasks = loadTasks();

const taskInput = document.getElementById('task-input');
taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const description = taskInput.value.trim();
    if (description !== '') {
      addTask(tasks, description);
      taskInput.value = '';
      saveTasks(tasks);
    }
  }
});

window.addEventListener('DOMContentLoaded', () => {
  renderTaskList(tasks);
  initializeListUI();

  const clearButton = document.getElementById('clear-button');
  clearButton.addEventListener('click', () => {
    tasks = tasks.filter((task) => !task.completed);

    clearCompletedTasks(tasks);
    renderTaskList(tasks);
    saveTasks(tasks);
  });
});
