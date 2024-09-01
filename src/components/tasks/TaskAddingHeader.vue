<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { AnOutlinedAppstoreAdd } from '@kalimahapps/vue-icons';
import { ref,defineEmits } from 'vue'
import { type DateValue, getLocalTimeZone, today, DateFormatter } from '@internationalized/date';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CdSend } from '@kalimahapps/vue-icons';
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { useTaskStore } from '@/stores/task';

const emit = defineEmits(['getLatestTask']);

const taskData = useTaskStore()

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const formSchema = toTypedSchema(
  z.object({
    task: z.string().min(2).max(255)
  })
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
});


const value = ref<DateValue>(today(getLocalTimeZone()));
const task = ref<string>("");

// Function to format date as YYYY-MM-DD
const formatDate = (dateValue: DateValue): string => {
  const date = new Date(dateValue.toDate(getLocalTimeZone()));
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const resetvalue = () =>{
    value.value = today(getLocalTimeZone());
    resetForm();
}
const onSubmit = handleSubmit(async (values) => {
    taskData.storeTask({title:values.task, due_date:formatDate(value.value)})
    resetvalue()
    emit('getLatestTask')
});
</script>

<template>
    <div class="grid grid-cols-1 w-full items-center gap-3">
      <form class="space-y-6" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="task">
              <FormItem v-auto-animate>
                  <FormControl> 
            <div class="grid relative">
          <Input id="task" v-model="task" type="text" placeholder="Add Tasks" class="pl-10" v-bind="componentField" />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <AnOutlinedAppstoreAdd class="size-6 text-muted-foreground"/>
          </span>
        </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="grid grid-cols-2 gap-6">
        <div class="grid ">
    <FormField name="due_date">
      <FormItem v-auto-animate>
        <FormControl>
            <Popover>
                  <PopoverTrigger as-child>
                    <Button
                      variant="outline"
                      :class="cn(
                        'w-[280px] justify-start text-left font-normal',
                        !value && 'text-muted-foreground',
                      )"
                      
                    >
                      <CalendarIcon class="mr-2 h-4 w-4" />
                      {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Due Date" }}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="w-auto p-0">
                    <Calendar v-model="value"  initial-focus />
                  </PopoverContent>
                </Popover>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
</div>
<div class="grid">
                <Button type="submit" class="w-1/4 bg-blue-600"><CdSend/></Button>
        </div>
</div>
  </form>
</div>
    
        
</template>