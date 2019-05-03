var controller = {
  // добавление тудухи
  addNewTodo: function () {
    if (view.todoInput.value) {
      let id = model.counter;
      let value = view.todoInput.value;
      view.todoInput.value = '';
      model.counter++;
      let todo = model.creatNewTodo(id, value, false);
      model.bufTodoList.push(todo);
      if (model.selectFilter !== 2) {
        view.showNewTodo(view.creatNewTodo(todo));
      }
    }
  },
  // проверка на пустой лист
  fillingTodoList: function () {
    if (!model.bufTodoList.length) {
      view.hideElement(view.todoFooter);
      view.hideElement(view.todoMain);
    } else {
      view.showElement(view.todoFooter);
      view.showElement(view.todoMain);
    }
  },
  selectedFilter: function (selectFilter) {
    for (var i = 0; i < todoFiltres.children.length; i++) {
      todoFiltres.children[i].className = '';
    }
    selectFilter.className = 'selected';
    for (var i = 0; i < todoFiltres.children.length; i++) {
      if ('selected' === todoFiltres.children[i].className) {
        model.selectFilter = i;
        return;
      }
    }
  },
  hidenCompletedTodos: function () {
    let arrCheked = model.getCheckedId(true);
    if (arrCheked.length) {
      view.showElement(view.clearCompletedButton);
      if (model.bufTodoList.length === arrCheked.length) {
        view.buttonToggleAll.checked = true;
      } else {
        view.buttonToggleAll.checked = false;
      }
    } else {
      view.hideElement(view.clearCompletedButton)
    }
  },
  switchFilter: function (selectFilter) {
    view.todoFiltres.querySelector('.selected').className = '';
    switch (selectFilter) {
      case 0:
        view.todoList.innerHTML = '';
        for (let i = 0; i < model.bufTodoList.length; i++) {
          view.showNewTodo(view.creatNewTodo(model.bufTodoList[i]));
        }
        view.todoFiltres.querySelector('a[href="#/"]').className = 'selected';
        break;
      case 1:
        let listNotCheked = model.bufTodoList.filter(obj => !obj.checked);
        view.todoList.innerHTML = '';
        for (let i = 0; i < listNotCheked.length; i++) {
          view.showNewTodo(view.creatNewTodo(listNotCheked[i]));
        }
        view.todoFiltres.querySelector('a[href="#/active"]').className = 'selected';
        break;
      case 2:
        let listCheked = model.bufTodoList.filter(obj => obj.checked);
        view.todoList.innerHTML = '';
        for (let i = 0; i < listCheked.length; i++) {
          view.showNewTodo(view.creatNewTodo(listCheked[i]));
        }
        view.todoFiltres.querySelector('a[href="#/completed"]').className = 'selected';
        break;
    }
  },
  displayClearCompletedButton: function () {
    let arrId = model.getCheckedId(true);
    if (arrId.length) {
      view.showElement(view.clearCompletedButton);
    } else {
      view.hideElement(view.clearCompletedButton);
    }
  },
  makeAllCheked: function (boolean) {
    for (var i = 0; i < model.bufTodoList.length; i++) {
      model.bufTodoList[i].checked = boolean;
      view.makeCheked(model.bufTodoList[i].checked, model.bufTodoList[i].id);
    }
  },
  destroyButton: function (e) {
    if (e.className !== 'destroy') {
      return
    }
    let id = view.getTodoId(e.target);
    let index = model.getIndexById(id);
    model.removeTodo(index);
    view.removeElement(view.todoList.querySelector('li[data-id="' + id + '"]'));
  },
  toggleCheckBox: function (e, index, id) {
    if (e.target.className !== 'toggle') {
      return
    }
    let id = view.getTodoId(e.target);
    let index = model.getIndexById(id);
    if (model.bufTodoList[index].checked) {
      view.todoList.querySelector('li[data-id="' + id + '"]').className = '';
      model.bufTodoList[index].checked = false;
      if (model.selectFilter === 2) {
        view.removeElement(view.todoList.querySelector('li[data-id="' + id + '"]'))
      }
    } else {
      view.todoList.querySelector('li[data-id="' + id + '"]').className = 'completed';
      model.bufTodoList[index].checked = true;
      if (model.selectFilter === 1) {
        view.removeElement(view.todoList.querySelector('li[data-id="' + id + '"]'))
      }
    }
  },
  clickButtonTodoList: function (e) {
    let id = view.getTodoId(e.target);
    let index = model.getIndexById(id);
    let checked = model.getCheckedId(false);
    if (checked.length === 0) {
      view.buttonToggleAll.checked = true;
    } else {
      view.buttonToggleAll.checked = false;
    }
    controller.fillingTodoList();
    model.displayClearCompletedButton();
    view.showTodoCount(checked.length);
    model.setStorage();
  },
  choiceFiltres: function (e) {
    setTimeout(() => {
      let href = location.href;
      let anchor = href.slice(href.lastIndexOf('#'))
      switch (anchor) {
        case '#/':
          model.selectFilter = 0;
          break;
        case '#/active':
          model.selectFilter = 1;
          break;
        case '#/completed':
          model.selectFilter = 2;
          break;
      }
      controller.switchFilter(model.selectFilter);
      model.setStorage();
    }, 0);
  },
  toggleAll: function (e) {
    controller.makeAllCheked(view.buttonToggleAll.checked);
    model.displayClearCompletedButton();
    controller.switchFilter(model.selectFilter);
    view.showTodoCount(model.getCheckedId(false).length);
    model.setStorage();
  },
  clearCompleted: function (e) {
    var arrChekedId = model.getCheckedId(true);
    for (let i = 0; i < arrChekedId.length; i++) {
      if (model.selectFilter != 1) {
        view.removeElement(view.todoList.querySelector('li[data-id="' + arrChekedId[i] + '"]'));
      }
      model.removeTodo(model.getIndexById(arrChekedId[i]));
    }
    controller.fillingTodoList();
    model.setStorage();
    model.displayClearCompletedButton();
  },
  addInputTodo: function (e) {
    controller.addNewTodo();
    controller.fillingTodoList();
    view.showTodoCount(model.getCheckedId(false).length);
    view.buttonToggleAll.checked = false;
    model.setStorage();
  },
  editingTodo: function (e) {
    if (e.target.tagName !== 'LABEL') {
      return;
    };
    var id = view.getTodoId(e.target);
    var todo = view.todoList.querySelector('li[data-id="' + id + '"]');
    var index = model.getIndexById(id);
    let newInput = document.createElement('input');
    newInput.className = 'edit';
    newInput.value = model.bufTodoList[index].value;
    todo.className = 'editing';
    todo.appendChild(newInput);
    var inp = todo.querySelector('.edit');
    inp.focus();
    let blurEvent = (e) => {
      if (inp.value) {
        model.bufTodoList[index].value = inp.value;
        view.todoList.insertBefore(view.creatNewTodo(model.bufTodoList[index]), todo);
        inp.removeEventListener('keydown', keydownEvent);
        inp.removeEventListener('blur', blurEvent);
        view.removeElement(view.todoList.querySelector('.editing'));
      } else {
        let count = model.getCheckedId(false).length;
        if (model.bufTodoList[index].checked) {
          view.showTodoCount(count);
        } else {
          view.showTodoCount(count - 1);
        }
        if (model.bufTodoList.length === 1) {
          view.hideElement(view.todoFooter);
          view.hideElement(view.todoMain);
        }
        inp.removeEventListener('blur', blurEvent);
        inp.removeEventListener('keydown', keydownEvent);
        view.removeElement(todo);
        model.bufTodoList.splice(index, 1);
      }
      model.setStorage();
    };
    let keydownEvent = (e) => {
      if (e.keyCode == 13) {
        inp.blur();
      }
    };
    inp.addEventListener('blur', blurEvent);
    inp.addEventListener('keydown', keydownEvent);
  },
};

view.todoList.addEventListener('click', controller.clickButtonTodoList);
view.todoList.addEventListener('click', controller.clickButtonTodoList);
view.todoList.addEventListener('click', controller.clickButtonTodoList);
view.todoList.addEventListener('dblclick', controller.editingTodo);

// смена фильтров
view.todoFiltres.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && e.target.className !== 'selected') {
    controller.choiceFiltres();
  }
});

// масовая обработка
view.buttonToggleAll.addEventListener('click', controller.toggleAll);

view.clearCompletedButton.addEventListener('click', controller.clearCompleted);

// обработка добавления тудух
view.todoInput.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    controller.addInputTodo(e);
  }
});
view.todoInput.addEventListener('blur', controller.addInputTodo);

// проверка на наличие тудух при загрузке
document.addEventListener("DOMContentLoaded", function (event) {
  controller.getStorage();
  controller.choiceFiltres();
  view.showTodoCount(model.getCheckedId(false).length);
  model.displayClearCompletedButton();
  controller.fillingTodoList();
});
