import { renderTaskList } from './taskList.js';
import { saveTasks } from './localStorage.js';

export function editTaskDescription(tasks, taskIndex) {
  const newDescription = prompt('Enter the new task description:');
  if (newDescription !== null) {
    tasks[taskIndex].description = newDescription;
    renderTaskList(tasks);
    saveTasks(tasks);
  }
}
