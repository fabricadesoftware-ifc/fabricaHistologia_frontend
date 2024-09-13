import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";

export const useNavigationStore = defineStore("navigation", () => {
  const state = reactive({
    history: [],
    currentPage: null,
    navPortal: [
      {name: 'Atlas Digital', icon: 'https://res.cloudinary.com/dzdrwmug3/image/upload/v1726256669/vet/images/04397255-55b1-42cf-8d34-a6ba7f8b5a44_oclmlh.png', link: '/portal/system'},
      {name: 'Conteudos', icon: 'https://res.cloudinary.com/dzdrwmug3/image/upload/v1726256653/vet/images/0d41809a-dfe4-42c8-b7d6-647545805234_sks6kl.png', link: '/portal/content'},
      {name: 'Quiz', icon: 'https://res.cloudinary.com/dzdrwmug3/image/upload/v1726256611/vet/images/092796fb-7e18-48c3-a0bb-882d35d5298b_fubud7.png', link: '/portal/quiz'},
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