import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../firebase/init';
import { shallow } from 'zustand/shallow';
import useAuthStore from '../zustand/auth.store';
import { useEffectOnce } from 'usehooks-ts';

export function FirebaseProvider({ children }) {
  const { setAuthAction } = useAuthStore(
    ({ setAuthAction }) => ({ setAuthAction }),
    shallow
  );

  useEffectOnce(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      console.log('onAuthStateChanged');
      if (user) {
        const accessToken = await user.getIdToken();

        const expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 năm
        const domain = location.hostname.split('.').slice(-2).join('.');
        document.cookie = `accessToken=${accessToken}; Domain=${domain}; Secure; SameSite=Strict`;

        setAuthAction({
          photoURL: user.photoURL,
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          uid: user.uid,
          // accessToken,
          // refreshToken: user.refreshToken,
        });
      } else {
        setAuthAction(null);
      }
    });
  });

  return <>{children}</>;
}
