import { ref, watchEffect } from "vue";

export function useCharactersLimit(inputValue, limit) {
  const currentCharacters = ref(0);

  watchEffect(() => {
    currentCharacters.value = inputValue.value.length;

    if (currentCharacters.value >= limit) {
      // Trim the input value to the limit
      inputValue.value = inputValue.value.slice(0, limit - 1);
      // Show an alert message when the character limit is exceeded
      alert(`Character limit exceeded! Maximum is ${limit} characters.`);
    }
  });

  return {
    currentCharacters,
  };
}
