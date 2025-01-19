<script setup lang="ts">
  import useChatBot from '@/components/chat-bot/chat-box/composables/useChatBot';
  import { ref } from 'vue';
  import useChatBotStore from '@/store/modules/chat-bot';
  import styles from './index.module.less';

  const refInput = ref<HTMLTextAreaElement>(null);
  const refFileInput = ref<HTMLInputElement>(null);
  const chatBotStore = useChatBotStore();
  const chatBot = useChatBot();

  chatBotStore.refInput = refInput;
  chatBotStore.refFileInput = refFileInput;
</script>

<template>
  <div :class="styles.container">
    <!-- 文件输入 -->
    <input
      ref="refFileInput"
      type="file"
      style="display: none"
      accept="image/*"
      @change="chatBot.handleFileSelect"
    />
    <!-- 图片预览 -->
    <div v-if="chatBotStore.selectedImage" :class="styles.imagePreview">
      <div :class="styles.previewContent">
        <a-avatar
          :image-url="chatBotStore.selectedImage"
          :size="Number('48')"
          shape="square"
        />
        <a-button type="text" size="small" @click="chatBot.handleImagesClear"
          ><template #icon> <icon-close /> </template
        ></a-button>
      </div>
    </div>

    <div :class="styles.inputTool">
      <div :class="styles.left">
        <a-button
          :class="styles.buttonTool"
          size="small"
          @click="chatBot.handleSelectModel"
        >
          <template #icon>
            <icon-apps />
          </template>
        </a-button>

        <a-button
          :class="styles.buttonTool"
          size="small"
          @click="chatBot.handleUploadImage"
          ><template #icon> <icon-image /> </template
        ></a-button>

        <a-button :class="styles.buttonTool" size="small"
          ><template #icon> <icon-tool /> </template
        ></a-button>
      </div>

      <div :class="styles.right">
        <a-button :class="styles.buttonTool" size="small"
          ><template #icon> <icon-fullscreen /></template
        ></a-button>
      </div>
    </div>
    <div :class="styles.inputMessage">
      <textarea
        ref="refInput"
        :class="styles.input"
        :placeholder="
          chatBotStore.showHint ? '发送时，消息不能为空' : '请输入内容...'
        "
        rows="3"
        :disabled="chatBotStore.loading"
        @keydown="chatBot.handleKeyDown"
      ></textarea>
    </div>

    <div :class="styles.inputCommand">
      <span :class="styles.shortCut">
        快捷发送：
        <icon-command />
        /ctl + 回车
      </span>
      <a-button
        type="outline"
        :loading="chatBotStore.loading"
        @click="chatBot.handleClickSend"
      >
        发送
      </a-button>
    </div>
  </div>
</template>
