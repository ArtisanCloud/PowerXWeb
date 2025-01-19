import { PowerModel, PrefixSSEUriWeb, PrefixUriWeb } from '@/api';
import { buildUri, buildUrlWithParams } from '@/utils/url';

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
export const GetChatBotActionUrl = (
  channel: string,
  action: string
): string => {
  return `${PrefixUriWeb + UriWebChatBot}/${channel}/${action}`;
};

export const GetChatBotSSEActionUrl = (
  channel: string,
  action: string
): string => {
  return buildUrlWithParams(import.meta.env.VITE_API_BASE_URL, [
    PrefixSSEUriWeb + UriWebChatBot,
    channel,
    action,
  ]);
};
