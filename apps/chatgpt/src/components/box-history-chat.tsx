import { useEffect, useState } from 'react';
import { ChatEntity, ChatEntityDocument } from '../rxdb/chat.schema';
import db from '../rxdb/db';
import { RxDocumentData } from 'rxdb';
import type { Subscription } from 'rxjs';
import { BsTrash } from 'react-icons/bs';
import { useChatStore } from '../zustand/chat.store';

export function BoxHistoryChat() {
  const { searchMessage, chatId, setChatId } = useChatStore(
    ({ searchMessage, chatId, setChatId }) => ({
      searchMessage,
      chatId,
      setChatId,
    })
  );

  const [historyChats, setHistoryChats] = useState<
    (ChatEntityDocument | RxDocumentData<ChatEntity>)[]
  >([]);

  useEffect(() => {
    let sub;
    async function queryHistoryChat() {
      const dbInstance = await db;

      const chatDocuments = await dbInstance['chat']
        .find({ selector: { name: { $regex: `.*${searchMessage}.*` } } })
        .sort({ date: 'desc' })
        .exec();

      setHistoryChats(chatDocuments);

      sub = await dbInstance['chat'].$.subscribe((item) => {
        switch (item.operation) {
          case 'INSERT':
            setHistoryChats((historyChats) => [
              item.documentData,
              ...historyChats,
            ]);
            break;
          case 'UPDATE':
            setHistoryChats((historyChats) =>
              historyChats.map((historyChat) =>
                historyChat.id === item.documentId
                  ? item.documentData
                  : historyChat
              )
            );
            break;
          case 'DELETE':
            setHistoryChats((historyChats) =>
              historyChats.filter(
                (historyChat) => historyChat.id !== item.documentId
              )
            );
            break;

          default:
            break;
        }
      });
    }

    queryHistoryChat();

    return () => {
      (sub as Subscription)?.unsubscribe();
    };
  }, []);

  const removeChat = async (id: string) => {
    const dbInstance = await db;

    dbInstance['chat'].bulkRemove([id]);
    dbInstance['chat_message']
      .find({ selector: { chatId: id } })
      .exec()
      .then((docs) => {
        docs.forEach((doc) => doc.remove());
      });

    setChatId(
      id === chatId
        ? historyChats.length > 1
          ? historyChats.find((historyChat) => historyChat.id !== id).id
          : ''
        : chatId
    );
  };

  const selectChat = (id: string) => {
    setChatId(id);
  };

  return (
    <>
      <h2 className="my-2 mb-2 ml-3 text-lg text-gray-600">
        Lịch sử trò chuyện
      </h2>
      <ul className="overflow-auto">
        {historyChats.map((historyChat) => (
          <li
            key={historyChat.id}
            onClick={() => selectChat(historyChat.id)}
            className={`${
              chatId === historyChat.id && '!bg-orange-200'
            } flex cursor-pointer items-center border-gray-300 px-3 py-2 text-sm transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none`}
          >
            <div className="w-full py-2">
              <div className="flex justify-between">
                <span className="ml-2 block truncate font-semibold text-gray-600">
                  {historyChat.name}
                </span>

                <span
                  className="rounded-sm p-1 hover:bg-red-100"
                  onClick={() => removeChat(historyChat.id)}
                >
                  <BsTrash className="text-red-500" />
                </span>
              </div>
              <small className="ml-2 block text-gray-600">
                {historyChat.date}
              </small>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
