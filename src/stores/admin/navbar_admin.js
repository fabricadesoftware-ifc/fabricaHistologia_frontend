import { defineStore } from 'pinia'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import imageBone from '@/assets/images/admin/bone-svgrepo-com.svg'
import ImageLamina from '@/assets/images/admin/microscope-svgrepo-com.svg'
import ImageDocument from '@/assets/images/admin/document-svgrepo-com.svg'
import ImageUser from '@/assets/images/admin/users-svgrepo-com.svg'
import ImageTest from '@/assets/images/admin/test-svgrepo-com.svg'
import ImagePet from '@/assets/images/admin/pet-svgrepo-com.svg'
import ImageSystem from '@/assets/images/admin/dog-svgrepo-com.svg'
import ImageLogout from '@/assets/images/admin/logout-svgrepo-com.svg'
import ImageReturn from '@/assets/images/admin/arrow-back-svgrepo-com.svg'

export const useNavBarAdminStore = defineStore('navbarAdminStore', () => {
  const isMobile = ref(false)
  const open = ref(false)
  const isDropdownOpen = ref(false)

  const router = useRouter()
  const route = useRoute()

  //NavbarAdminMenu.vue

  const menuSections = ref([
    {
      title: 'Portal',
      items: [
        { label: 'Órgãos', icon: imageBone, to: '/orgaos' },
        { label: 'Lâminas', icon: ImageLamina, to: '/laminas' },
        { label: 'Espécies', icon: ImagePet, to: '/especies' },
        { label: 'Sistemas', icon: ImageSystem, to: '/sistemas' }
      ]
    },
    {
      title: 'Usuários',
      items: [
        { label: 'Usuários', icon: ImageUser, to: '/usuarios' }
      ]
    },
    {
      title: 'Quiz',
      items: [
        { label: 'Perguntas', icon: ImageTest, to: '/perguntas' }
      ]
    },
    {
      title: 'Material de Suporte',
      items: [
        { label: 'Conteúdos', icon: ImageDocument, to: '/conteudos' }
      ]
    }
  ])

    function navigateTo(to) {
    open.value = false
    router.push(to)
  }

  function isCurrent(path) {
    return route.path === path
  }

  //NavbarAdminUser.vue

  //NavbarDropdown.vue

    const dropdownSections = ref([
  {
    title: 'Usuário',
    items: [
      {
        label: 'Logout',
        icon: ImageLogout,
        event: 'logout'
      }
    ]
  },
  {
    title: 'Site',
    items: [
      {
        label: 'Voltar ao site',
        icon: ImageReturn,
        to: '/' // modifique para o caminho correto do site
      }
    ]
  }
  ])

  function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value
  }

  function openDropdown() {
    isDropdownOpen.value = true
  }

  function closeDropdown() {
    isDropdownOpen.value = false
  }

  //NavLateralAdmin.vue

  //NavLateralResponsive.vue

    function toggleMenu() {
    open.value = !open.value
  }

  function openMenu() {
    open.value = true
  }

  function closeMenu() {
    open.value = false
  }


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
    dropdownSections,
  }
})
