<template>
  <div class="form">
    <h3 class="is-size-4 has-text-weight-semibold mb-4 is-underlined">
      {{ isEditMode ? "Edit Note" : "Add New Note" }}
    </h3>
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input class="input" type="text" placeholder="Note Title" v-autofocus v-model="noteTitle" />
      </div>
    </div>

    <div class="field">
      <label class="label">Category</label>
      <div class="control">
        <div class="select is-fullwidth">
          <select v-model="noteCategory">
            <option>Office</option>
            <option>Personal</option>
            <option>Home</option>
            <option>Other</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Note</label>
      <div class="control">
        <textarea class="textarea" placeholder="Add New Note" rows="12" maxlength="100" v-model="newNote"></textarea>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control is-right">
        <button class="button is-link" :disabled="!newNote" @click.prevent="handleSubmit">
          {{ isEditMode ? "Edit Note" : "Add New Note" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, watch, computed, toRefs } from "vue";
import { useNotesStore } from "../../stores/NotesStore";
import { vAutofocus } from "../directives/vAutofocus";

const notesStore = useNotesStore();

const props = defineProps(["note"]);
const { note } = toRefs(props);

const toggleSideBar = inject("toggleSideBar");

const noteTitle = ref(note.value?.title || "");
const noteCategory = ref(note.value?.category || "Home");
const newNote = ref(note.value?.content || "");

const isEditMode = computed(() => {
  return Boolean(note.value);
});

watch(note, () => {
  noteTitle.value = note.value.title;
  noteCategory.value = note.value.category;
  newNote.value = note.value.content;
});

const reset = () => {
  noteTitle.value = "";
  noteCategory.value = "Home";
  newNote.value = "";
};

const addNewNote = () => {
  const currentDate = new Date().getTime().toString();
  const note = {
    title: noteTitle.value,
    category: noteCategory.value,
    content: newNote.value,
    date: currentDate,
  };
  notesStore.addNote(note);
  reset();
  toggleSideBar();
};

const editNote = () => {
  const updatedNote = {
    title: noteTitle.value,
    category: noteCategory.value,
    content: newNote.value,
  };
  notesStore.updateNote(note.value.id, updatedNote);
  reset();
  toggleSideBar();
};

const handleSubmit = () => {
  if (isEditMode.value) {
    editNote();
  } else {
    addNewNote();
  }
};
</script>

<style scoped>
.form {
  padding: 0 40px;
}
</style>
