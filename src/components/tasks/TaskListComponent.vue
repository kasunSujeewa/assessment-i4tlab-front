<template>
    <div class="grid grid-cols-1 gap-3">
        <TaskCardComponent v-for="task in taskData.tasks" :key="task.id" :task="task"/>
        
    </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/task';
import TaskCardComponent from './TaskCardComponent.vue'
const taskData = useTaskStore();
</script>

<style>

</style>