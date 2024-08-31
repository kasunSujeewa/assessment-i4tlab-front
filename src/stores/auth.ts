import { defineStore } from 'pinia';


export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as { email: string } | null,
    token: localStorage.getItem('authToken') || null,
  }),
  actions: {
    setUser(user: { email: string }) {
      this.user = user;
    },
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('authToken', token);
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('authToken');
    },
  },
});
