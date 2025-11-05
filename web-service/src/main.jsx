import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from "react-dom/client";
import AppContextProvider from './context/AppContext.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
);
