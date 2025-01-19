<script setup lang="ts">
  import MessageList from '@/components/chat-bot/chat-box/message-list/index.vue';
  import ChatInput from '@/components/chat-bot/chat-box/chat-input/index.vue';

  import { onMounted, ref, watchEffect } from 'vue';
  import useChatBotStore from '@/store/modules/chat-bot';
  import styles from './index.module.less';

  const chatBotStore = useChatBotStore();
  let refMessageContainer: any;

  const isAtBottom = ref(true); // 判断是否滚动到底部

  // 监听页面滚动，判断是否滚动到底部
  const checkScrollPosition = () => {
    if (refMessageContainer) {
      const THRESHOLD = 2;

      const container = refMessageContainer;
      const isBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <=
        THRESHOLD;
      // console.log(
      //   container.scrollHeight,
      //   container.scrollTop,
      //   container.scrollHeight - container.scrollTop,
      //   container.clientHeight,
      //   isBottom
      // );
      isAtBottom.value = isBottom;
    }
  };

  // 监听容器滚动事件
  onMounted(() => {
    refMessageContainer = chatBotStore.refMessageContainer;
    // console.log(2222, refMessageContainer);
    if (refMessageContainer) {
      refMessageContainer.addEventListener('scroll', checkScrollPosition);
    }
  });

  // 点击按钮滚动到最底部
  const scrollToBottom = () => {
    if (refMessageContainer) {
      refMessageContainer.scrollTop = refMessageContainer.scrollHeight;
    }
  };

  // 在显示消息时检查是否处于底部
  watchEffect(() => {
    checkScrollPosition();
  });
</script>

<template>
  <div :class="styles.container">
    <MessageList />
    <div
      v-if="!isAtBottom"
      :class="styles.scrollDownBox"
      @click="scrollToBottom"
    >
      <span>↓ 滚动到底部</span>
    </div>
    <ChatInput />
  </div>
</template>
