<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Listado de Proyectos</h1>

    <!-- Filtros -->
    <div class="flex items-center gap-4 mb-6">
      <input 
        v-model="filters.name" 
        type="text" 
        placeholder="Filtrar por nombre"
        class="border rounded-md px-4 py-2 shadow-sm w-1/3"
      />
      <select 
        v-model="filters.status" 
        class="border rounded-md px-4 py-2 shadow-sm w-1/3"
      >
        <option value="">Todos los estados</option>
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
      </select>
    </div>

    <!-- Tabla -->
    <Table :headers="['Nombre', 'Descripción', 'Estado']" :rows="filteredProjects" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useProjectStore } from '@/store/project';
import Table from '@/components/Table.vue';

export default {
  components: { Table },
  setup() {
    const projectStore = useProjectStore();
    const filters = ref({ name: '', status: '' });

    // Filtrar proyectos por nombre y estado
    const filteredProjects = computed(() => {
      return projectStore.projects
        .map(({ name, description, status }) => ({ name, description, status })) // Solo los campos necesarios
        .filter(project => {
          return (
            (!filters.value.name || project.name.toLowerCase().includes(filters.value.name.toLowerCase())) &&
            (!filters.value.status || project.status === filters.value.status)
          );
        });
    });

    onMounted(() => {
      projectStore.fetchProjects();
    });

    return {
      filters,
      filteredProjects,
    };
  },
};
</script>
