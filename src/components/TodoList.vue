<template>
  <ul class="tdList">
    <li 
      v-for="todo in sortedTodos" 
      :key="todo.id" 
      class="tdItem"
      :class="['priority-' + todo.priority, { 'pinned': todo.pinned }]"
    >
      <span class="pin-icon" @click.stop="togglePin(todo.id)"
        :class="{ 'pinned': todo.pinned }"
      >
        {{ todo.pinned ? '' : '' }}
      </span>
      <input 
        type="checkbox" 
        class="tdToggle" 
        :checked="todo.completed" 
        @change="toggleTodo(todo.id)"
      />
      <div class="todo-content"
        @click.stop="toggleTodo(todo.id)"
      >
        <span :class="['tdTxt', { completed: todo.completed }]">
          {{ todo.text }}
        </span>
        <span class="todo-date">
          {{ formatDate(todo.createdAt) }}
        </span>
      </div>
      <div class="tdItem-acts">
        <span @click.stop="deleteTodo(todo.id)"
          class="delete-btn"
        >
          删除
        </span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    todos: {
      type: Array,
      required: true
    },
    filter: {
      type: String,
      default: 'all'
    }
  },
  computed: {
    filteredTodos() {
      let filtered = []
      switch (this.filter) {
        case 'active':
          filtered = this.todos.filter(todo => !todo.completed)
          break
        case 'completed':
          filtered = this.todos.filter(todo => todo.completed)
          break
        default:
          filtered = [...this.todos]
      }
      return filtered
    },
    sortedTodos() {
      // 先按置顶状态排序，再按优先级排序，最后按创建时间排序（最新的在前）
      return [...this.filteredTodos].sort((a, b) => {
        // 置顶的排在前面
        if (a.pinned !== b.pinned) {
          return a.pinned ? -1 : 1
        }
        
        // 优先级排序：high > medium > low
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        }
        
        // 创建时间排序（最新的在前）
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    }
  },
  methods: {
    toggleTodo(id) {
      this.$emit('toggle', id)
    },
    deleteTodo(id) {
      this.$emit('delete', id)
    },
    togglePin(id) {
      this.$emit('pin', id)
    },
    formatDate(date) {
      // 格式化日期为易读的形式
      if (!date) return ''
      const d = new Date(date)
      const now = new Date()
      const diffDays = Math.floor((now - d) / (1000 * 60 * 60 * 24))
      
      if (diffDays === 0) {
        return `今天 ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
      } else if (diffDays === 1) {
        return `昨天 ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
      } else {
        return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
      }
    }
  }
}
</script>

<style scoped>
.tdList {
    list-style: none;
    padding: 0;
    text-align: left;
    background-color: #fff;
    border-radius: 10px;
}

.tdItem {
    padding: 10px 20px 10px 10px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
}

.tdItem:last-child {
    border-bottom: 0;
}

.tdItem.priority-high {
    border-left: 4px solid #ff4757;
}

.tdItem.priority-medium {
    border-left: 4px solid #ffa502;
}

.tdItem.priority-low {
    border-left: 4px solid #2ed573;
}

.tdItem.pinned {
    background-color: #f8f9fa;
}

.pin-icon {
    cursor: pointer;
    margin-right: 5px;
    font-size: 16px;
    padding: 2px;
}

.pin-icon.pinned {
    color: #4e6ef2;
}

.tdToggle {
    cursor: pointer;
    margin-right: 10px;
}

.todo-content {
    flex: 1;
}

.tdTxt {
    display: block;
    margin-bottom: 4px;
}

.todo-date {
    font-size: 12px;
    color: #999;
    display: block;
}

.completed {
    text-decoration: line-through;
    color: #999;
}

.tdItem-acts {
    display: none;
    color: red;
}

.tdItem:hover .tdItem-acts {
    display: block;
}

.delete-btn {
    cursor: pointer;
}

.delete-btn:hover {
    text-decoration: underline;
}
</style>