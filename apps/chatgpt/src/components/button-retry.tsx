import { Button } from '@ldk/ui-kit';
import { useChatStore } from '../zustand/chat.store';

export function ButtonRetry() {
  const [unresponded, retryMessageSagaAction] = useChatStore((state) => [
    state.unresponded,
    state.retryMessageSagaAction,
  ]);

  return unresponded ? (
    <Button onClick={() => retryMessageSagaAction()}>Thử lại</Button>
  ) : (
    <></>
  );
}
