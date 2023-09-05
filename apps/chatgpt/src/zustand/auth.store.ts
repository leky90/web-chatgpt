import { create } from 'zustand';
import {
  combine,
  createJSONStorage,
  devtools,
  persist,
} from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type Auth = {
  displayName: string;
  email: string;
  photoURL: string;
  phoneNumber: string;
  // accessToken: string;
  // refreshToken: string;
  uid: string;
};

type ProfileSettings = {
  darkMode: boolean;
};

type AuthState = {
  auth?: Auth;
  settings: ProfileSettings;
  rehydrated: boolean;
};

const initialState: AuthState = {
  auth: null,
  settings: {
    darkMode: false,
  },
  rehydrated: false,
};

const useAuthStore = create(
  immer(
    devtools(
      persist(
        combine({ ...initialState }, (set) => ({
          setAuthAction: (auth: Auth) => set({ auth }),
        })),
        {
          name: 'auth-storage', // unique name
          storage: createJSONStorage(() => localStorage),
          onRehydrateStorage: () => {
            console.log('hydration starts');

            // optional
            return (state, error) => {
              if (error) {
                console.log('an error happened during hydration', error);
              } else {
                state.rehydrated = true;
                console.log('hydration finished');
              }
            };
          },
        }
      )
    )
  )
);

export default useAuthStore;
