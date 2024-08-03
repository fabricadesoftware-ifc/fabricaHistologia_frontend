import { ref, computed } from 'vue'
import { createRouter, createWebHistory, useRoute } from 'vue-router'

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
    }
  ]
})

const savePrevious = ref([])
const index = (savePrevious.value.length - 1)
let it = ref(0)

router.beforeEach((to, from)=>{
  if (router.path != '/' && to.path != from.path) {
  savePrevious.value.push(to.path)
  }
  if (to.path == '/') {
    savePrevious.value = []
  }

  console.log(savePrevious.value)
})

function toBackPage() {

  if (router.path != '/') {
  if (savePrevious.value.length == 1) { 
    router.push('/')
    savePrevious.value.splice(0, 2)
  } else {
  if(it.value == 0 ) {
  router.push(savePrevious.value[savePrevious.value.length - 2])
  } else {
  router.push(savePrevious.value[savePrevious.value.length - 2])
  }
  savePrevious.value.splice(savePrevious.value[savePrevious.value.length - 2], 2)
  it.value++
  }

  } else {
    it.value = 0
  }
}

export {toBackPage}
export default router

