import axios from 'axios';
import {
  ChatCompletionReply,
  ChatCompletionRequest,
} from '@/api/chat-bot/chat-completion';
import { ChatResponse, GetChatBotActionUrl, Usage } from '@/api/chat-bot/index';

export interface Completion {
  model?: string;
  prompt: string;
  suffix?: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  logprobs?: number;
  echo?: boolean;
  stop?: string[];
  presence_penalty?: number;
  frequency_penalty?: number;
  best_of?: number;
  logit_bias?: object;
  user?: string;
}
export type CompletionRequest = Completion;

export interface LogprobResult {
  tokens?: string[];
  token_logprobs?: number[];
  top_logprobs?: object[];
  text_offset?: number[];
}

export interface CompletionChoice {
  text: string;
  index: number;
  finish_reason: string;
  logprobs: LogprobResult;
}

export interface CompletionReply extends ChatResponse {
  id?: string;
  object?: string;
  created?: number;
  model?: string;
  choices?: CompletionChoice[];
  usage?: Usage;
}

export function Completion(request: CompletionRequest) {
  const url = GetChatBotActionUrl('', 'completion');
  return axios.post<CompletionReply>(url, request);
}

export function CompletionStream(request: ChatCompletionRequest) {
  const url = GetChatBotActionUrl('', 'completion/stream');
  return axios.post<ChatCompletionReply>(url, request);
}
