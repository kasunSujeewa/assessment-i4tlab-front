<template></template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getTask } from "@/API/task";
import { useToast } from "@/components/ui/toast/use-toast";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

const { toast } = useToast();

const tasks = ref<any[]>([]); 

// Function to fetch tasks
const fetchTasks = async () => {
  const response = await getTask(authStore.token);
  if (response.data.success) {
    tasks.value = response.data.data;
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

// Call fetchTasks when the component is mounted
onMounted(() => {
  fetchTasks();
});
</script>

<style></style>
