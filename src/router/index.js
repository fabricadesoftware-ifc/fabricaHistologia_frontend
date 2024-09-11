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
          component: () => import('@/views/portal/WelcomeView.vue')
        },
        {
          path: 'system',
          name: 'system', 
          component: () => import('@/views/portal/SystemView.vue')
        },
        {
          path: 'system/:id',
          name: 'system-id', 
          component: () => import('@/views/portal/OrgansView.vue')
        },
        {
          path: 'organ/:id',
          name: 'organ-id', 
          component: () => import('@/views/portal/OrgansView.vue')
        },
        {
          path: 'posts',
          name: 'posts',
          component: () => import('@/views/portal/PostsView.vue')
        }
        {
          path: 'post/:id',
          name: 'post-id',
          component: () => import('@/views/portal/PostView.vue')
        },
        {
          path: '/search',
          name: 'Search',
          component: () => import('@/views/portal/SearchView.vue')
        },
      ]
    },
  ]
})

export default router

