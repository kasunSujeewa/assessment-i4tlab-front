<script setup lang="ts">
import { onMounted } from "vue";
import TaskListComponentVue from "./tasks/TaskListComponent.vue";
import TaskAddingHeaderVue from "./tasks/TaskAddingHeader.vue";
import PaginationComponent from "./pagination/PaginationComponents.vue";
import { useTaskStore } from "@/stores/task";
import { useUserStore } from "@/stores/user";

const taskStore = useTaskStore();
const userData = useUserStore();

const fetchTasks = async () => {
  taskStore.fetchTasks();
};

const handleLatestTasks = () => {
  fetchTasks();
};

onMounted(() => {
  fetchTasks();
  userData.fetchUser();
});
</script>
<template>
  <div class="grid grid-cols-1 gap-8 justify-items-center">
    <TaskAddingHeaderVue v-if="userData.user.role === 'Admin'" @getLatestTask="handleLatestTasks" />
    <TaskListComponentVue :taskData="taskStore.tasks" />
    <PaginationComponent v-if="taskStore.total > 0" />
        <div v-else class="grid text-lg font-extrabold text-white">
            You have Not Tasks
        </div>
  </div>
</template>
