import { useEffect } from 'react';
import { BoxMessages } from '../src/components/box-messages';
import { FormChat } from '../src/components/form-chat';
import ProtectedPage from '../src/components/page-private';
import { Sidebar } from '../src/components/sidebar';

export function Chat() {
  useEffect(() => {
    const setFitScreenHeightOnMobile = () => {
      // We execute the same script as before
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', setFitScreenHeightOnMobile);

    setFitScreenHeightOnMobile();

    return () => {
      window.removeEventListener('resize', setFitScreenHeightOnMobile);
    };
  }, []);

  return (
    <ProtectedPage>
      <div
        className={`container mx-auto flex h-screen !h-[calc(var(--vh,1vh)*100)] flex-col p-4`}
      >
        <div className="h-full grid-rows-1 overflow-hidden rounded border lg:grid lg:grid-cols-4">
          <Sidebar />
          <div className="flex h-full flex-col bg-slate-50 lg:col-span-3">
            <BoxMessages />
            <div className="mt-auto">
              <FormChat />
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}

export default Chat;
