import { renderTaskList } from './taskList.js';

export function clearCompletedTasks(tasks) {
  const updatedTasks = tasks.filter((task) => !task.completed);
  renderTaskList(updatedTasks);
}
