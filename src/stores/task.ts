import { createTask, deleteTask, getTask } from '@/API/task';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToast } from "@/components/ui/toast/use-toast";


export const useTaskStore = defineStore('task', () => {
  const tasks = ref<any[]>([]); 
  const currentPage = ref<Number>(1);
  const total = ref<Number>(0);
  const perPage = ref<Number>(8);
  const lastPage = ref<Number>(1);
  const token = ref<any>(localStorage.getItem("authToken"));
  const { toast } = useToast();

  const setToken = (data) =>{
    token.value = data;
  }

  
  const fetchTasks = async (page = currentPage.value) => {

      const response = await getTask(token.value,page);
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

  const storeTask = async (data:{title: string, due_date: string}) => {

      const response = await createTask(token.value, data); // Replace with your API endpoint
      if (response.data.success) {
        console.log(response.data.data)
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

  
  const removeTask = async (taskId: number) => {
    
    const response = await deleteTask(token.value,taskId);
      if (response.data.success) {
        tasks.value = tasks.value.filter(task => task.id !== taskId);
        total.value = total.value-1
      toast({
        description: response.data.message,
      });
    } else {
      toast({
        variant: "destructive",
        description: response.data.message,
      });
  };
}

  return {
    tasks,
    currentPage,
    total,
    lastPage,
    fetchTasks,
    storeTask,
    removeTask,
    setToken
    // updateTask,
    // deleteTask,
  };
});
