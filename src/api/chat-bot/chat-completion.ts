import axios from 'axios';
import {
  ChatResponse,
  getChatBotActionUrl,
  getChatBotSSEActionUrl,
  Usage,
} from '@/api/chat-bot/base';

// Chat Completion
export interface ChatCompletionMessage {
  role?: string;
  content?: string;
  name?: string;
}

export interface ChatCompletion {
  model?: string;
  messages: ChatCompletionMessage[];
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  stop?: string[];
  presence_penalty?: number;
  frequency_penalty?: number;
  logit_bias?: object;
  user?: string;
}

export interface ChatCompletionChoice {
  index?: number;
  message: ChatCompletionMessage;
  finish_reason?: string;
}

export interface ChatCompletionReply extends ChatResponse {
  id?: string;
  object?: string;
  created?: number;
  model?: string;
  choices: ChatCompletionChoice[];
  usage?: Usage;
}

export type ChatCompletionRequest = ChatCompletion;

export function ChatCompletion(request: ChatCompletionRequest) {
  const url = getChatBotActionUrl('chat/completion');
  return axios.post<ChatCompletionReply>(url, request);
}

export function ChatCompletionStream(request: ChatCompletionRequest) {
  const url = getChatBotSSEActionUrl('chat/completion/stream');
  return axios.post<ChatCompletionReply>(url, request);
}
