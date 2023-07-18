import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {store}  from './app/store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    //<React.StrictMode> //causes duplicate rendering on dev mode
        <Provider store={store}>
        <Router>
            <Routes>
                <Route path='/*' element={<App></App> }></Route>
            </Routes>
            </Router>
        </Provider>
 // </React.StrictMode>
);

