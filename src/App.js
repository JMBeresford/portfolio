import Experience from './components/Experience';
import Loading from './components/Loading';
import useStore from './store';
import Gui from './components/gui';
import Cursor from './components/Cursor';
import { Suspense } from 'react';

function App() {
  const view = useStore((state) => state.view);

  return (
    <div className='App'>
      {view === 'start' && <Loading />}
      <Gui />
      <Suspense fallback={null}>
        <Cursor />
        <Experience />
      </Suspense>
    </div>
  );
}

export default App;
