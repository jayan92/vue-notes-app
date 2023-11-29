<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card" ref="deleteModalRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <section class="modal-card-body">Are you sure you want to delete this note?</section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="deleteNote">Delete</button>
        <button class="button" @click="closeModal">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { useNotesStore } from "../../../stores/NotesStore";
import { onMounted, onUnmounted, ref, toRefs } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  noteId: {
    type: String,
    required: true,
  },
});

const { modelValue, noteId } = toRefs(props);
const notesStore = useNotesStore();

const emits = defineEmits(["update:modelValue"]);

const deleteModalRef = ref(null);

const handleClose = (event) => {
  console.log("key close event");
  if (event.key === "Escape") {
    closeModal();
  }
};

const deleteNote = () => {
  notesStore.deleteNote(noteId.value);
};

const closeModal = () => {
  emits("update:modelValue", false);
};

onClickOutside(deleteModalRef, closeModal);

onMounted(() => {
  document.addEventListener("keyup", handleClose);
});

onUnmounted(() => {
  document.removeEventListener("keyup", handleClose);
});
</script>

<style scoped></style>
