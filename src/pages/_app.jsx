import { useRouter } from 'next/router';
import useStore from '@/store';
import { useEffect } from 'react';
import Header from '@/config';
import Dom from '@/layout/dom';
import '@/styles/index.scss';
import dynamic from 'next/dynamic';

const LCanvas = dynamic(() => import('@/layout/canvas'), {
  ssr: false,
});

function App({ Component, pageProps = { title: 'index' } }) {
  const router = useRouter();

  useEffect(() => {
    useStore.setState({ debug: window.location.hash.includes('debug') });
  }, []);

  useEffect(() => {
    useStore.setState({
      router,
    });
  }, [router]);

  return (
    <>
      <Header title={pageProps.title} />
      <Dom>
        <Component {...pageProps} />
      </Dom>
      {Component?.r3f && <LCanvas>{Component.r3f(pageProps)}</LCanvas>}
    </>
  );
}

export default App;
