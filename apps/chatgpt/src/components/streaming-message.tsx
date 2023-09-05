import { useChatStore } from '../zustand/chat.store';
import { ChatMessage } from './chat-message';
import { shallow } from 'zustand/shallow';
import { MutableRefObject, useEffect } from 'react';
import { Typing } from './typing';

type StreamingMessageProps = {
  boxChatRef: MutableRefObject<HTMLDivElement>;
  scrollableRef: MutableRefObject<boolean>;
};

export function StreamingMessage({
  boxChatRef,
  scrollableRef,
}: StreamingMessageProps) {
  const [answerMessage, processing] = useChatStore(
    (state) => [state.answerMessage, state.processing],
    shallow
  );

  useEffect(() => {
    if (boxChatRef.current) {
      if (scrollableRef.current === false) {
        const scrollTo =
          boxChatRef.current.scrollHeight - boxChatRef.current.offsetHeight;

        boxChatRef.current.scrollTo(0, scrollTo);
      }
    }
  }, [answerMessage, boxChatRef, scrollableRef]);

  useEffect(() => {
    function checkScrollable(event) {
      if (event.deltaY < 0) {
        scrollableRef.current = true;
      } else if (event.deltaY > 0) {
        if (
          boxChatRef.current.scrollTop >=
          boxChatRef.current.scrollHeight -
            boxChatRef.current.clientHeight -
            100
        ) {
          scrollableRef.current = false;
        }
      }
    }
    if (boxChatRef.current) {
      boxChatRef.current.addEventListener('wheel', checkScrollable);
    }
  }, [boxChatRef, scrollableRef]);

  return answerMessage ? (
    <>
      <ChatMessage {...answerMessage} />
    </>
  ) : processing ? (
    <Typing text="Đang suy nghĩ....." />
  ) : (
    <></>
  );
}
