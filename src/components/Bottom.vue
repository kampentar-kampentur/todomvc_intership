<template>
  <footer class="footer">
    <span class="todo-count">
      <strong>{{counter}}</strong> items left
    </span>
    <ul class="filters">
      <li v-for="filterParam in filterParams" :key="filterParam.to.params.filter">
        <router-link :to="filterParam.to">{{ filterParam.title }}</router-link>
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
    return {
      filterParams: [
        {
          to: { name: 'home', params: { filter: '' } },
          title: 'All'
        },
        {
          to: { name: 'home', params: { filter: 'active' } },
          title: 'Active'
        },
        {
          to: { name: 'home', params: { filter: 'completed' } },
          title: 'Completed'
        }
      ]
    }
  },
  methods: {
    clearCompleated() {
      this.$emit('clear')
    }
  }
}
</script>
