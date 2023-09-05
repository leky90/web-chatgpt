import { RxCollection, RxDocument, RxJsonSchema } from 'rxdb';

export type ChatEntity = {
  id: string;
  name: string;
  date: string;
};

export type ChatEntityKey = keyof ChatEntity;

export type ChatEntityDocument = RxDocument<ChatEntity>;

export type ChatEntityCollection = RxCollection<ChatEntity>;

export const chatSchema: RxJsonSchema<ChatEntity> = {
  title: 'Chat schema',
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
    date: {
      type: 'string',
      maxLength: 50,
    },
  },
  required: ['id', 'name', 'date'],
};
