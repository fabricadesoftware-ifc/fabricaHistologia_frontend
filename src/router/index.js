import { createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/institutional/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/institutional/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue')
    },
    {
      path: '/portal',
      name: 'portal',
      children: [
        {
          path: '',
          name: 'welcome-portal', 
          component: () => import('@/views/institutional/AboutView.vue')
        },
        {
          path: 'post/:id',
          name: 'post-id',
          component: () => import('@/views/portal/PostView.vue')
        }
      ]
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
      path: '/test-initial',
      name: 'test-initial',
      component: () => import('@/views/tests/InitialPageView.vue')
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
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('@/views/portal/WelcomeView.vue'
      )
    }
  ]
})

export default router

