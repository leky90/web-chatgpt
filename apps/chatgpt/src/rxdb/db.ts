import {
  RxDatabase,
  addRxPlugin,
  createRxDatabase,
  removeRxDatabase,
} from 'rxdb';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBMigrationPlugin } from 'rxdb/plugins/migration';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { ChatEntityCollection, chatSchema } from './chat.schema';
import {
  ChatMessageEntityCollection,
  chatMessageSchema,
} from './chat-message.schema';

export type MyDatabaseCollections = {
  chat: ChatEntityCollection;
  chat_message: ChatMessageEntityCollection;
};

export type MyDatabase = RxDatabase<MyDatabaseCollections>;

const initDb = async () => {
  addRxPlugin(RxDBDevModePlugin);
  addRxPlugin(RxDBQueryBuilderPlugin);
  addRxPlugin(RxDBMigrationPlugin);
  addRxPlugin(RxDBUpdatePlugin);

  removeRxDatabase('chatdb_v2', getRxStorageDexie());

  const db: MyDatabase = await createRxDatabase<MyDatabaseCollections>({
    name: 'chatdb_v1',
    storage: getRxStorageDexie(),
    multiInstance: true,
    ignoreDuplicate: true,
  });

  if (!db['chat']) {
    await db.addCollections({
      chat_message: {
        schema: chatMessageSchema,
      },
      chat: {
        schema: chatSchema,
      },
    });
  }

  return db;
};

let db: Promise<MyDatabase> = new Promise(() => undefined);

if (typeof window !== 'undefined') {
  db = initDb();
}

export default db;
