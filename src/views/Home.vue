<template>
  <div class="todo-page">
    <section class="todoapp">
      <Header @add="addTodo" @toggleAll="toggleAllTodo" :toggle="allCompleated"/>
      <section class="main">
        <ul class="todo-list">
          <Todo
            v-for="todo in todoListFiltered"
            :key="todo.id"
            :todo="todo"
            @edit="updateTodo"
            @toggle="toggleTodo"
            @remove="removTodo"
          />
        </ul>
      </section>
      <Bottom
        :counter="uncompletedTodo.length"
        @clear="removeCompleated"
        v-show="todoList.length > 0"
      />
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>
        Created by
        <a href="http://twitter.com/oscargodson">Oscar Godson</a>
      </p>
      <p>
        Refactored by
        <a href="https://github.com/cburgmer">Christoph Burgmer</a>
      </p>
      <p>
        Part of
        <a href="http://todomvc.com">TodoMVC</a>
      </p>
    </footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Todo from '@/components/Todo.vue'
import Bottom from '@/components/Bottom.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Todo,
    Bottom
  },
  data() {
    return {
      todoList: JSON.parse(localStorage.getItem(`todo-vue`)) || []
    }
  },
  methods: {
    updateTodo({ id, value }) {
      const todo = this.todoList.find(todo => todo.id === id)
      if (!todo) return
      todo.value = value
    },
    toggleTodo(id) {
      const todo = this.todoList.find(todo => todo.id === id)
      if (!todo) return
      todo.checked = !todo.checked
    },
    removTodo(id) {
      const todoIndex = this.todoList.findIndex(todo => todo.id === id)
      if (todoIndex === -1) return
      this.todoList.splice(todoIndex, 1)
    },
    addTodo(value) {
      this.todoList.push({ id: new Date().getTime(), value, checked: false })
    },
    toggleAllTodo() {
      let state = this.allCompleated
      this.todoList.forEach(e => (e.checked = !state))
    },
    removeCompleated() {
      this.todoList = this.uncompletedTodo
    }
  },
  computed: {
    filter() {
      return this.$route.params.filter || ''
    },
    todoListFiltered() {
      switch (this.filter) {
        case 'active':
          return this.todoList.filter(todo => !todo.checked)
        case 'completed':
          return this.todoList.filter(todo => todo.checked)
        default:
          return this.todoList
      }
    },
    uncompletedTodo() {
      return this.todoList.filter(e => !e.checked)
    },
    allCompleated() {
      return this.todoList.length > 0 && this.uncompletedTodo.length === 0
    }
  },
  watch: {
    todoList: {
      deep: true,
      handler: function() {
        try {
          return localStorage.setItem(`todo-vue`, JSON.stringify(this.todoList))
        } catch (e) {}
      }
    }
  }
}
</script>
