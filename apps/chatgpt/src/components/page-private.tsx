import { shallow } from 'zustand/shallow';
import useAuthStore from '../zustand/auth.store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useIsClient } from 'usehooks-ts';

function ProtectedPage({ children }) {
  const { auth, setAuthAction } = useAuthStore(
    ({ auth, setAuthAction }) => ({ auth, setAuthAction }),
    shallow
  );
  const router = useRouter();

  const isClient = useIsClient();

  useEffect(() => {
    if (!auth) {
      router.push('/', null, { shallow: true });
    }
  }, [auth, router, setAuthAction]);

  if (!isClient)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );

  return <div className={auth ? '' : 'hidden'}>{children}</div>;
}

export default ProtectedPage;
