// Todo服务模块，用于处理与后端的交互
// 由于是模拟环境，这里使用模拟数据和延时来模拟API调用

class TodoService {
  constructor() {
    // 模拟API基础URL
    this.baseUrl = 'https://api.example.com/todos';
    // 模拟网络延迟
    this.delay = 300;
  }

  // 模拟网络请求的延时函数
  delayRequest() {
    return new Promise(resolve => setTimeout(resolve, this.delay));
  }

  // 获取所有待办事项
  async getTodos() {
    try {
      await this.delayRequest();
      // 由于是模拟环境，这里返回模拟数据
      // 在真实环境中，这里应该是：
      // const response = await fetch(this.baseUrl);
      // return await response.json();
      
      console.log('从服务器获取待办事项...');
      // 返回空数组，实际数据将从本地存储加载
      return [];
    } catch (error) {
      console.error('获取待办事项失败:', error);
      throw new Error('获取待办事项失败');
    }
  }

  // 保存待办事项（创建或更新）
  async saveTodos(todos) {
    try {
      await this.delayRequest();
      // 由于是模拟环境，这里只打印日志
      // 在真实环境中，这里应该是：
      // const response = await fetch(this.baseUrl, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(todos)
      // });
      // return await response.json();
      
      console.log('保存待办事项到服务器:', todos);
      return { success: true, data: todos };
    } catch (error) {
      console.error('保存待办事项失败:', error);
      throw new Error('保存待办事项失败');
    }
  }

  // 删除待办事项
  async deleteTodo(id) {
    try {
      await this.delayRequest();
      // 由于是模拟环境，这里只打印日志
      // 在真实环境中，这里应该是：
      // const response = await fetch(`${this.baseUrl}/${id}`, {
      //   method: 'DELETE'
      // });
      // return await response.json();
      
      console.log('从服务器删除待办事项:', id);
      return { success: true, id };
    } catch (error) {
      console.error('删除待办事项失败:', error);
      throw new Error('删除待办事项失败');
    }
  }
}

// 导出单例实例
export default new TodoService();