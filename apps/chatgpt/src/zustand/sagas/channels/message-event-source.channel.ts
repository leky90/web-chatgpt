import { eventChannel } from 'redux-saga';

export type FinishReason = 'content_filter' | 'stop' | 'length' | null;

export type Message = {
  choices: {
    index: number;
    finish_reason: FinishReason;
    delta: {
      content: string;
    };
  }[];
  created: number;
  id: string;
  model: 'gpt-4';
  object: 'chat.completion.chunk';
};

export function createMessageEventSourceChannel({ url }: { url: string }) {
  return eventChannel((emitter) => {
    const eventSource = new EventSource(url, { withCredentials: true });

    eventSource.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);
      emitter(message);
    };

    eventSource.onerror = () => {
      emitter('ERROR');
    };

    // Return function này sẽ được gọi để dọn dẹp khi channel đóng
    return () => {
      eventSource.close();
    };
  });
}
