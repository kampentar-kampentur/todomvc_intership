<template>
  <li class="todo" :class="{completed : todo.checked, editing: isEditing}">
    <div class="view">
      <input class="toggle" type="checkbox" :checked="todo.checked" @click="toggleTodo">
      <label @dblclick="editTodo">{{todo.value}}</label>
      <button class="destroy" @click="destroyTodo"></button>
    </div>
    <input
      type="text"
      class="edit"
      @keyup.enter="doneEditTodo"
      @blur="doneEditTodo"
      v-model="editValue"
      v-if="isEditing"
      v-focus
    >
  </li>
</template>

<script>
export default {
  name: 'Todo',
  props: {
    todo: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      isEditing: false,
      editValue: ''
    }
  },
  methods: {
    editTodo() {
      this.isEditing = true
      this.editValue = this.todo.value
    },
    doneEditTodo() {
      if (!this.isEditing) return
      if (this.editValue === '') {
        this.$emit('remove', this.todo.id)
        this.isEditing = false
        return
      }
      this.$emit('edit', {
        id: this.todo.id,
        value: this.editValue
      })
      this.isEditing = false
      this.editValue = ''
    },
    toggleTodo() {
      this.$emit('toggle', this.todo.id)
    },
    destroyTodo() {
      this.$emit('remove', this.todo.id)
    }
  }
}
</script>
