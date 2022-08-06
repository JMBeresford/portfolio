import DOM from '@/components/about/DOM';
import dynamic from 'next/dynamic';
import About from '@/components/about';
// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
// const About = dynamic(() => import('@/components/about'), {
//   ssr: false,
// });

// dom components goes here
const Page = (props) => {
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
    <About />
  </>
);

export default Page;

export async function getStaticProps() {
  return {
    props: {
      title: 'About',
    },
  };
}
