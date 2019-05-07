class TodoView {
  constructor(elem) {
    this.elem = elem;
    this.todoList = elem.querySelector('.todo-list');
    this.todoInput = elem.querySelector('.new-todo');
    this.todoCount = elem.querySelector('.todo-count');
    this.todoMain = elem.querySelector('.main');
    this.todoFooter = elem.querySelector('.footer');
    this.todoFiltres = elem.querySelector('.filters');
    this.clearCompletedButton = elem.querySelector('.clear-completed');
    this.buttonToggleAll = elem.querySelector('#toggle-all');
    this.filter = 'all';
  }

  creatTodoItem(value, id, state = false) {
    let newTodo = document.createElement('li');
    newTodo.innerHTML = '<div class="view"><input class="toggle" type="checkbox" /><label>' + value + '</label><button class="destroy"></button></div>';
    newTodo.setAttribute('data-id', id);
    if (state) {
      newTodo.querySelector('.toggle').checked = state;
    }
    return newTodo;
  }

  showTodoElement(todoObj) {
    this.todoList.appendChild(this.creatTodoItem(todoObj.value, todoObj.id, todoObj.checked));
  }

  getTodoElementId(el) {
    let element = el;
    while (element != this.todoList) {
      if (element.getAttribute('data-id') != null) {
        return element.getAttribute('data-id');
      }
      element = element.parentNode;
    }
  }

  showTodoList(todoList) {
    this.todoList.innerHTML = '';
    for (let i = 0; i < todoList.length; i++) {
      this.showTodoElement(todoList[i]);
      this.changeStateElement(todoList[i].id, todoList[i].checked)
    }
  }

  changeStateElement(id, state) {
    let todo = this.todoList.querySelector('li[data-id="' + id + '"]');
    if (state) {
      todo.className = 'completed';
    } else {
      todo.className = '';
    }
  }

  changeStateAllElement(state) {
    let togles = this.todoList.querySelectorAll('.toggle');
    for (let i = 0; i < togles.length; i++) {
      togles[i].checked = state;
      let id = this.getTodoElementId(togles[i]);
      this.changeStateElement(id, state);
    }
  }

  displayFooter(n) {
    if (n) {
      this.showElement(this.todoFooter);
      this.showElement(this.todoMain);
    } else {
      this.hideElement(this.todoFooter);
      this.hideElement(this.todoMain);
    }
  }

  displayClearCompleted(state) {
    if (state) {
      this.showElement(this.clearCompletedButton);
    } else {
      this.hideElement(this.clearCompletedButton);
    }
  }

  showTodoCounter(n) {
    this.todoCount.innerHTML = '<strong>' + n + '</strong> items left'
  }

  showSelectedFilter(filter) {
    if (filter == this.filter) return;
    this.todoFiltres.querySelector('.selected').className = '';
    this.filter = filter;
    switch (filter) {
      case 'completed':
        this.todoFiltres.querySelector('a[href="#/completed"]').className = 'selected';
        break;
      case 'active':
        this.todoFiltres.querySelector('a[href="#/active"]').className = 'selected';
        break;
      default:
        this.todoFiltres.querySelector('a[href="#/"]').className = 'selected';
    }
  }

  showChangeInput(id, value) {
    let todo = this.todoList.querySelector('li[data-id="' + id + '"]');
    todo.className = 'editing';
    let input = document.createElement('input');
    input.className = 'edit';
    input.value = value;
    return todo.appendChild(input);
  }

  showElement(elem) {
    elem.style.display = 'block';
  }
  hideElement(elem) {
    elem.style.display = 'none';
  }
};
