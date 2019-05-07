class TodoItemModel {
  constructor(value, id, state = false) {
    this.value = value;
    this.checked = state;
    this.id = id;
  }
}

class TodoListModel {
  constructor(id) {
    if (typeof id == 'undefined') {
      throw new Error("Please, provide id for TodoList");
    }
    this.id = id;
    this.todoList = this.restoreState() || [];
    this.filteredList = [];
    this.filter = 'all';
  }

  addTodo(value, id) {
    this.todoList.push(new TodoItemModel(value, id));
    this.saveState();
    this.filtrationList();
  }

  remuveItem(index) {
    this.todoList.splice(index, 1);
    this.saveState();
    this.filtrationList();
  }

  changeState(index) {
    this.todoList[index].checked = !this.todoList[index].checked;
    if (this.filter != 'all') {
      this.filtrationList();
    }
    this.saveState();
  }

  changeStateAllItem(state) {
    for (let i = 0; i < this.todoList.length; i++) {
      this.todoList[i].checked = state;
    }
    this.saveState();
    this.filtrationList();
  }

  changeValue(value, index) {
    if (value === this.todoList[index].value) return;
    if (!value) {
      this.remuveItem(index);
    } else {
      this.todoList[index].value = value;
    }
    this.saveState();
  }

  filtrationList() {
    switch (this.filter) {
      case 'completed':
        this.filteredList = this.todoList.filter(e => e.checked);
        break;
      case 'active':
        this.filteredList = this.todoList.filter(e => !e.checked);
        break;
      default:
        this.filteredList = this.todoList;
    }
  }

  changeFilter(filter) {
    if (filter === this.filter) return;
    this.filter = filter;
    this.filtrationList();
  }

  clearCompletedItem() {
    this.todoList = this.todoList.filter(e => !e.checked);
    this.saveState();
    this.filtrationList();
  }

  setTodoId() {
    return new Date().getTime();
  }

  getIndexById(id) {
    return this.todoList.findIndex(e => e.id == id);
  }
  saveState() {
    try {
      return localStorage.setItem(`todo-${this.id}`, JSON.stringify(this.todoList));
    } catch (e) { }
  }
  restoreState() {
    try {
      return JSON.parse(localStorage.getItem(`todo-${this.id}`));
    } catch (e) { }
  }
}
