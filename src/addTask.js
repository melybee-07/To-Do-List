import { renderTaskList } from './taskList.js';

export function addTask(tasks, description) {
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(newTask);
  renderTaskList(tasks);
}
