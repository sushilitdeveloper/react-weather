import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';
import MainComponent from './components/MainComponent';

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <MainComponent />

      </Provider>

      <footer className="fixed bottom-0 w-full flex justify-center px-4 text-gray-100 bg-gray-800">
        <div className="container py-1">
          <h1 className="text-center text-md font-bold lg:text-xl">
                App by - Sushil Kumar
          </h1>
        </div>
      </footer>
    </div>
  );
}

export default App;
