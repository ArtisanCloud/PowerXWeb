<script setup lang="ts">
  import ChatBox from '@/components/chat-bot/chat-box/index.vue';
  import Toolbar from './toolbar/index.vue';
  import styles from './index.module.less';
</script>

<template>
  <div :class="styles.container">
    <Toolbar />
    <ChatBox />
  </div>
</template>
