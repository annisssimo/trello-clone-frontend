import { Provider } from 'react-redux';
import store from './store/store';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import MainSection from './components/MainSection/MainSection';
import './styles/styles.css';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <div className="flexContainer">
        <Sidebar />
        <MainSection />
      </div>
    </Provider>
  );
};

export default App;
