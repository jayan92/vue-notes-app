<template>
  <div class="container pt-6 px-2">
    <progress class="progress is-small is-primary" max="100" v-if="!notesLoaded" />
    <div v-else class="columns is-multiline">
      <div class="column is-one-third" v-for="note in notes" :key="note.id">
        <SingleNote :note="note" />
      </div>
    </div>
    <div class="has-text-centered py-6 is-size-4 has-text-grey-light is-family-monospace" v-if="!notes.length">
      No Notes Added here yet!!
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useNotesStore } from "../../stores/NotesStore";
import { storeToRefs } from "pinia";
import SingleNote from "../components/Notes/SingleNote.vue";

const notesStore = useNotesStore();
const { notes, notesLoaded } = storeToRefs(notesStore);

onMounted(() => {
  notesStore.getNotes();
});
</script>
