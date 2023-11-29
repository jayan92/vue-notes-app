<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="columns is-mobile">
        <div class="column is-half">
          <span class="has-text-left tag">
            {{ formattedDate }}
          </span>
        </div>
        <div class="column is-half has-text-right">
          <span class="tag is-primary is-light">{{ note.category }}</span>
        </div>
      </div>

      <h3 class="card-title">
        {{ note.title }}
      </h3>

      <div class="content">
        {{ note.content }}
        <div class="has-text-right has-text-grey-light">
          <small>{{ characterLength }}</small>
        </div>
      </div>
    </div>

    <footer class="card-footer">
      <a href="#" class="card-footer-item" @click.prevent="handleEditClick(note)">Edit</a>
      <a href="#" class="card-footer-item" @click.prevent="handleDeleteClick">Delete</a>
    </footer>

    <DeleteNoteModal v-if="modals.deleteModal" v-model="modals.deleteModal" :note-id="note.id" />
  </div>
</template>

<script setup>
import { computed, toRefs, inject, reactive } from "vue";
import { useNotesStore } from "../../../stores/NotesStore";
import { useDateFormat } from "@vueuse/core";
import DeleteNoteModal from "./DeleteNoteModal.vue";

const notesStore = useNotesStore();

const toggleSideBar = inject("toggleSideBar");

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const modals = reactive({
  deleteModal: false,
});

const { note } = toRefs(props);

const formattedDate = computed(() => {
  console.log(note.value.date);
  const date = new Date(+note.value.date);
  const formatDate = useDateFormat(date, "MM-DD-YYYY @ HH:mm");
  console.log(formatDate);
  return formatDate.value;
});

const characterLength = computed(() => {
  const noteLength = note.value.length;
  const description = noteLength > 1 ? "characters" : "character";

  return `${note.value.content.length} ${description}`;
});

const handleEditClick = (note) => {
  notesStore.selectNote(note);
  toggleSideBar();
};

const handleDeleteClick = () => {
  modals.deleteModal = true;
};
</script>

<style scoped>
.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 14px;
}
</style>
