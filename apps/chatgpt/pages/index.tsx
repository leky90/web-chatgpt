import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import React, { useEffect } from 'react';
import { firebaseAuth } from '../src/firebase/init';
import { Button } from '@ldk/ui-kit';
import { AiOutlineGoogle } from 'react-icons/ai';
import useAuthStore from '../src/zustand/auth.store';
import { shallow } from 'zustand/shallow';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
  const [auth] = useAuthStore((state) => [state.auth], shallow);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(firebaseAuth, provider);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (auth) {
      router.push('/chat', null, { shallow: true });
    }
  }, [auth, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-[url(https://source.unsplash.com/random/1920x1080)] bg-cover">
      <div className="mb-4 rounded bg-white bg-opacity-70 px-8 pt-6 pb-8 shadow-md">
        {/* <form className="flex flex-col gap-4">
          <div>
            <label className="block font-bold mb-2" htmlFor="username">
              Tên đăng nhập
            </label>
            <Input id="username" type="text" placeholder="Nhập tên đăng nhập" />
          </div>
          <div>
            <label
              className="block text-theme-darker font-bold mb-2"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <Input id="password" type="password" placeholder="Nhập mật khẩu" />
            <p className="text-red text-xs italic mt-1">
              Vui lòng nhập mật khẩu
            </p>
          </div>

          <div className="flex flex-col gap-2 justify-center items-center">
            <Button type="button" className="font-bold">
              Đăng nhập
            </Button>

            <a href="#">Quên mật khẩu?</a>
          </div>
        </form> */}
        <label className="mb-2 block font-bold" htmlFor="username">
          Đăng nhập để bắt đầu chat
        </label>
        <Button
          onClick={signInWithGoogle}
          className="mt-3 bg-slate-200 font-bold"
        >
          <AiOutlineGoogle />
          Đăng nhập với Google
        </Button>
      </div>
    </div>
  );
};

export default Index;
