import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";
import { useAuthStore } from "../stores/AuthStore";

const app = createApp(App);

router.beforeEach((to, from) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.user.uid ? true : false;

  if (isAuthenticated && to.name === "auth") {
    return { name: "notes" };
  }

  if (!isAuthenticated && to.name !== "auth") {
    return { name: "auth" };
  }
});

const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount("#app");
