<script setup lang="ts">
  import useChatBotStore from '@/store/modules/chat-bot';
  import MarkdownPreview from '@/components/chat-bot/markdown/index.vue';
  import { ref } from 'vue';
  import styles from './index.module.less';

  const refMessageContainer = ref<HTMLDivElement>();
  const chatBotStore = useChatBotStore();
  chatBotStore.refMessageContainer = refMessageContainer;
</script>

<template>
  <div ref="refMessageContainer" :class="styles.container">
    <div
      v-for="(item, index) in chatBotStore.currentConversation.items"
      :key="index"
      style="width: 100%"
    >
      <!-- 用户消息 -->
      <div v-if="item.question" :class="styles.userMessageCell">
        <div :class="styles.userAvatar">
          <a-avatar
            shape="circle"
            :size="Number('42')"
            image-url="/src/assets/images/logo.png"
            style="object-fit: cover"
          />
        </div>
        <div :class="styles.message">
          <MarkdownPreview :markdown-text="item.question" />
        </div>
      </div>

      <!-- AI 消息 -->
      <div :class="styles.aiMessageCell">
        <div :class="styles.aiAvatar">
          <a-avatar
            shape="circle"
            :size="Number('42')"
            image-url="/src/assets/images/robot/agent.png"
            style="object-fit: cover"
          />
        </div>
        <div :class="styles.message">
          <div
            v-if="
              chatBotStore.loading && chatBotStore.aiProcessing && !item.answer
            "
            >...</div
          >
          <div v-else-if="item.errorMessage" :class="styles.error">
            {{ item.errorMessage }}
          </div>
          <div v-else :class="styles.markdownContent">
            <MarkdownPreview :markdown-text="item.answer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
