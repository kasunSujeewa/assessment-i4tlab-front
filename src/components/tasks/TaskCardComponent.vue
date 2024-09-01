<script setup lang='ts'>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AnFilledDelete } from '@kalimahapps/vue-icons';
import EditTaskDialogComponent from './EditTaskDialogComponent.vue'
import { AkEdit } from '@kalimahapps/vue-icons';
import { vAutoAnimate } from '@formkit/auto-animate/vue';
import { TaProgress } from '@kalimahapps/vue-icons';
import { CaTaskComplete } from '@kalimahapps/vue-icons';
import { CgSearchLoading } from '@kalimahapps/vue-icons';
import { useTaskStore } from '@/stores/task';
import { useUserStore } from '@/stores/user';

const taskData = useTaskStore();
const userData = useUserStore();

const props = defineProps<{
  task: Array<any>;
}>();

const deleteTaskHandle = (id: Number) =>{
  if (confirm("Are you sure you want to delete this item?")) {
    taskData.removeTask(id);
  } 
}

const handleEdit = (task : any) =>{
    taskData.setEditableModel(true);
    taskData.setEditableTask(task);
}

</script>

<template>
  <Card v-auto-animate class="w-[650px] hover:scale-105 duration-300">
    <CardContent class="grid grid-cols-5 p-4 justify-center">
       
            <div class="grid col-span-2">
                <div class="grid font-bold">
                    {{task.title}}
                </div>
                <div class="grid text-xs text-gray-600 font-bold">
                    {{ userData.user.role === 'User' ? (task.owner ? task.owner.name : "Unknown") : (task.worker ? task.worker.name : "Not Assigned Yet") }}
                </div>
            </div>
            <div class="grid">
                <div class="grid text-xs text-gray-600 font-bold">
                    Due Date
                </div>
                <div class="grid font-bold">
                    {{task.due_date}}
                </div>
            </div>
            <div class="grid grid-cols-5">
                <div class="grid grid-cols-1 col-span-4 text-gray-600 font-bold">
                    <div class="grid text-xs ">
                        Status

                    </div>
                    <div class="grid text-black">
                        {{task.status}} 

                    </div>
                </div>
                <div class="grid items-center">
                    <div v-if="task.status == 'Pending'" class="grid text-orange-700">
                        <CgSearchLoading class="size-8"/>
                    </div>
                    <div v-else-if="task.status == 'In Progress'" class="grid text-blue-700">
                        <TaProgress class="size-8"/>
                    </div>
                    <div v-else class="grid text-green-700">
                        <CaTaskComplete class="size-8"/>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-2 items-center hover:cursor-pointer">
                <div class="grid text-xl text-red-600 font-bold justify-end">
                    <AnFilledDelete v-if="userData.user.role === 'Admin'" @click="deleteTaskHandle(task.id)"/>
                    <AnFilledDelete class="hover:cursor-not-allowed" v-else/>
                </div>
                <div class="grid text-xl text-blue-600 font-bold justify-center" @click="handleEdit(task)">
                    <AkEdit/>
                </div>
                
            </div>
        
    </CardContent>
  </Card>
  <EditTaskDialogComponent/>
</template>