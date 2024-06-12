<template>
    <div>
        <Header />
        <div>
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </router-view>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import Header from '@/components/Header.vue';

  </script>
  
  <style lang="scss" scoped></style>
  