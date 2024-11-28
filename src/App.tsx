import { Provider } from 'react-redux';
import { store } from './store/store';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Header } from './components/Header/Header';
import './styles/styles.css';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Sidebar />
    </Provider>
  );
};

export default App;
