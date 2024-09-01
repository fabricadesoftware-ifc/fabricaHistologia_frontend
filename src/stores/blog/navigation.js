import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";

export const useNavigationStore = defineStore("navigation", () => {
  const state = reactive({
    history: [],
    currentPage: null,
    navPortal: [
      {name: 'Atlas Digital', icon: 'https://cdn-icons-png.freepik.com/256/3407/3407022.png?semt=ais_hybrid'},
      {name: 'Conteudos', icon: 'https://cdn-icons-png.freepik.com/256/3407/3407022.png?semt=ais_hybrid'},
      {name: 'Quiz', icon: 'https://cdn-icons-png.freepik.com/256/3407/3407022.png?semt=ais_hybrid'}
    ]
  });

  const router = useRouter();

  const currentPage = computed(() => state.currentPage);

  const addToHistory = (route) => {
    state.history.push(route);
    state.currentPage = route;
  };

  const navigateBack = async () => {
    if (state.history.length > 1) {
      state.history.pop();
      const previousRoute = state.history.pop();
      if (previousRoute) {
        await router.push(previousRoute.fullPath);
        state.currentPage = previousRoute;
      }
    } else {
      await router.push('/');
      state.currentPage = null;
    }
  };

  return {
    state,
    currentPage,
    addToHistory,
    navigateBack,
  };
});