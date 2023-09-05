import { Button } from '@ldk/ui-kit';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import db from '../rxdb/db';
import { ChatEntity } from '../rxdb/chat.schema';
import dayjs from 'dayjs';
import { useChatStore } from '../zustand/chat.store';

export function FormNewChat() {
  const { setChatId } = useChatStore(({ setChatId }) => ({ setChatId }));
  const onSubmit = async (e) => {
    e.preventDefault();

    const dbInstance = await db;

    const id = crypto.randomUUID();

    const chat: ChatEntity = {
      date: dayjs().format('DD/MM/YYYY h:mm A'),
      id,
      name: 'New chat',
    };

    dbInstance['chat'].insert(chat);

    setChatId(id);
  };

  return (
    <form className="border-y border-gray-300 p-3" onSubmit={onSubmit}>
      <Button type="submit">
        <AiOutlinePlusCircle /> Thêm trò chuyện mới
      </Button>
    </form>
  );
}
