import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { db } from "../src/js/firebase";
import { useAuthStore } from "./AuthStore";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";

export const useNotesStore = defineStore("notesStore", () => {
  const notes = ref([]);
  const notesLoaded = ref(false);

  const authStore = useAuthStore();
  let notesCollectionRef;
  let notesCollectionQuery;
  let notesSnapshot = null;

  const selectedNote = ref("");

  const getNoteContentById = computed(() => {
    return (id) => {
      return notes.value.find((note) => note.id === id).content;
    };
  });

  const totalNotesCount = computed(() => {
    return notes.value.length;
  });

  const totalCharactersCount = computed(() => {
    let count = 0;

    for (let note of notes.value) {
      count += note.content.length;
    }

    return count;
  });

  const getNotes = async () => {
    notesCollectionRef = collection(db, "users", authStore.user.uid, "notes");
    notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));

    // const querySnapshot = await getDocs(notesCollectionRef);
    // querySnapshot.forEach((doc) => {
    //   let note = {
    //     id: doc.id,
    //     title: doc.data().title,
    //     category: doc.data().category,
    //     content: doc.data().content,
    //   };
    //   notes.value.push(note);
    // });

    notesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
      let notesData = [];
      notesLoaded.value = false;
      querySnapshot.forEach((doc) => {
        let note = {
          id: doc.id,
          date: doc.data().date,
          title: doc.data().title,
          category: doc.data().category,
          content: doc.data().content,
        };
        notesData.push(note);
      });
      notes.value = notesData;
      notesLoaded.value = true;
    });
  };

  const clearNotes = () => {
    notes.value = [];
    if (notesSnapshot) notesSnapshot();
  };

  const addNote = async (note) => {
    // notes.value.unshift(note);
    await addDoc(notesCollectionRef, note);
  };

  const selectNote = (note) => {
    selectedNote.value = note;
  };

  const deleteNote = async (noteId) => {
    // notes.value = notes.value.filter((note) => note.id !== noteId);
    await deleteDoc(doc(notesCollectionRef, noteId));
  };

  const updateNote = async (id, content) => {
    // const index = notes.value.findIndex((note) => note.id === id);
    // notes.value[index] = { id, ...content };
    await updateDoc(doc(notesCollectionRef, id), {
      title: content.title,
      category: content.category,
      content: content.content,
    });
  };

  return {
    notes,
    addNote,
    getNotes,
    selectNote,
    deleteNote,
    updateNote,
    clearNotes,
    notesLoaded,
    selectedNote,
    totalNotesCount,
    totalCharactersCount,
    getNoteContentById,
  };
});
