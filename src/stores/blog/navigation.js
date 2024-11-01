import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'
import { computed, reactive, ref } from "vue";
import router from "@/router"

export const useNavigationStore = defineStore("navigation", () => {
  const state = useStorage('navigate', {
    history: [],
    currentPage: null,
    navPortal: [
      {name: 'Atlas Digital', icon: "https://res.cloudinary.com/dzdrwmug3/image/upload/v1/vet/images/64404d0c-23b7-4377-8502-b7ba59cbd537_s87psj", link: '/portal/system'},
      {name: 'Conteudos', icon: "https://res.cloudinary.com/dzdrwmug3/image/upload/v1/vet/images/80df3269-76f2-4133-b80c-9198a8ea42c6_cmyxma", link: '/portal/content'},
      {name: 'Quiz', icon: "https://res.cloudinary.com/dzdrwmug3/image/upload/v1/vet/images/206bef91-5262-4a43-955e-ed1281e6ad5e_nmembu", link: '/portal/quiz'},
    ]
  });

  const activeError = ref(false)
  const showActiveError = computed(()=> activeError.value)
  const formState = ref(false)
  const showFormState = computed(()=> formState.value)

  const messageBody = reactive({
    title: '',
    description: ''
  })

  const message = computed(()=> messageBody)

  const returnNavPortal = computed(()=>state.value.navPortal)

  const returnCurrentPage = computed(() => state.value.currentPage);

  const addToHistory = (route) => {
    state.value.history.push(route);
    state.value.currentPage = route;
  };

  const navigateBack = async () => {
 
    if (state.value.history.length != 1) {
      const previousRoute = state.value.history[state.value.history.length - 2]
      state.value.history.splice((state.value.history.length - 2), 2)
      if (previousRoute) {
        await router.push(previousRoute);
        state.value.currentPage = previousRoute;
      }
    } else {
      await router.push('/');
      state.value.history.splice(0, 2)
      state.value.currentPage = null;
    }
  };

  return {
    state,
    returnCurrentPage,
    returnNavPortal,
    activeError,
    showActiveError,
    messageBody,
    message,
    formState,
    showFormState,
    addToHistory,
    navigateBack,
  };
});