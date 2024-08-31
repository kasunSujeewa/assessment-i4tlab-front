<script setup lang="ts">
import HeaderComponentVue from './components/header/HeaderComponent.vue';
import Toaster from '@/components/ui/toast/Toaster.vue'


</script>

<template>
  <div class="px-48 py-10 bg-gradient-to-r from-purple-800 via-purple-500 to-pink-500 h-screen">
    <div>
      <HeaderComponentVue/>
    </div>
    <div class="grid grid-cols-1 justify-items-center py-24">
       
        <router-view></router-view>
    </div>
  </div>
  <Toaster />
</template>

<style scoped>

</style>
