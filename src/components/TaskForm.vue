<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Listado de Tareas</h1>
    <div class="mb-4">
      <select v-model="filters.status" class="border px-4 py-2 mr-2">
        <option value="">Todos los estados</option>
        <option value="pending">Pendiente</option>
        <option value="in-progress">En progreso</option>
        <option value="done">Hecho</option>
      </select>
      <select v-model="filters.priority" class="border px-4 py-2">
        <option value="">Todas las prioridades</option>
        <option value="high">Alta</option>
        <option value="medium">Media</option>
        <option value="low">Baja</option>
      </select>
    </div>
    <button
      @click="openTaskForm()"
      class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4"
    >
      Crear Nueva Tarea
    </button>
    <Table :headers="['Título', 'Estado', 'Prioridad', 'Acciones']" :rows="filteredTasks" @onEdit="editTask" @onDelete="deleteTask" />
    <TaskForm v-if="isTaskFormVisible" :initialData="selectedTask" @onSubmit="handleTaskSubmit" @onCancel="closeTaskForm" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useTaskStore } from '@/store/task';
import Table from '@/components/Table.vue';
import TaskForm from '@/components/TaskForm.vue';
import { useRoute } from 'vue-router';

export default {
  components: { Table, TaskForm },
  setup() {
    const taskStore = useTaskStore();
    const route = useRoute();
    const projectId = route.params.projectId;

    const filters = ref({ status: '', priority: '' });
    const isTaskFormVisible = ref(false);
    const selectedTask = ref(null);

    const filteredTasks = computed(() =>
      taskStore.tasks.filter(
        (task) =>
          (!filters.value.status || task.status === filters.value.status) &&
          (!filters.value.priority || task.priority === filters.value.priority)
      )
    );

    const fetchTasks = async () => {
      await taskStore.fetchTasks(projectId);
    };

    const openTaskForm = () => {
      selectedTask.value = null;
      isTaskFormVisible.value = true;
    };

    const editTask = (task) => {
      selectedTask.value = task;
      isTaskFormVisible.value = true;
    };

    const deleteTask = async (task) => {
      await taskStore.deleteTask(task.id);
      fetchTasks();
    };

    const handleTaskSubmit = async (task) => {
      await taskStore.saveTask(task, projectId);
      fetchTasks();
      closeTaskForm();
    };

    const closeTaskForm = () => {
      isTaskFormVisible.value = false;
    };

    onMounted(fetchTasks);

    return {
      filters,
      filteredTasks,
      isTaskFormVisible,
      selectedTask,
      openTaskForm,
      editTask,
      deleteTask,
      handleTaskSubmit,
      closeTaskForm,
    };
  },
};
</script>
