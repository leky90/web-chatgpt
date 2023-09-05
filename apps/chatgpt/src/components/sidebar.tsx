import { Button } from '@ldk/ui-kit';
import { BoxHistoryChat } from './box-history-chat';
import { FormNewChat } from './form-new-chat';
import { FormSearchHistoryChat } from './form-search-history-chat';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../firebase/init';
import useAppStore from '../zustand/app.store';
import { useEffect, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { shallow } from 'zustand/shallow';

export function Sidebar() {
  const { isShow, toggleMobileDrawerAction } = useAppStore(
    ({ isShowMobileDrawer, toggleMobileDrawerAction }) => ({
      isShow: isShowMobileDrawer,
      toggleMobileDrawerAction,
    }),
    shallow
  );
  const sidebarRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const setFitScreenHeightOnMobile = () => {
      // We execute the same script as before
      const vh = window.innerHeight * 0.01;
      sidebarRef.current.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', setFitScreenHeightOnMobile);

    setFitScreenHeightOnMobile();

    return () => {
      window.removeEventListener('resize', setFitScreenHeightOnMobile);
    };
  }, []);

  const overlayClass = isShow ? 'z-40' : 'hidden';
  const toggleClass = isShow ? 'translate-x-0' : '-translate-x-full';

  const logOut = () => {
    signOut(firebaseAuth);
  };

  const onCloseMobileDrawer = () => {
    toggleMobileDrawerAction(false);
  };

  useOnClickOutside(sidebarRef, onCloseMobileDrawer);

  return (
    <>
      <div
        ref={sidebarRef}
        className={`${toggleClass} fixed top-0 left-0 z-50 flex h-screen !h-[calc(var(--vh,1vh)*100)] flex-col border-r border-gray-300 bg-white transition lg:static lg:col-span-1 lg:!h-auto lg:translate-x-0`}
      >
        <FormSearchHistoryChat />
        <FormNewChat />
        <BoxHistoryChat />
        <div className="mt-auto p-3">
          <Button onClick={logOut}>Đăng xuất</Button>
        </div>
      </div>
      <div
        className={`${overlayClass} fixed top-0 left-0 z-40 h-screen w-screen bg-black opacity-25 lg:hidden`}
      />
    </>
  );
}
