import Navigation from '@/components/DOM/Navigation';
import { useWorksStore } from '@/store';
import dynamic from 'next/dynamic';
import { Suspense, useEffect } from 'react';
// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const WorkScene = dynamic(() => import('@/components/Canvas/WorkScene'), {
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
      <WorkScene {...props} />
    </Suspense>
  </>
);

export default Page;

export async function getStaticPaths() {
  const works = useWorksStore.getState().works;

  let paths = works.map((work) => ({
    params: {
      work: work.name,
    },
  }));

  return {
    paths: paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const work = useWorksStore
    .getState()
    .works.find((w) => w.name === context.params.work);
  return {
    props: {
      work: work,
      title: 'John Beresford - Works',
    },
  };
}
