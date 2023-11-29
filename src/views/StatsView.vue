<template>
  <div>
    <div class="table-container mt-6">
      <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Stat</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Total Notes Count</th>
            <td>{{ notesCount }}</td>
          </tr>
          <tr>
            <th>Total Characters Count</th>
            <td>{{ totalCharactersCount }}</td>
          </tr>
        </tbody>
      </table>

      <div class="field">
        <label class="label">Feedbacks</label>
        <div class="control">
          <input class="input" type="text" placeholder="Enter Feedback..." v-autofocus v-model="feedback" />
          <p>Characters: {{ characterCount.currentCharacters }} / 50</p>
        </div>
      </div>
      <div class="field">
        <label class="label">Preview</label>
        <div class="control">
          <h3 class="has-text-weight-medium">{{ feedback }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vAutofocus } from "../directives/vAutofocus";
import { useNotesStore } from "../../stores/NotesStore";
import { useCharactersLimit } from "../composables/useCharactersLimit";

const notesStore = useNotesStore();

const feedback = ref("");

const notesCount = notesStore.totalNotesCount;
const totalCharactersCount = notesStore.totalCharactersCount;

const characterCount = useCharactersLimit(feedback, 50);
</script>

<style scoped></style>
