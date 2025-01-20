export interface SSEMessage {
  status: string;
  content: string;
  error: string;
  message: string;
  command?: {
    type: string; // 指令类型，例如 "navigate", "updateUI"
    payload?: Record<string, any>; // 指令相关的参数
  };
}

export const FormatSSEMessageReply = (msg: string): string => {
  let objMsg = msg;
  if (objMsg === '' || objMsg === undefined) {
    objMsg = '\n';
  }
  objMsg = objMsg.replace(/\\n/g, '\n');

  return objMsg;
};
