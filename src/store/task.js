import { defineStore } from 'pinia';
import axios from 'axios';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks(projectId) {
      try {
        const { data } = await axios.get(
          `https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/tasks?project_id=${projectId}`
        );
        this.tasks = data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async addTask(task) {
      try {
        const { data } = await axios.post('https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/tasks', task);
        this.tasks.push(data);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },
    async updateTask(taskId, updatedTask) {
      try {
        await axios.put(`https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/tasks/${taskId}`, updatedTask);
        this.fetchTasks(updatedTask.project_id);
      } catch (error) {
        console.error('Error updating task:', error);
      }
    },
  },
});
