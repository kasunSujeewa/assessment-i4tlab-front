<script setup lang='ts'>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { AnFilledDelete } from '@kalimahapps/vue-icons';
import { AkEdit } from '@kalimahapps/vue-icons';
import { vAutoAnimate } from '@formkit/auto-animate/vue';
import { TaProgress } from '@kalimahapps/vue-icons';
import { useTaskStore } from '@/stores/task';
const taskData = useTaskStore();

const props = defineProps<{
  task: Array<any>;
}>();

const deleteTaskHandle = (id: Number) =>{
  if (confirm("Are you sure you want to delete this item?")) {
    taskData.removeTask(id);
  } 
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
                    {{ task.owner && task.owner.name }}
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
            <div class="grid">
                <div class="grid text-xs text-gray-600 font-bold">
                    Status
                </div>
                <div class="grid grid-cols-5 font-bold items-center">
                    <div class="grid col-span-4">
                        {{task.status}} 
                    </div>
                    <div class="grid text-blue-700">
                        <TaProgress/>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-2 items-center hover:cursor-pointer">
                <div class="grid text-xl text-red-600 font-bold justify-end">
                    <AnFilledDelete @click="deleteTaskHandle(task.id)"/>
                </div>
                <div class="grid text-xl text-blue-600 font-bold justify-center">
                    <AkEdit/>
                </div>
                
            </div>
        
    </CardContent>
  </Card>
</template>