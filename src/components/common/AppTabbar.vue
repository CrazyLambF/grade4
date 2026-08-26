<template>
  <van-tabbar v-model="active" route safe-area-inset-bottom>
    <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/weekly" icon="edit">周周练</van-tabbar-item>
    <van-tabbar-item to="/games" icon="game-o">游戏</van-tabbar-item>
    <van-tabbar-item to="/mistakes" icon="warning-o">错题本</van-tabbar-item>
    <van-tabbar-item to="/profile" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref(0)
</script>
