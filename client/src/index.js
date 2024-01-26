import './index.css';

import App from './App';
import {BrowserRouter} from "react-router-dom" //esto sirve para el manejo de las rutas y los path
import { Provider } from 'react-redux'; // es un componente y  si trabajas con redux siempre el de react-redux
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {store} from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);



reportWebVitals();