import { AppProps } from 'next/app';
import './styles.css';
import { FirebaseProvider } from '../src/components/firebase-provider';
import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <main className="app">
        <FirebaseProvider>
          <Component {...pageProps} />
        </FirebaseProvider>
      </main>
    </>
  );
}

export default CustomApp;
