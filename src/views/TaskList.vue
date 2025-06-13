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
    <Table :headers="['Título', 'Estado', 'Prioridad', 'Acciones']" :rows="filteredTasks" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useTaskStore } from '@/store/task';
import Table from '@/components/Table.vue';
import { useRoute } from 'vue-router';

export default {
  components: { Table },
  setup() {
    const taskStore = useTaskStore();
    const route = useRoute();
    const projectId = route.params.projectId;

    const filters = ref({ status: '', priority: '' });

    const filteredTasks = computed(() => {
      return taskStore.tasks.filter(task => {
        return (
          (!filters.value.status || task.status === filters.value.status) &&
          (!filters.value.priority || task.priority === filters.value.priority)
        );
      });
    });

    onMounted(() => {
      taskStore.fetchTasks(projectId);
    });

    return {
      filters,
      filteredTasks,
    };
  },
};
</script>
