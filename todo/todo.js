class TodoApp {
  constructor(id, elem) {
    this.elem = elem;
    this.model = new TodoListModel(id);
    this.view = new TodoView(elem);
    this.filter = 'all';
    this.view.todoInput.addEventListener('keyup', (e) => {
      if (e.keyCode == 13) {
        this.enterTodo(e);
      }
    });


    this.findingFilterHash();
    this.model.filtrationList();
    this.view.showTodoList(this.model.filteredList);
    this.view.displayFooter(this.model.todoList.length);
    this.view.showTodoCounter(this.model.todoList.filter(e => !e.checked).length);
    this.view.buttonToggleAll.checked = this.model.todoList.every((e) => e.checked);
    this.view.displayClearCompleted(this.model.todoList.filter(e => e.checked).length > 0);
    this.view.todoInput.addEventListener('blur', this.enterTodo.bind(this));
    this.view.todoList.addEventListener('click', this.remuveTodo.bind(this));
    this.view.todoList.addEventListener('click', this.changeTodoState.bind(this));
    this.view.clearCompletedButton.addEventListener('click', this.clearCompleted.bind(this));
    this.view.buttonToggleAll.addEventListener('click', this.changeStateToggleAll.bind(this));
    this.view.todoFiltres.addEventListener('click', this.switchFilter.bind(this));
    this.view.todoList.addEventListener('dblclick', this.editingTodo.bind(this));

  }

  enterTodo(e) {
    if (e.target.value) {
      this.model.addTodo(e.target.value, this.model.setTodoId());
      this.view.showTodoList(this.model.filteredList);
      e.target.value = '';
      this.view.displayFooter(this.model.todoList.length);
      let unchecked = this.model.todoList.filter(e => !e.checked);
      this.view.showTodoCounter(unchecked.length);
      this.view.buttonToggleAll.checked = this.model.todoList.every((e) => e.checked);
    }
  }

  remuveTodo(e) {
    if (e.target.className !== 'destroy') return;
    let id = this.view.getTodoElementId(e.target);
    let index = this.model.getIndexById(id);
    this.model.remuveItem(index);
    this.view.showTodoList(this.model.filteredList);
    this.view.displayFooter(this.model.todoList.length);
    let unchecked = this.model.todoList.filter(e => !e.checked);
    this.view.showTodoCounter(unchecked.length);
    this.view.displayClearCompleted(this.model.todoList.length - unchecked.length > 0);
    this.view.buttonToggleAll.checked = this.model.todoList.every((e) => e.checked);
  }

  changeTodoState(e) {
    if (e.target.className !== 'toggle') return;
    let id = this.view.getTodoElementId(e.target);
    let index = this.model.getIndexById(id);
    this.model.changeState(index);
    this.view.changeStateElement(id, this.model.todoList[index].checked);
    let unchecked = this.model.todoList.filter(e => !e.checked);
    this.view.showTodoCounter(unchecked.length);
    this.view.displayClearCompleted(this.model.todoList.length - unchecked.length > 0);
    this.view.buttonToggleAll.checked = this.model.todoList.every((e) => e.checked);
    if (this.filter != 'all') {
      this.model.filtrationList();
      this.view.showTodoList(this.model.filteredList);
      this.view.displayFooter(this.model.todoList.length);
    }
  }

  clearCompleted(e) {
    this.model.clearCompletedItem();
    this.view.showTodoList(this.model.filteredList);
    this.view.displayFooter(this.model.todoList.length);
    this.view.displayClearCompleted(false);
    this.view.buttonToggleAll.checked = this.model.todoList.every((e) => e.checked);
  }

  changeStateToggleAll(e) {
    if (this.model.filter === 'all') {
      this.model.changeStateAllItem(e.target.checked);
      this.view.changeStateAllElement(e.target.checked);
    } else {
      this.model.changeStateAllItem(e.target.checked);
      this.view.showTodoList(this.model.filteredList);
    }
    this.view.showTodoCounter(this.model.todoList.filter(e => !e.checked).length);
    this.view.displayClearCompleted(e.target.checked);
  }

  findingFilterHash() {
    switch (window.location.hash) {
      case '#/active':
        this.filter = 'active';
        break;
      case '#/completed':
        this.filter = 'completed';
        break;
      default:
        this.filter = 'all';
    }
    this.model.changeFilter(this.filter);
    this.view.showSelectedFilter(this.filter);
    this.filter = this.model.filter;
  }

  editingTodo(e) {
    if (e.target.tagName != 'LABEL') return;
    let id = this.view.getTodoElementId(e.target);
    let index = this.model.getIndexById(id);
    let input = this.view.showChangeInput(id, this.model.todoList[index].value);
    input.focus();
    input.addEventListener('blur', this.changeTodoValue.bind(this));
    input.addEventListener('keyup', this.changeTodoValue.bind(this));
  }

  changeTodoValue(e) {
    if (e.type === 'keyup' && e.keyCode != 13) return;
    this.model.changeValue(e.target.value, this.model.getIndexById(this.view.getTodoElementId(e.target)));
    e.target.removeEventListener('blur', this.changeTodoValue.bind(this));
    e.target.removeEventListener('keyup', this.changeTodoValue.bind(this));
    this.view.showTodoList(this.model.filteredList);
    this.view.displayFooter(this.model.todoList.length);
    this.view.showTodoCounter(this.model.todoList.filter(e => !e.checked).length);
    this.view.buttonToggleAll.checked = this.model.todoList.every((e) => e.checked);
    this.view.displayClearCompleted(this.model.todoList.filter(e => e.checked).length > 0);
  }

  switchFilter(e) {
    if (e.target.tagName != 'A') return;
    switch (e.target.hash) {
      case '#/active':
        this.filter = 'active';
        break;
      case '#/completed':
        this.filter = 'completed';
        break;
      default:
        this.filter = 'all';
    }
    this.model.changeFilter(this.filter);
    this.view.showSelectedFilter(this.filter);
    this.view.showTodoList(this.model.filteredList);
    this.filter = this.model.filter;
  }

}
