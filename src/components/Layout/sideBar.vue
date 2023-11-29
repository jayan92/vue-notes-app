<template>
  <div id="sideBar" ref="sideBar" class="sideBar" :class="isSideBarOpen ? 'sideBarOpen' : 'sideBarClose'">
    <a href="javascript:void(0)" class="closebtn" @click="toggleSideBar">&times;</a>
    <NoteForm v-if="selectedNote" :note="selectedNote" />
    <NoteForm v-else />
  </div>
</template>

<script setup>
import { inject } from "vue";
import { useNotesStore } from "../../../stores/NotesStore";
import { storeToRefs } from "pinia";
import NoteForm from "../noteForm.vue";

const notesStore = useNotesStore();
const { selectedNote } = storeToRefs(notesStore);

const isSideBarOpen = inject("isSideBarOpen");
const toggleSideBar = inject("toggleSideBar");
</script>

<style scoped>
body {
  font-family: "Lato", sans-serif;
  transition: background-color 0.5s;
}

.sideBar {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  opacity: 0;
  background-color: #ffffff;
  overflow-x: hidden;
  transition: all 0.4s;
  padding-top: 60px;
  z-index: 999;
}

.sideBarOpen {
  width: 500px;
  opacity: 1;
}

.sideBarClose {
  width: 0px;
  opacity: 0;
}

@media screen and (max-width: 500px) {
  .sideBarOpen {
    width: 100%;
    opacity: 1;
  }
}

.sideBar a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sideBar a:hover {
  color: #f1f1f1;
}

.sideBar .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

#main {
  transition: margin-left 0.5s;
  padding: 16px;
}

@media screen and (max-height: 450px) {
  .sideBar {
    padding-top: 15px;
  }
  .sideBar a {
    font-size: 18px;
  }
}
</style>
