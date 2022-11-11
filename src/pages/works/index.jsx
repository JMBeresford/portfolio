import Navigation from '@/components/DOM/Navigation';
import { useStore } from '@/store';
import dynamic from 'next/dynamic';
import { Suspense, useEffect } from 'react';
// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const WorksScene = dynamic(() => import('@/components/Canvas/WorksScene'), {
  ssr: false,
  suspense: true,
});

// dom components goes here
const Page = (props) => {
  return (
    <>
      <Navigation />
    </>
  );
};

// canvas components goes here
// It will receive same props as Page component (from getStaticProps, etc.)
Page.r3f = (props) => (
  <>
    <Suspense fallback={null}>
      <WorksScene />
    </Suspense>
  </>
);

export default Page;

export async function getStaticProps() {
  return {
    props: {
      title: 'John Beresford - Works',
    },
  };
}
