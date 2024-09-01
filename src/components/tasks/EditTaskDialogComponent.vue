<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTaskStore } from "@/stores/task";

const taskData = useTaskStore();

const handleCancelChanges = () => {
  taskData.setEditableModel(false);
  taskData.setEditableTask([]);
};
</script>

<template>
  <!-- Dialog component with v-model to control its visibility -->
  <Dialog v-model:open="taskData.editableModel">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> Title </Label>
          <Input
            v-model="taskData.EditableTask.title"
            id="name"
            value="Pedro Duarte"
            class="col-span-3"
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right"> Status </Label>
          <Input
            v-model="taskData.EditableTask.status"
            id="name"
            value="Pedro Duarte"
            class="col-span-3"
          />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="username" class="text-right"> Owner Name </Label>
          <Input
            v-model="taskData.EditableTask.owner.name"
            id="username"
            value="@peduarte"
            class="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <!-- Save changes button -->
        <Button type="submit" @click="handleSaveChanges" disabled>
          Save changes
        </Button>
        <Button type="submit" @click="handleCancelChanges" disabled>
          Cancel
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
