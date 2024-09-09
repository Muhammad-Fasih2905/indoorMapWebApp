import Navigation from './navigation/Navigation';
import { store } from './store/store';
import { BuildingProvider } from './useContext/GolobalContext';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Provider store={store}>
      <BuildingProvider>
        <Navigation />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      </BuildingProvider>
    </Provider>
  );
}

export default App;