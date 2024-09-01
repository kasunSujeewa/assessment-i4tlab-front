import { createTask, deleteTask, getTask } from "@/API/task";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { useAuthStore } from "./auth";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref<any[]>([]);
  const EditableTask = ref<any[]>([]);
  const currentPage = ref<Number>(1);
  const total = ref<Number>(0);
  const perPage = ref<Number>(8);
  const lastPage = ref<Number>(1);
  const editableModel = ref<Boolean>(false);
  const { toast } = useToast();

  const authData = useAuthStore();

  const setEditableModel = (data: boolean) => {
    editableModel.value = data;
  };
  const setEditableTask = (data: any) => {
    EditableTask.value = data;
  };

  const fetchTasks = async (page = currentPage.value) => {
    const response = await getTask(authData.token, page);
    if (response.data.success) {
      tasks.value = response.data.data.data;
      currentPage.value = response.data.data.current_page;
      total.value = response.data.data.total;
      perPage.value = response.data.data.per_page;
      lastPage.value = response.data.data.last_page;
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

  const storeTask = async (data: { title: string; due_date: string }) => {
    const response = await createTask(authData.token, data); // Replace with your API endpoint
    if (response.data.success) {
      console.log(response.data.data);
      tasks.value.push(response.data.data);
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

  //   // Update an existing task
  //   const updateTask = async (updatedTask: Task) => {
  //     try {
  //       await axios.put(`/api/tasks/${updatedTask.id}`, updatedTask); // Replace with your API endpoint
  //       const index = tasks.value.findIndex(task => task.id === updatedTask.id);
  //       if (index !== -1) {
  //         tasks.value[index] = updatedTask;
  //       }
  //     } catch (error) {
  //       console.error('Error updating task:', error);
  //     }
  //   };

  const removeTask = async (taskId: Number) => {
    const response = await deleteTask(authData.token, taskId);
    if (response.data.success) {
      tasks.value = tasks.value.filter((task) => task.id !== taskId);
      total.value = total.value - 1;
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

  return {
    tasks,
    currentPage,
    total,
    lastPage,
    fetchTasks,
    storeTask,
    removeTask,
    editableModel,
    setEditableModel,
    EditableTask,
    setEditableTask,
  };
});
