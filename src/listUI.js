function handleListClick(event) {
  const listItem = event.target.closest('li');
  if (!listItem) return;

  const kebabMenu = listItem.querySelector('.kebab-menu');
  const trashCanIcon = listItem.querySelector('.trash-can-icon');

  if (event.target !== kebabMenu && event.target !== trashCanIcon) {
    if (kebabMenu.style.display === 'none') {
      kebabMenu.style.display = 'block';
      trashCanIcon.style.display = 'none';
      listItem.style.backgroundColor = 'initial';
    } else {
      kebabMenu.style.display = 'none';
      trashCanIcon.style.display = 'block';
      listItem.style.backgroundColor = 'yellow';
    }
  }
}

export function initializeListUI() {
  const taskList = document.getElementById('task-list');
  taskList.addEventListener('click', handleListClick);
}
