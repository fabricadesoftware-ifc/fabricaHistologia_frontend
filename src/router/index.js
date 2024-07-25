import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/test-species',
      name: 'test-species',
      component: () => import('@/views/tests/SpeciesView.vue')
    },
    {
      path: '/test-systems',
      name: 'test-systems',
      component: () => import('@/views/tests/SystemsView.vue')
    },
  ]
})

export default router