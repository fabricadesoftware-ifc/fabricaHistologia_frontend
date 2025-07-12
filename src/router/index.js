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
      path: '/admin',
      name: 'admin',
      meta: {activeUser: true},
      children: [
         {
          path: '',
          name: 'admin-home', 
          component: () => import('@/views/admin/HomeView.vue')
        },
      ]
    },
    {
      path: '/orgaos',
      name: 'orgaos',
      meta: {activeUser: true},
      component: () => import('@/views/teste/Orgao.vue')
    },
    {
    path: '/laminas',
    name: 'laminas',
    meta: {activeUser: true},
    component: () => import('@/views/teste/Lamina.vue')
    },
    {
      path: '/portal',
      name: 'portal',
      meta: {activeUser: true},
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
          component: () => import('@/views/portal/SlidesView.vue')
        },
        {
          path: 'post/:id',
          name: 'post-id',
          component: () => import('@/views/portal/PostView.vue')
        },
        {
          path: 'content',
          name: 'content',
          component: () => import('@/views/portal/ContentView.vue')
        },
        {
          path: 'points',
          name: 'points',
          component: () => import('@/views/portal/PointFormView.vue')
        },
        {
          path: 'personal-data',
          name: 'personal-data', 
          component: () => import('@/views/portal/PersonalDataFormView.vue')
        },
        {
          path: 'quiz',
          name: 'quiz', 
          component: () => import('@/views/portal/QuizHomeView.vue')
        },
        {
          path: 'quiz/:id',
          name: 'quiz-id',
          component: () => import('@/views/portal/QuizView.vue')
        },
        {
          path: 'quiz/random',
          name: 'quiz-random',
          component: () => import('@/views/portal/QuizRandomView.vue')
        }
      ]
    },
  ]
})

export default router

