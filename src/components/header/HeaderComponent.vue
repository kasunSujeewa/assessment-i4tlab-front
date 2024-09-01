<template>
  <div class="grid grid-cols-2">
    <div class="grid">
      <img
        src="/src/assets/images/i4tlogo.jpg"
        class="bg-transparent"
        width="100"
        alt=""
      />
    </div>
    <div class="grid grid-cols-5 gap-5">
      <Button class="bg-transparent">People</Button>
      <Button class="bg-transparent">Work</Button>
      <Button class="bg-transparent">Contact</Button>
      <Button class="bg-transparent">Blog</Button>
      <Button
        v-if="authUser.token !== null"
        class="bg-green-600 text-gray-200 hover:text-white rounded-xl"
        @click="userLogout()"
        >Logout</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { logout } from "@/API/task";
import { useToast } from "@/components/ui/toast/use-toast";
import router from "@/router";
import Button from "../ui/button/Button.vue";

const authUser = useAuthStore();
const { toast } = useToast();

const userLogout = async () => {
  const response = await logout(authUser.token);
  if (response.data.success) {
    authUser.logout();
    router.push({ name: "Login" });
    toast({
      description: response.data.message,
    });
  } else {
    toast({
      variant: "destructive",
      description: response.data.message,
    });
  }
};
</script>
