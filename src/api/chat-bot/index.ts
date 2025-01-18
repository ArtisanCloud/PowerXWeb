import { PowerModel, PrefixSSEUriWeb, PrefixUriWeb } from '@/api';

export const UriWebChatBot = '/chat-bot';

export interface Message extends PowerModel {
  role: string;
  content: string;
  type: string;
}

export interface ConversationItem {
  question: string;
  answer: string;
  errorMessage?: string;
}

export interface Conversation extends PowerModel {
  user_uuid?: string;
  app_uuid?: string;
  app_model_config_uuid?: string;
  name?: string;
  status?: string;
  context?: string;
  currentPrompt: string;
  messages?: Message[];
  items: ConversationItem[];
}

export interface ChatResponse {
  error: string;
  detail: string;
  errors: string;
}

export interface Usage {
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
}

export interface RequestSendChat {
  conversationUUID: string;
  appUUID?: string;
  llm?: string;
  images?: string[];
  messages: Message[];
}
export const GetChatBotActionUrl = (action: string): string => {
  // const channel = 'glm';
  const channel = 'openai';
  return `${PrefixUriWeb + UriWebChatBot}/${channel}/${action}`;
};

export const GetChatBotSSEActionUrl = (action: string): string => {
  // const channel = 'glm';
  const channel = 'openai';
  return `${PrefixSSEUriWeb + UriWebChatBot}/${channel}/${action}`;
};
