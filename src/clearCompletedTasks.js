import { renderTaskList } from './taskList.js';

export function clearCompletedTasks(tasks) {
  const updatedTasks = tasks.filter((task) => !task.completed);

  for (let i = 0; i < updatedTasks.length; i += 1) {
    updatedTasks[i].index = i + 1;
  }
  renderTaskList(updatedTasks);
}
