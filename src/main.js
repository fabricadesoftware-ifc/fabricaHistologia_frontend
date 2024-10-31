import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useNavigationStore } from './stores/blog/navigation';
import './assets/styles/main.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

const navigationStore = useNavigationStore();

router.beforeEach((to, from) => {
  
  if (router.path != '/') {
  navigationStore.addToHistory(to.path);
  }

  if (to.path == '/') {
    navigationStore.state.history = []
  }
});

app.mount('#app');