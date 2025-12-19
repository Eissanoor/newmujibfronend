
import './App.css';
import Pagerounter from './Component/Rounter/Pagerounter';
import axios from "axios";
import { ToastProvider } from './Contexts/ToastContext';

axios.defaults.baseURL = "https://mujibnewproject.vercel.app/";
function App() {
  return (
    <>
    <div className="App">
      <header className="App-header">
    <ToastProvider > 
       < Pagerounter/>
    </ToastProvider>
      </header>

    </div>
    </>
  );
}

export default App;
