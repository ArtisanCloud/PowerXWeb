import { defineStore } from 'pinia';
import { Conversation } from '@/api/chat-bot';
import { v4 as uuidv4 } from 'uuid';
import { App } from '@/api/chat-bot/app';
import { BAIDU_ERNIE_LITE_8K } from '@/config/llm';

export interface ChatBotState {
  // AI 处理状态
  loading: boolean;
  aiProcessing: boolean;
  showHint: boolean;

  refInput: any;
  refFileInput: any;
  refMessageContainer: any;

  selectedImage: string;
  controller: any;
  selectedApp: App;
  selectedLlm: string;
  currentConversation: Conversation;
}

const useChatBotStore = defineStore('chatBot', {
  state: (): ChatBotState => ({
    loading: false,
    aiProcessing: false,
    showHint: false,
    refInput: null,
    refFileInput: null,
    refMessageContainer: null,
    selectedImage: '',
    controller: null,
    selectedApp: {
      name: 'BrainX',
      description: '很乐意为您服务\n',
    },
    selectedLlm: BAIDU_ERNIE_LITE_8K,
    currentConversation: {
      currentPrompt: '',
      uuid: uuidv4(),
      items: [{ question: '', answer: '您好，请问有什么可以帮助到您？' }],
    },
  }),
  actions: {
    // 全量更新 currentConversation
    setCurrentConversation(conversation: Conversation) {
      this.currentConversation = conversation;
    },

    // 部分更新 currentConversation
    updateCurrentConversation(updates: Partial<Conversation>) {
      this.currentConversation = {
        ...this.currentConversation,
        ...updates,
      };
    },
  },
});

export default useChatBotStore;
