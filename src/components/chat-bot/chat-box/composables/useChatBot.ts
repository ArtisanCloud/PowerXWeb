// useChatBot.ts
import { nextTick, Ref, ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import {
  ConversationItem,
  GetChatBotSSEActionUrl,
  RequestSendChat,
} from '@/api/chat-bot';
import { v4 as uuidv4 } from 'uuid';
import { FormatSSEMessageReply, SSEMessage } from '@/utils/sse/format';
import useChatBotStore from '@/store/modules/chat-bot';
import useSSE from '@/utils/sse/EventSourceHelper';

export default function useChatBot() {
  const chatBotStore = useChatBotStore();

  let streamUrl = GetChatBotSSEActionUrl('agent', 'chat');
  const sse = useSSE();

  const setMessageContainer = (container: HTMLDivElement | null) => {
    chatBotStore.refMessageContainer.value = container;
  };

  const scrollToBottom = () => {
    nextTick(() => {
      // 使用 nextTick 确保 DOM 已渲染
      if (chatBotStore.refMessageContainer) {
        chatBotStore.refMessageContainer.scrollTo({
          top: chatBotStore.refMessageContainer.scrollHeight,
          behavior: 'smooth',
        });
      }
    });
  };

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
        chatBotStore.selectedImage = reader.result as string;
      };
    }
  };

  const handleImagesClear = () => {
    chatBotStore.selectedImage = '';
    // 重置 Upload 组件的状态
    if (chatBotStore.refFileInput && chatBotStore.refFileInput.value) {
      chatBotStore.refFileInput.value.value = '';
    }
  };

  const handleUploadImage = () => {
    if (!chatBotStore.refFileInput) return;

    chatBotStore.refFileInput.value?.click();
  };

  const handleChatClosed = () => {
    // console.log('chat closed');
    chatBotStore.loading = false;
    chatBotStore.showHint = false;
    handleImagesClear();

    // // 清空 textarea
    // refInput.current!.value = '';
    chatBotStore.controller.abort();
  };

  const actionSend = () => {
    if (chatBotStore.loading) return;

    if (!chatBotStore.refInput) return;
    chatBotStore.refInput!.blur(); // 手动失去焦点

    // 如果是随意聊天模式
    if (!chatBotStore.selectedApp?.uuid) {
      streamUrl = GetChatBotSSEActionUrl('', 'chat');
    }
    // 执行发送消息的操作
    chatBotStore.loading = true;
    const message = chatBotStore.refInput.value;
    if (message.trim() === '') {
      chatBotStore.showHint = true;
      chatBotStore.loading = false;
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
    chatBotStore.refInput.value = '';

    const requestBody: RequestSendChat = {
      conversationUUID: sessionID,
      appUUID: chatBotStore.selectedApp?.uuid ?? '',
      llm: chatBotStore.selectedLlm ?? '',
      images: chatBotStore.selectedImage ? [chatBotStore.selectedImage] : [], // 如果有图片则添加到请求中
      messages: [
        {
          type: 'user',
          role: 'user',
          content: chatBotStore.currentConversation.currentPrompt,
        },
      ],
    };

    // console.log('actionSend requestBody:', requestBody);
    chatBotStore.controller = sse.connectEventSource({
      url: streamUrl,
      method: 'POST',
      body: requestBody,
      onopen(response: Response) {
        // 滑向下方
        scrollToBottom();
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
            chatBotStore.aiProcessing = true;
            return;
          }
          chatBotStore.aiProcessing = false;

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
    if (!chatBotStore.loading) {
      actionSend();
    }
  };
  const handleKeyDown = (event: any) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      // 执行发送消息的操作
      event.preventDefault();
      if (!chatBotStore.loading) {
        actionSend();
      }
    }
  };

  return {
    setMessageContainer,
    handleSelectModel,
    validateFile,
    handleFileSelect,
    handleImagesClear,
    handleUploadImage,
    handleChatClosed,
    handleClickSend,
    handleKeyDown,
  };
}
