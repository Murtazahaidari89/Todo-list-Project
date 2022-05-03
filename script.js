//Select elements
const taskData = document.querySelector('#task-input');
const todoButton = document.querySelector('.todo-btn');
const taskBox = document.querySelector('.list-item');
const deleteAllBtn = document.querySelector('#deleteallbtn');

//Functions

function addNewTask(e) {
  //Prevent default
  e.preventDefault();
  if (taskData.value === '') {
    return;
  }
  const newDivElement = document.createElement('div'); //Create new div element
  newDivElement.classList.add('todo');

  const newTodo = document.createElement('li'); //Create li element
  newTodo.innerText = taskData.value;

  saveLocalTodos(taskData.value); //Save to localstorage

  newTodo.classList.add('todo-item');
  newDivElement.appendChild(newTodo);
  taskData.value = '';

  const doneButton = document.createElement('button'); //Create tasks done
  doneButton.innerHTML = `<i class="fas fa-check"></i>`;
  doneButton.classList.add('complete-btn');
  newDivElement.appendChild(doneButton);

  const deleteButton = document.createElement('button'); //Create delete button
  deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
  deleteButton.classList.add('trash-btn');
  newDivElement.appendChild(deleteButton);

  taskBox.appendChild(newDivElement);
}

function deleteTodo(e) {
  const item = e.target;

  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    todo.classList.add('todo');

    delateLocalTodos(todo);
    todo.remove();
  }
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function saveLocalTodos(todo) {
  let taskArr;
  if (localStorage.getItem('todos') === null) {
    taskArr = [];
  } else {
    taskArr = JSON.parse(localStorage.getItem('todos'));
  }
  taskArr.push(todo);
  localStorage.setItem('todos', JSON.stringify(taskArr));
}
function delateLocalTodos(todo) {
  let taskArr;
  if (localStorage.getItem('todos') === null) {
    taskArr = [];
  } else {
    taskArr = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  taskArr.splice(taskArr.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(taskArr));
}

function getTodos() {
  let taskArr;
  if (localStorage.getItem('todos') === null) {
    taskArr = [];
  } else {
    taskArr = JSON.parse(localStorage.getItem('todos'));
  }
  taskArr.forEach(function (todo) {
    //Create todo div
    const newDivElement = document.createElement('div');
    newDivElement.classList.add('todo');
    //Create list
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    newDivElement.appendChild(newTodo);

    //Create Completed Button
    const doneButton = document.createElement('button');
    doneButton.innerHTML = `<i class="fas fa-check"></i>`;
    doneButton.classList.add('complete-btn');
    newDivElement.appendChild(doneButton);
    //Create trash button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteButton.classList.add('trash-btn');
    newDivElement.appendChild(deleteButton);
    //attach final Todo
    taskBox.appendChild(newDivElement);
  });
}

deleteAllBtn.addEventListener('click', function () {
  let taskArr = localStorage.getItem('todos');
  let taskObj = JSON.parse(taskArr);
  if (taskArr === null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(taskArr);
    taskObj = [];
  }
  localStorage.setItem('todos', JSON.stringify(taskObj));
  taskBox.innerHTML = '';
});

//Calling functions
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addNewTask);
taskBox.addEventListener('click', deleteTodo);
