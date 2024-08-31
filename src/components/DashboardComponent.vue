<template>
    <div class="grid grid-cols-1 gap-8 justify-items-center">
        <TaskAddingHeaderVue @getLatestTask="handleLatestTasks"/>
        <TaskListComponentVue :taskData="taskStore.tasks"/>
        <PaginationComponent/>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getTask } from "@/API/task";
import { useToast } from "@/components/ui/toast/use-toast";
import { useAuthStore } from "@/stores/auth";
import TaskListComponentVue from "./tasks/TaskListComponent.vue";
import TaskAddingHeaderVue from "./tasks/TaskAddingHeader.vue";
import PaginationComponent from './pagination/PaginationComponents.vue'
import { useTaskStore } from "@/stores/task";

const taskStore = useTaskStore();
const { toast } = useToast(); 

const fetchTasks = async () => {
    taskStore.fetchTasks();
};

const handleLatestTasks = () =>{
    fetchTasks();
}

onMounted(() => {
  fetchTasks();
});
</script>

<style></style>
