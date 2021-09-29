import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LoginContextProvider } from './components/favorites-context';

ReactDOM.render(
  <React.StrictMode>
  <LoginContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LoginContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
