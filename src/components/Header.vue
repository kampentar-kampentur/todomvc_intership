<template>
  <header class="header">
    <h1>todos</h1>
    <input
      class="new-todo"
      placeholder="What needs to be done?"
      @keyup.enter="enterTodo"
      @blur="enterTodo"
      v-model="value"
      autofocus
    >
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      :checked="toggle"
      @click="compleatAllTodo"
    >
    <label for="toggle-all">Mark all as complete</label>
  </header>
</template>

<script>
export default {
  props: {
    toggle: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    enterTodo() {
      if (this.value === '') return
      this.$emit('add', this.value)
      this.value = ''
    },
    compleatAllTodo() {
      this.$emit('toggleAll')
    }
  }
}
</script>
