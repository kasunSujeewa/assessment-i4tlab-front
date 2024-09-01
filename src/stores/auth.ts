import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  // Define reactive state variables
  const user = ref<{ email: string } | null>(null);
  const token = ref<string | null>(localStorage.getItem("authToken") || null);

  // Define actions as methods
  function setUser(userData: { email: string }) {
    user.value = userData;
  }

  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem("authToken", newToken);
  }

  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem("authToken");
  }

  // Return the state and actions to be used by components
  return { user, token, setUser, setToken, logout };
});
