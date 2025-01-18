<script setup lang="ts">
  import Toolbar from './toolbar/index.vue';
  import ChatBox from './chat-box/index.vue';
  import styles from './index.module.less';
</script>

<template>
  <div :class="styles.container">
    <Toolbar />
    <ChatBox />
  </div>
</template>
