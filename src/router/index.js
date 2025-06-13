import { createRouter, createWebHistory } from 'vue-router';
import ProjectList from '@/views/ProjectList.vue';
import TaskList from '@/views/TaskList.vue';

const routes = [
  { path: '/', redirect: '/projects' },
  { path: '/projects', name: 'Projects', component: ProjectList },
  { path: '/tasks/:projectId', name: 'Tasks', component: TaskList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;