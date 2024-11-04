import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'
import { computed, reactive, ref } from "vue";
import router from "@/router"
import content from '@/assets/images/content.jpg'
import portal from '@/assets/images/portal.jpg'
import quiz from '@/assets/images/quiz.jpg'


export const useNavigationStore = defineStore("navigation", () => {
  const state = useStorage('navigate', {
    history: [],
    currentPage: null,
    navPortal: [
      {name: 'Atlas Digital', icon: portal},
      {name: 'Conteudos', icon: content},
      {name: 'Quiz', icon: quiz},
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