var view = {
  // обращение к элементам
  todoList: document.querySelector('.todo-list'),
  todoInput: document.querySelector('.new-todo'),
  todoCount: document.querySelector('.todo-count'),
  todoMain: document.querySelector('.main'),
  todoFooter: document.querySelector('.footer'),
  todoFiltres: document.querySelector('.filters'),
  buttonToggleAll: document.querySelector('#toggle-all'),
  // отображение элементов
  showTodoCount: function (count) {
    this.todoCount.innerHTML = '<strong>' + count + '</strong> items left';
  },
  showTodoList: function (newUl) {
    this.todoList.innerHTML = '';
    for (var i = 0; i < newUl.children.length; i++) {
      this.todoList.appendChild(newUl.children[i].cloneNode(true));
    }
  },
  hideElement: function (elem) {
    elem.style.display = 'none'
  },
  showElement: function (elem) {
    elem.style.display = 'block'
  }
};

var model = {
  selectFilter: 0,
  // создание новой тудухи
  creatTodo: function (msg, dataId) {
    dataId = dataId || 1;
    var newLi = document.createElement('li');
    newLi.setAttribute('data-id', dataId);
    newLi.innerHTML = '<div class="view"><input class="toggle" type="checkbox" /><label>' + msg + '</label><button class="destroy"></button></div>';
    return newLi;
  },
  // хранение листа тудух
  bufTodoAllList: document.createElement('ul'),
  bufTodoActiveList: document.createElement('ul'),
  bufTodoCompletedList: document.createElement('ul'),
  bufTodoList: [document.createElement('ul'), document.createElement('ul'), document.createElement('ul')], // 0 : All, 1 : Active, 2 : Completed
  // взаимодействие буфером
  addTodo: function (newLi) {
    this.bufTodoAllList.appendChild(newLi);
  },
  removeElement: function (elem) {
    elem.parentNode.removeChild(elem);
  },
  filerChecked: function (boolean) {
    var arrId = [];
    for (var i = 0; i < model.bufTodoAllList.children.length; i++) {
      if (model.bufTodoAllList.children[i].querySelector('.toggle').checked === boolean) {
        arrId.push(model.bufTodoAllList.children[i].getAttribute('data-id'));
      }
    }
    return arrId;
  },
  makeAllCheked: function (bul) {
    for (var i = 0; i < model.bufTodoAllList.children.length; i++) {
      model.bufTodoAllList.children[i].querySelector('.toggle').checked = bul;
      if (bul) {
        model.bufTodoAllList.children[i].querySelector('.toggle').className = 'completed';
      } else {
        model.bufTodoAllList.children[i].querySelector('.toggle').className = '';
      }
    }
  }
}

var controller = {
  // генератор ID
  counter: 1,
  // добавление тудухи
  addNewTodo: function () {
    if (view.todoInput.value) {
      var newLi = model.creatTodo(view.todoInput.value, controller.counter);
      controller.counter++;
      model.addTodo(newLi);
      model.bufTodoAllList.appendChild(newLi);
      view.showTodoCount(model.filerChecked(false).length);
      view.todoInput.value = '';
      this.refreshTodoList(model.selectFilter);
      this.emptyTodoList();
    }
  },
  // проверка на пустой лист
  emptyTodoList: function () {
    if (!model.bufTodoAllList.children.length) {
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
  refreshTodoList: function (selectFilter) {
    if (model.bufTodoAllList.children.length === model.filerChecked(true).length) {
      view.buttonToggleAll.checked = true;
    } else {
      view.buttonToggleAll.checked = false;
    }
    var newUl = document.createElement('ul');
    switch (selectFilter) {
      case 0:
        view.showTodoList(model.bufTodoAllList);
        break;
      case 1:
        var arrId = model.filerChecked(false);
        for (var i = 0; i < arrId.length; i++) {
          newUl.appendChild(model.bufTodoAllList.querySelector('li[data-id="' + arrId[i] + '"]').cloneNode(true));
        }
        view.showTodoList(newUl);
        break;
      case 2:
        var arrId = model.filerChecked(true);
        for (var i = 0; i < arrId.length; i++) {
          newUl.appendChild(model.bufTodoAllList.querySelector('li[data-id="' + arrId[i] + '"]').cloneNode(true));
        }
        view.showTodoList(newUl);
        break;
    }
  },
}

view.todoList.addEventListener('click', (e) => {
  if (e.target.parentNode.parentNode.getAttribute('data-id') !== undefined) {
    var id = e.target.parentNode.parentNode.getAttribute('data-id');
  }
  if (e.target.className === 'destroy') {
    model.bufTodoAllList.removeChild(model.bufTodoAllList.querySelector('li[data-id="' + id + '"]'));
  } else if (e.target.className === 'toggle') {
    if (e.target.checked) {
      model.bufTodoAllList.querySelector('li[data-id="' + id + '"]').className = 'completed';
      model.bufTodoAllList.querySelector('li[data-id="' + id + '"]').querySelector('.toggle').checked = true;
    } else {
      model.bufTodoAllList.querySelector('li[data-id="' + id + '"]').className = '';
      model.bufTodoAllList.querySelector('li[data-id="' + id + '"]').querySelector('.toggle').checked = false;
    }
  }
  controller.refreshTodoList(model.selectFilter);
  controller.emptyTodoList();
  view.showTodoCount(model.filerChecked(false).length)
});

view.todoFiltres.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    view.todoFiltres.querySelector('.selected').className = '';
    e.target.className = 'selected';
    switch (e.target.getAttribute('href')) {
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
    controller.refreshTodoList(model.selectFilter);
  }
});
view.buttonToggleAll.addEventListener('click', (e) => {
  // if (model.bufTodoActiveList.length = )
});
// обработка нажития Enter
view.todoInput.onkeydown = function (e) {
  if (event.keyCode == 13) {
    controller.addNewTodo();
  }
}
// проверка на наличие тудух при загрузке
document.addEventListener("DOMContentLoaded", function (event) {
  controller.emptyTodoList();
});
