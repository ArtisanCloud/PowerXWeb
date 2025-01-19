<script setup lang="ts">
  import { ref } from 'vue';
  import useChatBotStore from '@/store/modules/chat-bot';
  import { Message } from '@arco-design/web-vue';
  import { v4 as uuidv4 } from 'uuid';
  import MarkdownPreview from '@/components/chat-bot/markdown/index.vue';
  import {
    ConversationItem,
    GetChatBotSSEActionUrl,
    RequestSendChat,
  } from '@/api/chat-bot';
  import { App } from '@/api/chat-bot/app';
  import useSSE from '@/utils/sse/EventSourceHelper';
  import { FormatSSEMessageReply, SSEMessage } from '@/utils/sse/format';
  import styles from './index.module.less';

  const chatBotStore = useChatBotStore();
  const refMessageContainer = ref(null);
  const refInput = ref<HTMLTextAreaElement>();
  const refFileInput = ref<HTMLInputElement>();
  const selectedImage = ref<string>('');

  // AI 处理状态
  const loading = ref(false);
  const aiProcessing = ref(false);
  const showHint = ref(false);

  let streamUrl = GetChatBotSSEActionUrl('agent', 'chat');
  const sse = useSSE();
  let controller: any = null;

  // 选中的应
  const selectedApp = ref<App>({
    uuid: '',
    avatar_url: '@/assets/images/robot/agent.png',
  });

  // 消息列表容器引用
  const messageContainerRef = ref<HTMLDivElement | null>(null);

  const handleSelectModel = () => {
    console.log('select model');
  };

  const validateFile = (file: File): boolean => {
    if (!file.type.startsWith('image/')) {
      Message.warning('请选择图片文件');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      Message.warning('图片大小不能超过 5MB');
      return false;
    }
    return true;
  };

  // 添加处理文件选择的函数
  const handleFileSelect = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!validateFile(file)) {
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        selectedImage.value = reader.result as string;
      };
    }
  };

  const handleImagesClear = () => {
    selectedImage.value = '';
    // 重置 Upload 组件的状态
    if (refFileInput.value) {
      refFileInput.value.value = '';
    }
  };

  const handleUploadImage = () => {
    refFileInput.value?.click();
  };

  const handleChatClosed = () => {
    // console.log('chat closed');
    loading.value = false;
    showHint.value = false;
    handleImagesClear();

    // // 清空 textarea
    // refInput.current!.value = '';
    controller.abort();
  };

  const actionSend = () => {
    if (loading.value) return;

    refInput.value!.blur(); // 手动失去焦点

    // 如果是随意聊天模式
    if (!selectedApp.value?.uuid) {
      streamUrl = GetChatBotSSEActionUrl('', 'chat');
    }

    // 执行发送消息的操作
    loading.value = true;
    const message = refInput.value!.value;
    if (message.trim() === '') {
      showHint.value = true;
      loading.value = false;
      return;
    }
    chatBotStore.updateCurrentConversation({
      currentPrompt: message,
    });

    // console.log('Send button clicked:', message);
    const newItem = {
      question: chatBotStore.currentConversation.currentPrompt,
      answer: '',
    } as ConversationItem;

    // 初始化一个uuid，给conversation
    let sessionID = '';
    if (
      !chatBotStore.currentConversation.uuid ||
      chatBotStore.currentConversation.uuid === ''
    ) {
      sessionID = uuidv4();
    } else {
      sessionID = chatBotStore.currentConversation.uuid!;
    }
    // 小心，别冲突了
    chatBotStore.updateCurrentConversation({
      uuid: sessionID,
      items: [...chatBotStore.currentConversation.items, newItem],
    });

    // 清空 textarea
    refInput.value!.value = '';

    const requestBody: RequestSendChat = {
      conversationUUID: sessionID,
      appUUID: selectedApp.value?.uuid ?? '',
      llm: chatBotStore.selectedLlm ?? '',
      images: selectedImage.value ? [selectedImage.value] : [], // 如果有图片则添加到请求中
      messages: [
        {
          type: 'user',
          role: 'user',
          content: chatBotStore.currentConversation.currentPrompt,
        },
      ],
    };

    // console.log('actionSend requestBody:', requestBody);
    controller = sse.connectEventSource({
      url: streamUrl,
      method: 'POST',
      body: requestBody,
      onopen(response: Response) {
        // 滑向下方
        // scrollToBottom()
        // console.log('onopen', response);

        // Handle successful connection
        if (response.status === 200) {
          // console.log('sse response', response.statusText);
        }
      },
      onmessage(msg: any) {
        // Handle incoming messages
        // console.log('msg', msg);
        try {
          let objMsg = '';
          let errorMessage = '';
          const parsedMsg: SSEMessage = JSON.parse(msg.data);
          if (parsedMsg.status === 'processing') {
            aiProcessing.value = true;
            return;
          }
          aiProcessing.value = false;

          if (parsedMsg.status === 'data') {
            objMsg = FormatSSEMessageReply(parsedMsg.content);
            // console.log(objMsg);
          } else if (parsedMsg.status === 'error') {
            errorMessage = parsedMsg.message;
          } else if (parsedMsg.status === 'finished') {
            handleChatClosed();
            return;
          }

          // const objMsg = JSON.parse(msg.data);

          chatBotStore.updateCurrentConversation({
            items: chatBotStore.currentConversation.items.map((item, index) =>
              index === chatBotStore.currentConversation.items.length - 1
                ? {
                    ...item,
                    answer: item.answer + objMsg,
                    errorMessage,
                  }
                : item
            ),
          });
        } catch (error) {
          console.error('Error parsing JSON data:', error);
          handleChatClosed();
        } finally {
          // <--- Add this check
          // const lastItem =
          //   chatBotStore.currentConversation.items[
          //     chatBotStore.currentConversation.items.length - 1
          //   ];
          // console.info("sse response", msg.data);")
        }
      },
      onclose() {
        // Handle connection closed
        // console.log('sse close');
        handleChatClosed();
      },
      onerror(err: any) {
        // Handle errors
        console.error('err', err);
        if (err) {
          handleChatClosed();
        }
      },
    });
  };

  const handleClickSend = () => {
    if (!loading.value) {
      actionSend();
    }
  };
  const handleKeyDown = (event: any) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      // 执行发送消息的操作
      event.preventDefault();
      if (!loading.value) {
        actionSend();
      }
    }
  };
</script>

<template>
  <div :class="styles.container">
    <!-- 消息展示区域 -->
    <div ref="refMessageContainer" :class="styles.messageContainer">
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
            <div v-if="loading && aiProcessing && !item.answer">...</div>
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

    <!-- 输入框区域 -->
    <div :class="styles.inputContainer">
      <!-- 文件输入 -->
      <input
        ref="refFileInput"
        type="file"
        style="display: none"
        accept="image/*"
        @change="handleFileSelect"
      />
      <!-- 图片预览 -->
      <div v-if="selectedImage" :class="styles.imagePreview">
        <div :class="styles.previewContent">
          <a-avatar :image-url="selectedImage" size="60" shape="square" />
          <a-button
            type="text"
            size="small"
            icon="icon-close"
            @click="handleImagesClear"
          />
        </div>
      </div>

      <div :class="styles.inputTool">
        <div :class="styles.left">
          <a-button
            :class="styles.buttonTool"
            size="small"
            @click="handleSelectModel"
          >
            <template #icon>
              <icon-apps />
            </template>
          </a-button>

          <a-button
            :class="styles.buttonTool"
            size="small"
            @click="handleUploadImage"
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
          v-model="chatBotStore.currentConversation.currentPrompt"
          :class="styles.input"
          :placeholder="showHint ? '发送时，消息不能为空' : '请输入内容...'"
          rows="3"
          :disabled="loading"
          @keydown="handleKeyDown"
        ></textarea>
      </div>

      <div :class="styles.inputCommand">
        <span :class="styles.shortCut">
          快捷发送：
          <icon-command />
          /ctl + 回车
        </span>
        <a-button type="outline" :loading="loading" @click="handleClickSend">
          发送
        </a-button>
      </div>
    </div>
  </div>
</template>
