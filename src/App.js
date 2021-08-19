import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';
import MainComponent from './components/MainComponent';

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <MainComponent/>

      </Provider>
    </div>
  );
}

export default App;
