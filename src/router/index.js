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
      meta: { verifiedUser: true },
      children: [
        {
          path: '',
          name: 'Painel Administrativo',
          component: () => import('@/views/admin/HomeView.vue')
        },
        {
          path: 'systems',
          name: 'Sistemas',
          meta: { verifiedUser: true },
          children: [
            {
              path: '',
              name: 'systems-admin-home',
              component: () => import('@/views/admin/portal/systems/SystemsView.vue')
            },
            {
              path: 'add',
              name: '> Cadastrar Sistema',
              component: () => import('@/views/admin/portal/systems/AddSystemView.vue')
            },
            {
              path: ':id',
              name: '> Atualizar Sistema',
              component: () => import('@/views/admin/portal/systems/SystemView.vue')
            },
          ]
        },
        {
          path: 'species',
          name: 'Espécies',
          meta: { verifiedUser: true },
          children: [
            {
              path: '',
              name: 'species-admin-home',
              component: () => import('@/views/admin/portal/species/SpeciesView.vue')

            },
             {
              path: ':id',
              name: '> Atualizar Espécie',
              component: () => import('@/views/admin/portal/species/SpecieView.vue')

            },
            {
              path: 'add',
              name: '> Cadastrar Espécie',
              component: () => import('@/views/admin/portal/species/AddSpecieView.vue')
            },
            {
              path: ':id',
              name: '> Atualizar Espécie',
              component: () => import('@/views/admin/portal/species/SpecieView.vue')
            }
          ]
        },
        {
          path: 'quiz',
          name: 'Quiz',
          meta: { verifiedUser: true },
          children: [
            {
              path: '',
              name: 'quiz-admin-home',
              component: () => import('@/views/admin/quiz/QuizesView.vue')
            },
            {
              path: ':id',
              name: '> Atualizar Pergunta',
              component: () => import('@/views/admin/quiz/QuizView.vue')
            },
            {
              path: 'answer/:id',
              name: '> Atualizar Resposta',
              component: () => import('@/views/admin/quiz/AnswerView.vue')
            },
            {
              path: 'add-quiz',
              name: '> Cadastrar Pergunta',
              component: () => import('@/views/admin/quiz/AddQuizView.vue')
            },
            {
              path: 'add-answer',
              name: '> Cadastrar Resposta',
              component: () => import('@/views/admin/quiz/AddAnswerView.vue')
            },
          ]
        },
        {
          path: 'supporting',
          name: 'Materiais de Apoio',
          meta: { verifiedUser: true },
          children: [
            {
              path: '',
              name: 'supporting-admin-home',
              component: () => import('@/views/admin/supporting_material/SupportingMaterialsView.vue')
            },
            {
              path: 'add-supporting-material',
              name: '> Cadastrar Material de Apoio',
              component: () => import('@/views/admin/supporting_material/AddSupportingMaterialView.vue')
            },
            {
              path: ':id',
              name: '> Atualizar Material de Apoio',
              component: () => import('@/views/admin/supporting_material/SupportingMaterialView.vue')
            },
          ]
        },
        {
          path: 'users',
          name: 'Usuários',
          meta: { verifiedUser: true },
          children: [
            {
              path: '',
              name: 'users-admin-home',
              component: () => import('@/views/admin/users/UsersView.vue')
            },
            {
              path: 'add-personal',
              name: '> Cadastrar Dados Pessoais',
              component: () => import('@/views/admin/users/AddPersonalDataView.vue')
            },
            {
              path: ':id',
              name: '> Atualizar Dados Pessoais',
              component: () => import('@/views/admin/users/PersonalDataView.vue')
            },
            //  {
            //   path: 'add-address',
            //   name: '> Cadastrar Endereço',
            //   component: () => import('@/views/admin/users/AddAddressView.vue')
            // },
            // {
            //   path: 'address/:id',
            //   name: '> Atualizar Endereço',
            //   component: () => import('@/views/admin/users/AdressView.vue')
            // },
          ]
        },
        {
          path: 'organs',
          name: 'Órgãos',
          meta: { verifiedUser: true },
          children: [
            {
              path: '',
              name: 'organs-admin-home',
              component: () => import('@/views/admin/portal/organs/OrgansView.vue')
            },
            {
              path: 'add',
              name: '> Cadastrar Órgão',
              component: () => import('@/views/admin/portal/organs/AddOrganView.vue')
            },
            {
              path: ':id',
              name: '> Atualizar Órgão',
              component: () => import('@/views/admin/portal/organs/OrganView.vue')
            },
          ]
        },
        {
          path: 'posts',
          name: 'Lâmina',
          meta: { verifiedUser: true },
          children: [
            {
              path: '',
              name: 'posts-admin-home',
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

router.beforeEach((to, from, next) => {
  const verified = sessionStorage.getItem('verified_user') === 'true'

  const requiresVerify = to.matched.some(record => record.meta.verifiedUser)

  if (requiresVerify && !verified) {
    next({ name: 'login' })
  } else {
    next()
  }
})


export default router