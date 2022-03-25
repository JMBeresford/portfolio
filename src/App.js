import Experience from './components/Experience';
import Loading from './components/Loading';
import useStore from './store';
import Gui from './components/gui';
import Cursor from './components/Cursor';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import favicon from './img/favicon.ico';

function App() {
  const view = useStore((state) => state.view);

  return (
    <div className='App'>
      <Helmet>
        <link rel='icon' href='/favicon.ico' />
        {/* Google / Search Engine Tags */}
        <meta itemprop='name' content='John Beresford - Creative Developer' />
        <meta
          itemprop='description'
          content='John M. Beresford is a multi-disciplinary designer and developer with a focus on 3D, computer graphics and web technologies.'
        />
        <meta itemprop='image' content='https://i.imgur.com/h09DAlo.jpg' />
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
