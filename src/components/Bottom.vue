<template>
  <footer class="footer">
    <span class="todo-count">
      <strong>{{counter}}</strong> items left
    </span>
    <ul class="filters">
      <li>
        <router-link :to="{ name: 'home', params: { filter: '' } }">All</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'home', params: { filter: 'active' } }">Active</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'home', params: { filter: 'completed' } }">Completed</router-link>
      </li>
    </ul>
    <button class="clear-completed" @click="clearCompleated">Clear completed</button>
  </footer>
</template>

<script>
export default {
  name: 'Bottom',
  props: {
    counter: {
      required: true,
      type: Number
    }
  },
  data() {
    return {}
  },
  methods: {
    clearCompleated() {
      this.$emit('clear')
    }
  }
}
</script>
