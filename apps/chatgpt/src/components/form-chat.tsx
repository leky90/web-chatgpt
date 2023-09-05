import { Button, TextArea } from '@ldk/ui-kit';
import { useRef } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { shallow } from 'zustand/shallow';
import useAuthStore from '../zustand/auth.store';
import { useChatStore } from '../zustand/chat.store';
import { ChatMessageEntity } from '../rxdb/chat-message.schema';

let lastEnterTime = 0;

export function FormChat() {
  const formRef = useRef<HTMLFormElement>();
  const textRef = useRef<HTMLTextAreaElement>();
  const { name, avatar } = useAuthStore(
    ({ auth }) => ({ name: auth?.displayName, avatar: auth?.photoURL }),
    shallow
  );
  const { processing, chatId, sendMessageSagaAction } = useChatStore(
    ({ processing, chatId, sendMessageSagaAction }) => ({
      chatId,
      processing,
      sendMessageSagaAction,
    })
  );

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const currentTime = new Date().getTime();

    if (currentTime - lastEnterTime < 1000) {
      // ngăn chặn liên tiếp 2 lần bấm
      textRef.current.value = '';
      return;
    }

    lastEnterTime = currentTime;

    const message = textRef.current.value.trim();

    if (message === '') return;

    const chatMessage: ChatMessageEntity & { avatar: string } = {
      id: crypto.randomUUID(),
      name,
      time: currentTime,
      role: 'user',
      avatar,
      message,
      chatId,
    };
    textRef.current.value = '';

    sendMessageSagaAction(chatMessage);
  };

  return (
    <form
      ref={formRef}
      className="flex items-stretch justify-between gap-3 border-t border-gray-300 p-3"
      onSubmit={onSubmit}
    >
      <TextArea
        ref={textRef}
        placeholder={processing ? 'Đang xử lí...' : 'Nhập điều bạn muốn hỏi...'}
        name="message"
        rows={1}
        autoFocus
        required
        disabled={processing || !chatId}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            onSubmit(e);
          }
        }}
      />

      <Button
        type="submit"
        inline
        onClick={onSubmit}
        disabled={processing || !chatId}
      >
        <AiOutlineSend />
      </Button>
    </form>
  );
}
