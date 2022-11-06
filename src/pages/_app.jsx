import { useRouter } from 'next/router';
import { useStore, useHomeStore } from '@/store';
import { useEffect } from 'react';
import Header from '@/config';
import Dom from '@/layout/dom';
import '@/styles/index.scss';
import dynamic from 'next/dynamic';

const LCanvas = dynamic(() => import('@/layout/canvas'), {
  ssr: true,
});

function App({ Component, pageProps = { title: 'index' } }) {
  const router = useRouter();
  const actions = useStore((s) => s.actions);

  useEffect(() => {
    useStore.setState({ debug: window.location.hash.includes('debug') });
  }, []);

  useEffect(() => {
    useStore.setState({
      router,
    });

    actions.init();
  }, [router, actions]);

  useEffect(() => {
    let prevRoute = router?.pathname;

    if (prevRoute !== '/') {
      useStore.setState({ prevRoute: prevRoute });
    }
  }, [router.pathname]);

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
