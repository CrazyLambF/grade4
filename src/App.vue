<template>
  <div class="app-wrapper">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <AppTabbar v-if="showTabbar" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppTabbar from '@/components/common/AppTabbar.vue'

const route = useRoute()
const showTabbar = computed(() => route.meta.showTabbar === true)
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
}
</style>
