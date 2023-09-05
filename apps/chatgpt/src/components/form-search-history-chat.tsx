import { Input } from '@ldk/ui-kit';
import { useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useChatStore } from '../zustand/chat.store';

export function FormSearchHistoryChat() {
  const { setSearchMessageAction } = useChatStore(
    ({ setSearchMessageAction }) => ({ setSearchMessageAction })
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const onSubmit = (e) => {
    e.preventDefault();
    setSearchMessageAction(inputRef.current.value);
  };

  return (
    <form className="relative mx-3 my-3 text-gray-600" onSubmit={onSubmit}>
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <AiOutlineSearch size={20} />
      </span>
      <Input
        ref={inputRef}
        type="search"
        name="search"
        placeholder="Tìm kiếm trò chuyện"
        required
        className="h-[40px] pl-8"
        onChange={() => {
          if (inputRef.current.value.trim() === '') {
            setSearchMessageAction('');
          }
        }}
      />
    </form>
  );
}
