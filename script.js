function addTodo() {

  let newtask = document.getElementById('input').value;
  let tasklist = document.getElementById('tasklist');

  let item = document.createElement('li');
  item.innerText = newtask;
  tasklist.appendChild(item);
}
