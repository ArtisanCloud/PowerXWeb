<script setup lang="ts">
  import useChatBotStore from '@/store/modules/chat-bot';
  import styles from './index.module.less';

  const chatBotStore = useChatBotStore();

  const openSetting = () => {
    // console.log('Open Setting');
  };
</script>

<template>
  <div :class="styles.container">
    <div :class="styles.info">
      <div :class="styles.avatar">
        <a-image
          :class="styles.avatarImage"
          :preview="false"
          src="/src/assets/images/robot/agent.png"
          draggable="false"
        />
      </div>
      <div :class="styles.content">
        <div :class="styles.titleBox">
          <div :class="styles.title">{{ chatBotStore.selectedApp.name }} </div>
          <div :class="styles.llmSelectorBox">ChatGPT-4o </div>
        </div>
        <div :class="styles.description">
          {{ chatBotStore.selectedApp.description }}
        </div>
      </div>
    </div>
    <div :class="styles.action">
      <a-button :class="styles.openSetting" size="small" @click="openSetting"
        ><template #icon> <icon-menu /> </template
      ></a-button>
    </div>
  </div>
</template>
