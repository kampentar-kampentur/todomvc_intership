var view = {
  todoList: document.querySelector('.todo-list'),
  todoInput: document.querySelector('.new-todo'),
  todoCount: document.querySelector('.todo-count'),
  todoMain: document.querySelector('.main'),
  todoFooter: document.querySelector('.footer'),
  showTodoCount: function (count) {
    this.todoCount.innerHTML = '<strong>' + count + '</strong> items left';
  },
  showTodoList: function (newLi) {
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
  },
  bufTodoList: document.createElement('ul'),
  addTodo: function (newLi) {
    this.bufTodoList.appendChild(newLi);
  },
  removeElement: function (elem) {
    elem.parentNode.removeChild(elem);
  }
}

var controller = {
  counter: 1,
  addNewTodo: function () {
    if (view.todoInput.value) {
      var newLi = model.creatTodo(view.todoInput.value, controller.counter);
      controller.counter++;
      model.addTodo(newLi);
      view.showTodoCount(model.bufTodoList.children.length);
      view.todoInput.value = '';
      newLi.querySelector('.destroy').addEventListener('click', () => {
        model.removeElement(newLi);
        this.emptyTodoList();
        view.showTodoCount(model.bufTodoList.children.length);
      });
      this.emptyTodoList();
    }
  },
  emptyTodoList: function () {
    if (!model.bufTodoList.children.length) {
      view.hideElement(view.todoFooter);
      view.hideElement(view.todoMain);
    } else {
      view.showElement(view.todoFooter);
      view.showElement(view.todoMain);
    }
  },

}

view.todoInput.onkeydown = function (e) {
  if (event.keyCode == 13) {
    controller.addNewTodo()
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  controller.emptyTodoList();
});
