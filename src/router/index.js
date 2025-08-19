import { createRouter, createWebHistory } from 'vue-router'

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

      meta: { activeUser: true },
      children: [
        {
          path: '',
          name: 'Painel Administrativo',
          component: () => import('@/views/admin/HomeView.vue')
        },
        {
          path: 'systems',
          name: 'Sistemas',
          meta: { activeUser: true },
          children: [
            {
              path: '',
              name: '',
              component: () => import('@/views/admin/portal/systems/SystemView.vue')
            },
             {
              path: 'add',
              name: '> Cadastrar Sistema',
              component: () => import('@/views/admin/portal/systems/AddSystemView.vue')
            },
          ]
        },
        {
          path: 'quiz',
          name: 'Quiz',
          meta: { activeUser: true },
          children: [
            {
              path: '',
              name: '',
              component: () => import('@/views/admin/quiz/QuizView.vue')
            },
             {
              path: 'add-quiz',
              name: '> Cadastrar Pergunta',
              component: () => import('@/views/admin/quiz/AddQuizView.vue')
            },
          ]
        },
        {
          path: 'supporting',
          name: 'Materiais de Apoio',
          meta: { activeUser: true },
          children: [
            {
              path: '',
              name: '',
              component: () => import('@/views/admin/supporting_material/SupportingMaterialView.vue')
            },
             {
              path: 'add-supporting-material',
              name: '> Cadastrar Material de Apoio',
              component: () => import('@/views/admin/supporting_material/AddSupportingMaterialView.vue')
            },
          ]
        },
        {
          path: 'organs',
          name: 'Órgãos',
          meta: { activeUser: true },
          children: [
            {
              path: '',
              name: '',
              component: () => import('@/views/admin/portal/organs/OrgansView.vue')
            },
             {
              path: 'add',
              name: '> Cadastrar Órgão',
              component: () => import('@/views/admin/portal/organs/OrgansView.vue')
            },
            
          ]
        },
        {
          path: 'posts',
          name: 'Lâmina',
          meta: { activeUser: true },
          children: [
            {
              path: '',
              name: '',
              component: () => import('@/views/admin/portal/posts/PostsView.vue'),
            },
            {
              path: 'add-post',
              name: '> Cadastrar Lâmina',
              component: () => import('@/views/admin/portal/posts/AddPostView.vue')
            },
            {
              path: 'add-point',
              name: '> Cadastrar Ponto',
              component: () => import('@/views/admin/portal/posts/AddPointView.vue')
            },
            {
              path: ':id',
              name: '> Atualizar Lâmina',
              component: () => import('@/views/admin/portal/posts/PostView.vue')
            },
             {
              path: 'points/:id',
              name: '> Atualizar Ponto',
              component: () => import('@/views/admin/portal/posts/PointView.vue')
            },
          ]
        },
      ]
    },

    {
      path: '/portal',
      name: 'portal',
      meta: { activeUser: true },
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
        // {
        //   path: 'quiz',
        //   name: 'quiz', 
        //   component: () => import('@/views/portal/Quiziew.vue')
        // },
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

