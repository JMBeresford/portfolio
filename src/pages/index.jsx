// import Loading from '@/components/loading';
// import Office from '@/components/office';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
// const Loading = dynamic(() => import('@/components/loading'), {
//   ssr: false,
// });

const Office = dynamic(() => import('@/components/office'), {
  ssr: false,
  suspense: true,
});

// dom components goes here
const Page = (props) => {
  return <></>;
};

// canvas components goes here
// It will receive same props as Page component (from getStaticProps, etc.)
Page.r3f = (props) => (
  <>
    <Suspense fallback={null}>
      <Office />
    </Suspense>
  </>
);

export default Page;

export async function getStaticProps() {
  return {
    props: {
      title: 'John Beresford - Creative Developer',
    },
  };
}
