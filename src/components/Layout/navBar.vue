<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container px-2">
      <div class="navbar-brand">
        <RouterLink :to="{ name: 'notes' }" class="navbar-items is-size-4 is-family-monospace"> NotesList </RouterLink>

        <a
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': showNavBarMenu }"
          @click.prevent="showNavBarMenu = !showNavBarMenu"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': showNavBarMenu }">
        <div v-if="authStore.user.uid" class="navbar-end">
          <RouterLink
            :to="{ name: 'notes' }"
            active-class="is-active"
            class="navbar-item"
            @click.prevent="showNavBarMenu = false"
          >
            Notes
          </RouterLink>

          <RouterLink
            :to="{ name: 'stats' }"
            active-class="is-active"
            class="navbar-item"
            @click.prevent="showNavBarMenu = false"
          >
            Stats
          </RouterLink>

          <a href="#" active-class="is-active" class="navbar-item" @click="menuAction"> + Add a Note </a>

          <div>
            <button class="button is-info is-small mt-3 ml-3" @click.prevent="onLogout">
              Logout {{ authStore.user.email }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { inject, ref } from "vue";
import { useNotesStore } from "../../../stores/NotesStore";
import { useAuthStore } from "../../../stores/AuthStore";

const notesStore = useNotesStore();
const authStore = useAuthStore();

const showNavBarMenu = ref(false);
const toggleSideBar = inject("toggleSideBar");

const menuAction = () => {
  notesStore.selectNote("");
  showNavBarMenu.value = false;
  toggleSideBar();
};

const onLogout = () => {
  authStore.logoutUser();
};
</script>

<style scoped>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    right: 0;
  }
}

nav.navbar.is-success {
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.02);
}

a.navbar-items {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 0 10px;
}
</style>
