<template>
  <div class="hdContainer">
    <h1 class="hdTitle">代办事项</h1>
    <div class="todoForm">
      <div class="inputContainer">
        <input 
          type="text" 
          class="newTodo" 
          placeholder="请输入待办事项" 
          v-model="newTodoText" 
          @keyup.enter="addTodo"
          maxlength="50"
        />
        <span class="charCount">{{ 50 - newTodoText.length }}</span>
      </div>
      <select class="prioritySelect"
        v-model="selectedPriority"
        @change="handlePriorityChange"
      >
        <option value="low">低优先级</option>
        <option value="medium" selected>中优先级</option>
        <option value="high">高优先级</option>
      </select>
    </div>
    <div v-if="errorMsg" class="hdMsg">{{ errorMsg }}</div>
  </div>
</template>

<script>
export default {
  name: 'TodoHeader',
  data() {
    return {
      newTodoText: '',
      errorMsg: '',
      selectedPriority: 'medium'
    }
  },
  methods: {
    addTodo() {
      const trimmedText = this.newTodoText.trim()
      if (!trimmedText) {
        this.errorMsg = '请输入任务内容'
        return
      }
      this.errorMsg = ''
      this.$emit('add', {
        text: trimmedText,
        priority: this.selectedPriority
      })
      this.newTodoText = ''
      this.selectedPriority = 'medium' // 重置为默认优先级
    },
    handlePriorityChange() {
      // 优先级改变时的处理逻辑
    }
  }
}
</script>

<style scoped>
.todoForm {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }
  
  .inputContainer {
    position: relative;
    width: 100%;
    max-width: 400px;
  }
  
  .charCount {
    position: absolute;
    right: 10px;
    bottom: 8px;
    font-size: 12px;
    color: #999;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 2px 6px;
    border-radius: 3px;
  }

.prioritySelect {
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  background-color: #f0f0f0;
  outline: none;
}

.prioritySelect:focus {
  border-color: #4e6ef2;
}
</style>

<style scoped>
.hdContainer {
  text-align: center;
  font-size: 16px;
}

.hdTitle {
  color: #4e6ef2;
}

.newTodo {
  width: 100%;
  padding: 20px 20px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
}

.newTodo:focus {
  outline-color: #4e6ef2;
}

.hdMsg {
  color: red;
  margin: 10px 0;
}
</style>