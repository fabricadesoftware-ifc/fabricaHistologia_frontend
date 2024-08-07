import { createRouter, createWebHistory} from 'vue-router'

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
      path: '/test-organs',
      name: 'test-organs',
      component: () => import('@/views/tests/OrgansView.vue')
    },
    {                     
      path: '/test-slides',
      name: 'test-slides',
      component: () => import('@/views/tests/SlidesView.vue')
    },
    {
      path: '/test-systems',
      name: 'test-systems',
      component: () => import('@/views/tests/SystemsView.vue')
    },
    {
      path: '/test-components',
      name: 'test-components',
      component: () => import('@/views/tests/ComponentsView.vue')
    },
  ]
})

export default router

