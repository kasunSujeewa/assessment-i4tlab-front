import { defineStore } from "pinia";
import { ref } from "vue";
import { ownUser } from "@/API/user";
import { useAuthStore } from "./auth";

export const useUserStore = defineStore("user", () => {
  const user = ref<any[]>([]);
  const authData = useAuthStore();

  const setUser = (data: any) => {
    user.value = data;
  };

  const fetchUser = async () => {
    const token = authData.token;

    const response = await ownUser(token);
    if (response.data.success) {
      user.value = response.data.data;
    } else {
      console.log(response.data.message);
    }
  };

  const logout = () => {
    user.value = [];
  };

  return {
    user,
    fetchUser,
    setUser,
    logout,
  };
});
