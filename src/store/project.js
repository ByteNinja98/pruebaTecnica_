import { defineStore } from 'pinia';
import axios from 'axios';

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: [],
  }),
  actions: {
    async fetchProjects() {
      try {
        const { data } = await axios.get('https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/projects');

        // Limpiar los datos
        const cleanData = data
          .filter((project, index, self) => 
            // Eliminar duplicados por ID
            index === self.findIndex((p) => p.id === project.id)
          )
          .map((project) => ({
            name: project.name || 'Sin nombre',
            description: project.description || 'Sin descripción',
            status: project.status?.toLowerCase() === 'activo' ? 'active' : project.status || 'inactive',
            id: project.id,
          }));

        this.projects = cleanData;
      } catch (error) {
        console.error('Error al obtener los proyectos:', error);
      }
    },
  },
});
