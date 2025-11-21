<template>
  <div class="container">
    <div v-if="loading" class="loading">
      正在加载数据...
    </div>
    <div v-else>
      <TodoHeader @add="addTodo" />
      <TodoList 
        :todos="todos" 
        :filter="currentFilter" 
        @toggle="toggleTodo" 
        @delete="deleteTodo" 
        @pin="togglePin"
      />
      <TodoFooter 
        v-if="todos.length > 0" 
        :todos="todos" 
        :currentFilter="currentFilter" 
        @filter="setFilter" 
      />
    </div>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
import todoService from './services/todoService.js'

export default {
  name: 'App',
  components: {
    TodoHeader,
    TodoList,
    TodoFooter
  },
  data() {
    return {
      todos: [],
      currentFilter: 'all',
      nextId: 1,
      loading: true,
      error: null
    }
  },
  created() {
    // 组件创建时加载数据
    this.loadData();
  },
  watch: {
    // 监听todos变化，自动保存
    todos: {
      deep: true,
      handler() {
        this.saveData();
      }
    }
  },
  methods: {
    // 从服务器和本地存储加载数据
    async loadData() {
      try {
        // 首先尝试从服务器加载
        let serverTodos = [];
        try {
          serverTodos = await todoService.getTodos();
        } catch (serverError) {
          console.warn('从服务器加载失败，尝试从本地存储加载:', serverError);
        }
        
        // 如果服务器没有数据，尝试从本地存储加载
        let todos = [];
        if (serverTodos && serverTodos.length > 0) {
          todos = serverTodos;
        } else {
          const savedTodos = localStorage.getItem('todos');
          if (savedTodos) {
            todos = JSON.parse(savedTodos);
          }
        }
        
        // 如果本地存储也没有数据，使用默认数据
        if (todos.length === 0) {
          todos = [
            { id: 1, text: '刷1000000套六级卷子', completed: false, createdAt: new Date().toISOString(), priority: 'medium', pinned: false },
            { id: 2, text: '背10000000个英语单词', completed: false, createdAt: new Date().toISOString(), priority: 'high', pinned: true }
          ];
        }
        
        this.todos = todos;
        // 更新nextId为当前最大id + 1
        if (todos.length > 0) {
          this.nextId = Math.max(...todos.map(todo => todo.id)) + 1;
        }
      } catch (error) {
        console.error('加载数据失败:', error);
        this.error = '加载数据失败';
      } finally {
        this.loading = false;
      }
    },
    
    // 保存数据到服务器和本地存储
    async saveData() {
      try {
        // 保存到本地存储（作为备份）
        localStorage.setItem('todos', JSON.stringify(this.todos));
        
        // 尝试保存到服务器
        try {
          await todoService.saveTodos(this.todos);
        } catch (serverError) {
          console.warn('保存到服务器失败，但已保存到本地存储:', serverError);
        }
      } catch (error) {
        console.error('保存数据失败:', error);
      }
    },
    
    addTodo({ text, priority = 'medium' }) {
      this.todos.push({
        id: this.nextId++,
        text,
        completed: false,
        createdAt: new Date().toISOString(),
        priority,
        pinned: false
      });
    },
    
    toggleTodo(id) {
      const todo = this.todos.find(t => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      // 尝试从服务器删除
      todoService.deleteTodo(id).catch(error => {
        console.warn('从服务器删除失败，但已从本地移除:', error);
      });
    },
    
    togglePin(id) {
      const todo = this.todos.find(t => t.id === id);
      if (todo) {
        todo.pinned = !todo.pinned;
      }
    },
    
    setFilter(filter) {
      this.currentFilter = filter;
    }
  }
}
</script>

<style scoped>
.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}
</style>

<style>
html,
body {
  background-color: #f5f5f5;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  max-width: 980px;
  min-height: 100%;
  margin: 0 auto;
}
</style>
