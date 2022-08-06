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
  const { enteringAbout, enteringWorks, enteringLab, actions } = useStore();

  useEffect(() => {
    useStore.setState({ debug: window.location.hash.includes('debug') });
  }, []);

  useEffect(() => {
    useStore.setState({
      router,
    });
  }, [router]);

  useEffect(() => {
    if (!router) return;

    router.prefetch('/about');
    router.prefetch('/works');
  }, [router]);

  useEffect(() => {
    if (enteringAbout) {
      router.push('/about');
    }
  }, [enteringAbout, router]);

  useEffect(() => {
    if (enteringWorks) {
      router.push('/works');
    }
  }, [enteringWorks, router]);

  useEffect(() => {
    if (enteringLab) {
      router.push('/lab');
    }
  }, [enteringLab, router]);

  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        let lastView = actions.getLastView();

        actions.setView(lastView);
      }

      if (as === '/') {
        useStore.setState({
          enteringAbout: false,
          enteringWorks: false,
          enteringLab: false,
        });
      }

      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router, actions]);

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
