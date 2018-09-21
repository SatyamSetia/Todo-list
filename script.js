let count=0;

function addTodo() {
  let newtask = document.getElementById('input');
  let tasklist = document.getElementById('tasklist');

  // list item
  let item = document.createElement('li');
  item.setAttribute("id",`item${count}`);
  item.setAttribute("class","d-flex justify-content-between font-weight-light");
  item.innerText = newtask.value;

  // checkbox
  let checkbox = document.createElement('input');
  checkbox.setAttribute("type","checkbox");
  checkbox.setAttribute("id",`check${count}`);
  checkbox.setAttribute("class", "checkbox");
  checkbox.addEventListener('click', function() {
    let item = document.getElementById(`item${this.id.substring(5)}`);
    item.classList.toggle("done");
  });

  // arrow up
  let arrowup = document.createElement('button');
  arrowup.setAttribute("onclick",`moveUp(${count})`);
  arrowup.setAttribute("class","btn btn-outline-light");

  let upicon = document.createElement('i');
  upicon.className = 'material-icons';
  upicon.innerText = 'arrow_upward';

  arrowup.appendChild(upicon);

  // arrow down
  let arrowdown = document.createElement('button');
  arrowdown.setAttribute("onclick",`moveDown(${count})`);
  arrowdown.setAttribute("class","btn btn-outline-light");

  let downicon = document.createElement('i');
  downicon.className = 'material-icons';
  downicon.innerText = 'arrow_downward';

  arrowup.appendChild(upicon);
  arrowdown.appendChild(downicon);

  // delete list item
  let deleteitem = document.createElement('button');
  deleteitem.setAttribute("onclick",`deleteItem(${count})`);
  deleteitem.setAttribute("class","btn btn-outline-light");

  let deleteicon = document.createElement('i');
  deleteicon.className = 'material-icons';
  deleteicon.innerText = 'close';

  deleteitem.appendChild(deleteicon);

  //  appending children to list item
  item.appendChild(checkbox);
  item.appendChild(arrowup);
  item.appendChild(arrowdown);
  item.appendChild(deleteitem);

  //  appending list item to list
  tasklist.appendChild(item);

  newtask.value = "";
  count++;

  handleTopTwo();
//  handleLastTwo();
}

function moveUp(count) {
  let item = document.getElementById(`item${count}`);
  let prevItem = item.previousSibling;
  let firstChild = document.getElementById('tasklist').firstChild.nextSibling;

  item.parentNode.insertBefore(item,prevItem);
  handleTopTwo();
}

function moveDown(count) {
  let item = document.getElementById(`item${count}`);
  let lastChild = document.getElementById('tasklist').lastChild;
  if(item == lastChild) {
    return;
  }
  let nextItem = item.nextSibling;
  item.parentNode.insertBefore(nextItem,item);
}

function deleteItem(count) {
  let item = document.getElementById(`item${count}`);
  item.parentNode.removeChild(item);
  handleTopTwo();
}

function deleteAll() {
  let tasklist = document.getElementById("tasklist");
  let done = document.getElementsByClassName('done');

  let totalDone = done.length;
  for(let i=0;i<totalDone;i++) {
    tasklist.removeChild(done[0]);
  }
  handleTopTwo();
}

function sortList() {
  let tasklist = document.getElementById('tasklist');
  let done = document.createElement('ul');
  let undone = document.createElement('ul');
  undone.id="tasklist"
  let nodes = document.getElementsByTagName('li');
  while(nodes.length>0) {
    if(nodes[0].classList.contains("done")){
      done.appendChild(nodes[0]);
    } else {
      undone.appendChild(nodes[0]);
    }
  }

  nodes = done.childNodes;
  while(nodes.length>0) {
    undone.appendChild(nodes[0]);
  }
  console.log(undone);
  document.getElementById('content').replaceChild(undone,tasklist);
  tasklist=undone;

  //handleTopTwo();
}

function handleTopTwo() {
  let tasklist = document.getElementById('tasklist');
  let nodes = tasklist.childNodes;

  if(nodes.length==2) {
    nodes[1].firstChild.nextSibling.nextSibling.className='hideBtn'
  } else {
    nodes[2].firstChild.nextSibling.nextSibling.classList.remove('hideBtn');
    nodes[1].firstChild.nextSibling.nextSibling.className='hideBtn btn btn-outline-light';
  }
}

function handleLastTwo() {
  let tasklist = document.getElementById('tasklist');
  let nodes = tasklist.childNodes;

  if(nodes.length==2) {
    nodes[1].firstChild.nextSibling.nextSibling.nextSibling.className='hideBtn'
  } else {
    nodes[nodes.length-2].firstChild.nextSibling.nextSibling.nextSibling.remove('hideBtn');
    nodes[nodes.length-1].firstChild.nextSibling.nextSibling.nextSibling.className='hideBtn btn btn-outline-light';
  }
}
