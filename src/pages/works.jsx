import Loading from '@/components/loading';
import DOM from '@/components/works/DOM';
// import Works from '@/components/works';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useStore } from '@/store';
import { useEffect } from 'react';
// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Works = dynamic(() => import('@/components/works'), {
  ssr: false,
  suspense: true,
});

// dom components goes here
const Page = (props) => {
  useEffect(() => {
    useStore.setState({ transitioning: false });
  }, []);

  return (
    <>
      <DOM />
    </>
  );
};

// canvas components goes here
// It will receive same props as Page component (from getStaticProps, etc.)
Page.r3f = (props) => (
  <>
    <Suspense fallback={null}>
      <Works />
    </Suspense>
  </>
);

export default Page;

export async function getStaticProps() {
  return {
    props: {
      title: 'Works - John Beresford',
    },
  };
}
