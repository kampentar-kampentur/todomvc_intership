var view = {
  todoList: document.querySelector('.todo-list'),
  todoInput: document.querySelector('.new-todo'),
  todoCount: document.querySelector('.todo-count'),
  todoMain: document.querySelector('.main'),
  todoFooter: document.querySelector('.footer'),
  showTodoCount: function (count) {
    this.todoCount.innerHTML = '<strong>' + count + '</strong> items left';
  },
  showTodo: function (newLi) {
    this.todoList.appendChild(newLi);
  },
  hideElement: function (elem) {
    elem.style.display = 'none'
  },
  showElement: function (elem) {
    elem.style.display = 'block'
  }
};

var model = {
  creatTodo: function (msg, dataId) {
    dataId = dataId || 1;
    var newLi = document.createElement('li');
    newLi.setAttribute('data-id', dataId);
    newLi.innerHTML = '<div class="view"><input class="toggle" type="checkbox" /><label>' + msg + '</label><button class="destroy"></button></div>';
    return newLi;
  }
}

var controller = {
  counter: 1,
  addNewTodo: function () {
    if (view.todoInput.value) {
      var newLi = model.creatTodo(view.todoInput.value, controller.counter);
      controller.counter++;
      view.showTodo(newLi);
      view.showTodoCount(view.todoList.children.length);
      view.todoInput.value = '';
      this.emptyTodoList();
    }
  },
  emptyTodoList: function () {
    if (!view.todoList.children.length) {
      view.hideElement(view.todoFooter);
      view.hideElement(view.todoList);
    } else {
      view.showElement(view.todoFooter);
      view.showElement(view.todoList);
    }
  }
}

view.todoInput.onkeydown = function (e) {
  if (event.keyCode == 13) {
    controller.addNewTodo()
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  controller.emptyTodoList();
});
