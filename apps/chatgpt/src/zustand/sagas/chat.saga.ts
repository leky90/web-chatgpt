import { call, select, spawn, take, takeLatest } from 'redux-saga/effects';
import { setState } from 'zustand-saga';
import { ChatState } from '../chat.store';
import { CHATGPT_VERSION } from '../../constants/app.constant';
import { EventChannel } from 'redux-saga';
import {
  FinishReason,
  Message,
  createMessageEventSourceChannel,
} from './channels/message-event-source.channel';
import { ChatMessageEntity } from '../../rxdb/chat-message.schema';
import db, { MyDatabase } from '../../rxdb/db';
import dayjs from 'dayjs';
import { firebaseAuth } from '../../firebase/init';

export const CHAT_ACTIONS = {
  SEND_MESSAGE: 'SEND_MESSAGE',
  RETRY_MESSAGE: 'RETRY_MESSAGE',
};

export type ChatAction = keyof typeof CHAT_ACTIONS;

export function* chatSaga() {
  yield takeLatest(CHAT_ACTIONS.SEND_MESSAGE, sendMessageSaga);
  yield takeLatest(CHAT_ACTIONS.RETRY_MESSAGE, retryMessageSaga);
}

export function* sendMessageSaga({
  chatMessage,
}: {
  type: ChatAction;
  chatMessage: ChatMessageEntity;
}) {
  yield setState((state: ChatState) => {
    state.messages.set(chatMessage.id, chatMessage);
  });
  const sendMessageUrl = `${
    process.env['NEXT_PUBLIC_API_DOMAIN']
  }/chat/user?message=${encodeURIComponent(chatMessage.message)}&chatId=${
    chatMessage.chatId
  }`;

  const dbInstance: MyDatabase = yield db;

  dbInstance['chat_message'].insert(chatMessage);

  dbInstance['chat'].upsert({
    name: chatMessage.message.substring(0, 50),
    id: chatMessage.chatId,
    date: dayjs().format('DD/MM/YYYY h:mm A'),
  });

  yield spawn(streamingMessageSaga, { url: sendMessageUrl });
}

export function* retryMessageSaga() {
  const chatId = yield select((state) => state.chatId);
  const retryUrl = `${process.env['NEXT_PUBLIC_API_DOMAIN']}/chat/user?retry=true&chatId=${chatId}`;

  yield spawn(streamingMessageSaga, { url: retryUrl });
}

function* streamingMessageSaga({ url }: { url: string }) {
  yield setState((state: ChatState) => {
    state.unresponded = false;
    state.processing = true;
  });

  const channel: EventChannel<Message> = yield call(
    createMessageEventSourceChannel,
    { url }
  );

  while (true) {
    const message: Message | 'ERROR' = yield take(channel);

    if (message === 'ERROR') {
      yield setState((state: ChatState) => {
        state.unresponded = true;
        state.processing = false;
      });
      yield call(setNewCookie);
      channel.close();
      break;
    }

    try {
      message.choices[0].delta.content = message.choices[0].delta.content
        ? message.choices[0].delta.content
        : '';
      const text = message.choices[0].delta.content;
      const finishReasons: FinishReason[] = [
        'stop',
        'content_filter',
        'length',
      ];
      if (finishReasons.includes(message.choices[0].finish_reason)) {
        const dbInstance: MyDatabase = yield db;

        yield setState((state: ChatState) => {
          dbInstance['chat_message'].insert({ ...state.answerMessage });
          state.messages.set(state.answerMessage.id, state.answerMessage);
          state.unresponded = false;
          state.processing = false;
          state.answerMessage = undefined;
        });

        channel.close();
        break;
      }

      yield setState((state: ChatState) => {
        if (!state.answerMessage) {
          const time = new Date().getTime();

          state.answerMessage = {
            id: crypto.randomUUID(),
            name: CHATGPT_VERSION,
            time,
            role: 'assistant',
            message: text,
            chatId: state.chatId,
          };
        } else {
          state.answerMessage.message += text;
        }
      });
    } catch (error) {
      channel.close();
      console.log('error', error);
    }
  }
}

export function* setNewCookie() {
  try {
    const accessToken = yield firebaseAuth.currentUser.getIdToken();
    const expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 năm
    const domain = location.hostname.split('.').slice(-2).join('.');
    document.cookie = `accessToken=${accessToken}; Domain=${domain}; Secure; SameSite=Strict`;
  } catch (error) {
    console.log('error');
  }
}
