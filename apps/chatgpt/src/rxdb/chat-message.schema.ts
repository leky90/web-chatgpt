import { RxCollection, RxDocument, RxJsonSchema } from 'rxdb';

export type ChatMessageEntity = {
  id: string;
  name: string;
  time: number;
  role: 'user' | 'assistant';
  message: string;
  chatId: string;
};

export type ChatMessageEntityKey = keyof ChatMessageEntity;

export type ChatMessageEntityDocument = RxDocument<ChatMessageEntity>;

export type ChatMessageEntityCollection = RxCollection<ChatMessageEntity>;

export const chatMessageSchema: RxJsonSchema<ChatMessageEntity> = {
  title: 'Chat Message schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 50, // <- the primary key must have set maxLength
    },
    name: {
      type: 'string',
      maxLength: 50,
    },
    time: {
      type: 'number',
      minimum: Number.MIN_SAFE_INTEGER,
      maximum: Number.MAX_SAFE_INTEGER,
    },
    role: {
      type: 'string',
      maxLength: 50,
    },
    message: {
      type: 'string',
      maxLength: 50,
    },
    chatId: {
      type: 'string',
      maxLength: 50, // <- the primary key must have set maxLength
    },
  },
  required: ['id', 'chatId', 'message', 'name', 'role', 'time'],
};
