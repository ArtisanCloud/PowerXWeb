import { ref } from 'vue';

interface SseData {
  [key: string]: any;
}

interface ReadyState {
  key: number;
  value: string;
}

interface Error {
  ErrCode: string;
  ErrMsg: string;
}

const useSSE = (url: string) => {
  const body = ref<any>('');
  const error = ref<Error>({ ErrCode: '', ErrMsg: '' });
  const isStreamEnded = ref<boolean>(true);
  const source = ref<EventSource | null>(null);
  const sseData = ref<SseData>({});
  const readyState = ref<ReadyState>({ key: 0, value: '正在链接中' });

  const setBody = (jsonBody: any) => {
    body.value = jsonBody;
  };

  // 创建 EventSource 对象并设置事件处理逻辑
  const createSource = () => {
    const stateArr: ReadyState[] = [
      { key: 0, value: '正在链接中' },
      { key: 1, value: '已经链接并且可以通讯' },
      { key: 2, value: '连接已关闭或者没有链接成功' },
    ];

    try {
      source.value = new EventSource(url);

      // 连接成功事件处理
      source.value.onopen = () => {
        readyState.value = stateArr[source.value!.readyState];
      };

      // 连接错误事件处理
      source.value.onerror = (e: Event) => {
        readyState.value = stateArr[source.value!.readyState];
        error.value = { ErrCode: e.type, ErrMsg: '远程错误' };
        // console.log(e);
        source.value?.close();
      };

      // 接收到消息事件处理
      source.value.onmessage = (event) => {
        try {
          // console.log(event.data);
          const eventData = JSON.parse(event.data);
          // console.log(eventData);

          sseData.value = eventData;
          if (eventData.errCode && eventData.errCode === '400') {
            error.value = eventData;
            source.value?.close();
            return;
          }

          if (eventData.status === 'end') {
            isStreamEnded.value = true;
            source.value?.close();
          } else {
            isStreamEnded.value = false;
          }
          // console.log(sseData.value);
        } catch (err: any) {
          console.error('Error parsing SSE data:', err);
        }
      };
    } catch (err) {
      console.error('Error creating SSE source:', err);
    }
  };

  // 初始化或重新连接 SSE
  const initSource = () => {
    if (!source.value || source.value.readyState === 2) {
      createSource();
    }
  };

  // 关闭 SSE 连接
  const closeSource = () => {
    source.value?.close();
  };

  // 重连 SSE 连接
  const reconnectSSE = () => {
    closeSource();
    source.value = null;
    createSource();
  };

  return {
    error,
    sseData,
    readyState,
    isStreamEnded,
    initSource,
    closeSource,
    reconnectSSE,
    setBody,
  };
};

export default useSSE;
