<script setup lang="ts">
import { computed } from "vue";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/stores/task";
const taskData = useTaskStore();

const handlePageChange = (page: number) => {
  taskData.fetchTasks(page);
};

const total = computed(() => taskData.total);
const currentPage = computed(() => taskData.currentPage);
</script>

<template>
  <Pagination
    v-slot="{ page }"
    :total="total"
    :sibling-count="1"
    show-edges
    :default-page="currentPage"
    @pageChange="handlePageChange"
  >
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst />
      <PaginationPrev />

      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child
        >
          <Button
            class="w-10 h-10 p-0"
            :variant="item.value === page ? 'default' : 'outline'"
            @click="handlePageChange(item.value)"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext />
      <PaginationLast />
    </PaginationList>
  </Pagination>
</template>
