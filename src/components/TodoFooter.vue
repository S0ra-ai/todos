<template>
  <div class="tdFooter">
    <span>剩余任务: {{ remainingCount }}</span>
    <div class="tdTabs">
      <a 
        :class="{ active: currentFilter === 'all' }" 
        @click="setFilter('all')"
      >
        全部
      </a>
      <a 
        :class="{ active: currentFilter === 'active' }" 
        @click="setFilter('active')"
      >
        未完成
      </a>
      <a 
        :class="{ active: currentFilter === 'completed' }" 
        @click="setFilter('completed')"
      >
        已完成
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoFooter',
  props: {
    todos: {
      type: Array,
      required: true
    },
    currentFilter: {
      type: String,
      default: 'all'
    }
  },
  computed: {
    remainingCount() {
      return this.todos.filter(todo => !todo.completed).length
    }
  },
  methods: {
    setFilter(filter) {
      this.$emit('filter', filter)
    }
  }
}
</script>

<style scoped>
.tdFooter {
    background-color: #fff;
    padding: 10px 20px;
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
}

.tdTabs a {
    padding: 0 10px;
    cursor: pointer;
}

.active {
    color: red;
}
</style>