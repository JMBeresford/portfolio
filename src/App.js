import Experience from './3D/Experience';
import Loading from './components/Loading';
import useStore from './store';
import About from './components/About';
import Works from './components/Works';
import Gui from './components/Gui';

function App() {
  const view = useStore((state) => state.view);

  return (
    <div className='App'>
      {view === 'start' && <Loading />}
      <Experience />
      <Gui />
      <About />
      <Works />
    </div>
  );
}

export default App;
