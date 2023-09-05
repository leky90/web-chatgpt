import { useChatStore } from '../zustand/chat.store';
import { ChatMessage } from './chat-message';
import { shallow } from 'zustand/shallow';
import { StreamingMessage } from './streaming-message';
import { useEffect, useRef } from 'react';
import { Button } from '@ldk/ui-kit';
import { AiOutlineMenu } from 'react-icons/ai';
import useAppStore from '../zustand/app.store';
import { ButtonRetry } from './button-retry';
import { FormNewChat } from './form-new-chat';
import db from '../rxdb/db';
import { ChatMessageEntity } from '../rxdb/chat-message.schema';

export function BoxMessages() {
  const { toggleMobileDrawerAction } = useAppStore(
    ({ toggleMobileDrawerAction }) => ({ toggleMobileDrawerAction }),
    shallow
  );
  const { messages, unresponded, chatId, setMessages } = useChatStore(
    ({ messages, unresponded, chatId, setMessages }) => ({
      messages,
      unresponded,
      chatId,
      setMessages,
    }),
    shallow
  );
  const boxChatRef = useRef<HTMLDivElement>();
  const scrollableRef = useRef(false);

  useEffect(() => {
    if (boxChatRef.current) {
      const scrollTo =
        boxChatRef.current.scrollHeight - boxChatRef.current.offsetHeight;
      boxChatRef.current.scrollTo(0, scrollTo);
      scrollableRef.current = false;
    }
  }, [messages]);

  useEffect(() => {
    async function queryChatMessages() {
      const dbInstance = await db;

      const chatMessages = await dbInstance['chat_message']
        .find({ selector: { chatId } })
        .sort({ time: 'asc' })
        .exec();

      const mapChatMessages: [string, ChatMessageEntity][] = chatMessages.map(
        (chatMessage) => [chatMessage.id, chatMessage.toJSON()]
      );

      setMessages(new Map(mapChatMessages));
    }

    queryChatMessages();
  }, [chatId, setMessages]);

  const onToggleMobileDrawer = () => {
    toggleMobileDrawerAction(true);
  };

  return (
    <>
      <div className="relative flex h-[65px] items-center justify-between border-b border-gray-300 p-3">
        <Button
          inline
          className="h-full lg:hidden"
          onClick={onToggleMobileDrawer}
        >
          <AiOutlineMenu />
        </Button>
        <strong className="hidden lg:inline">ChatGPT 4</strong>
      </div>
      <div className="relative h-full overflow-y-auto p-6 " ref={boxChatRef}>
        {chatId ? (
          <div className="space-y-4">
            {[...messages].map(([id, message]) => (
              <ChatMessage key={id} {...message} />
            ))}
            <StreamingMessage
              boxChatRef={boxChatRef}
              scrollableRef={scrollableRef}
            />
            {unresponded && <ButtonRetry />}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <FormNewChat />
          </div>
        )}
      </div>
    </>
  );
}
