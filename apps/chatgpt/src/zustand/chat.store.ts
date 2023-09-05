import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { enableMapSet } from 'immer';
import { CHAT_ACTIONS, chatSaga } from './sagas/chat.saga';
import sagaMiddleware from 'zustand-saga';
import { ChatMessageEntity } from '../rxdb/chat-message.schema';

enableMapSet();

export type ChatState = {
  messages: Map<string, ChatMessageEntity>;
  searchMessage: string;
  chatId: string;
  processing: boolean;
  unresponded: boolean;
  answerMessage?: ChatMessageEntity;
};

const initialState: ChatState = {
  messages: new Map([]),
  searchMessage: '',
  chatId: '',
  processing: false,
  unresponded: false,
  answerMessage: undefined,
};

export const useChatStore = create(
  immer(
    devtools(
      combine(
        { ...initialState },
        sagaMiddleware(chatSaga, (set, get, store) => ({
          sendMessageSagaAction: (chatMessage: ChatMessageEntity) =>
            store.putActionToSaga({
              type: CHAT_ACTIONS.SEND_MESSAGE,
              chatMessage,
            }),
          retryMessageSagaAction: () =>
            store.putActionToSaga({
              type: CHAT_ACTIONS.RETRY_MESSAGE,
            }),
          setSearchMessageAction: (search: string) =>
            set({ searchMessage: search }),
          setChatId: (chatId: string) => set({ chatId }),
          setMessages: (messages: Map<string, ChatMessageEntity>) =>
            set({ messages }),
        }))
      )
    )
  )
);
