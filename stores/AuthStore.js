import { defineStore } from "pinia";
import { auth } from "../src/js/firebase";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useNotesStore } from "./NotesStore";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const useAuthStore = defineStore("authStore", () => {
  const user = ref({});
  const router = useRouter();
  const notesStore = useNotesStore();

  const init = () => {
    onAuthStateChanged(auth, (userDetails) => {
      if (userDetails) {
        const uid = userDetails.uid;
        user.value = { email: userDetails.email, uid };
        router.push({ name: "notes" });
        notesStore.getNotes();
      } else {
        user.value = {};
        router.replace({ name: "auth" });
        notesStore.clearNotes();
      }
    });
  };

  const registerUser = (credentials) => {
    createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const loginUser = (credentials) => {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful
        console.log("loggedout");
      })
      .catch((error) => {
        // An error happened
      });
  };

  return {
    registerUser,
    loginUser,
    logoutUser,
    init,
    user,
  };
});
