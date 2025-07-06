// stores/userMenuStore.js
import { defineStore } from 'pinia'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useNavBarAdminStore = defineStore('navbarAdminStore', () => {
  const isMobile = ref(false)
  const open = ref(false)
  const isDropdownOpen = ref(false)

  const router = useRouter()
  const route = useRoute()

  const menuSections = ref([
    {
      title: 'Portal',
      items: [
        { label: 'Órgãos', icon: '🦴', to: '/orgaos' },
        { label: 'Lâminas', icon: '🧬', to: '/laminas' },
        { label: 'Espécies', icon: '🐾', to: '/especies' },
        { label: 'Sistemas', icon: '🦻', to: '/sistemas' }
      ]
    },
    {
      title: 'Usuários',
      items: [
        { label: 'Usuários', icon: '👥', to: '/usuarios' }
      ]
    },
    {
      title: 'Quiz',
      items: [
        { label: 'Perguntas', icon: '📋', to: '/perguntas' }
      ]
    },
    {
      title: 'Material de Suporte',
      items: [
        { label: 'Conteúdos', icon: '📄', to: '/conteudos' }
      ]
    }
  ])

  function checkIsMobile() {
    isMobile.value = window.innerWidth <= 1150
  }

  function initResizeListener() {
    onMounted(() => {
      checkIsMobile()
      window.addEventListener('resize', checkIsMobile)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', checkIsMobile)
    })
  }

  function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value
  }

  function openDropdown() {
    isDropdownOpen.value = true
  }

  function closeDropdown() {
    isDropdownOpen.value = false
  }

  function toggleMenu() {
    open.value = !open.value
  }

  function openMenu() {
    open.value = true
  }

  function closeMenu() {
    open.value = false
  }

  function navigateTo(to) {
    open.value = false
    router.push(to)
  }

  function isCurrent(path) {
    return route.path === path
  }

  return {
    isMobile,
    open,
    isDropdownOpen,
    menuSections,
    checkIsMobile,
    initResizeListener,
    toggleDropdown,
    openDropdown,
    closeDropdown,
    toggleMenu,
    openMenu,
    closeMenu,
    navigateTo,
    isCurrent,
  }
})
