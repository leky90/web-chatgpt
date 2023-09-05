import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type AppState = {
  isShowMobileDrawer: boolean;
};

const initialState: AppState = {
  isShowMobileDrawer: false,
};

const useAppStore = create(
  immer(
    devtools(
      combine({ ...initialState }, (set) => ({
        toggleMobileDrawerAction: (isShow: boolean) =>
          set({ isShowMobileDrawer: isShow }),
      }))
    )
  )
);

export default useAppStore;
