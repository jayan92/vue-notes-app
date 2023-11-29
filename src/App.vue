<template>
  <NavBar />
  <SideBar />
  <div class="container px-2">
    <RouterView />
  </div>
</template>

<script setup>
import { provide, ref, onMounted } from "vue";
import SideBar from "./components/Layout/sideBar.vue";
import NavBar from "./components/Layout/navBar.vue";
import { useAuthStore } from "../stores/AuthStore";
import "bulma/css/bulma.min.css";

const authStore = useAuthStore();

const isSideBarOpen = ref(false);
provide("isSideBarOpen", isSideBarOpen);

const toggleSideBar = () => {
  isSideBarOpen.value = !isSideBarOpen.value;
  document.body.style.backgroundColor = isSideBarOpen.value ? "rgba(0,0,0,0.7)" : "white";
};
provide("toggleSideBar", toggleSideBar);

onMounted(() => {
  authStore.init();
});
</script>
