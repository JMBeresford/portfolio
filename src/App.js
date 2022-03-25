import Experience from './components/Experience';
import Loading from './components/Loading';
import useStore from './store';
import Gui from './components/gui';
import Cursor from './components/Cursor';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import banner from './img/banner.jpg';

function App() {
  const view = useStore((state) => state.view);

  return (
    <div className='App'>
      <Helmet>
        {/* Google / Search Engine Tags */}
        <meta itemprop='name' content='John Beresford - Creative Developer' />
        <meta
          itemprop='description'
          content='John Beresford is a multi-disciplinary designer and developer with a focus on 3D, computer graphics and web technologies.'
        />
        <meta itemprop='image' content='https://i.imgur.com/h09DAlo.jpg' />

        {/* Facebook Meta Tags */}
        <meta property='og:url' content='https://www.john-beresford.com' />
        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content='John Beresford - Creative Developer'
        />
        <meta
          property='og:description'
          content='John Beresford is a multi-disciplinary designer and developer with a focus on 3D, computer graphics and web technologies.'
        />
        <meta property='og:image' content='https://i.imgur.com/h09DAlo.jpg' />

        {/* Twitter Meta Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content='John Beresford - Creative Developer'
        />
        <meta
          name='twitter:description'
          content='John Beresford is a multi-disciplinary designer and developer with a focus on 3D, computer graphics and web technologies.'
        />
        <meta name='twitter:image' content='https://i.imgur.com/h09DAlo.jpg' />
      </Helmet>
      {view === 'start' && <Loading />}
      <Gui />
      <Suspense fallback={null}>
        <Cursor />
      </Suspense>
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
    </div>
  );
}

export default App;
