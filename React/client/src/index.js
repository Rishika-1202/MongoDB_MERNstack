import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Make sure this file exists
import App from './App'; // Your main app component
import { Provider } from 'react-redux';
import store from './redux/store'; // Importing the store correctly
import reportWebVitals from './reportWebVitals'; // Optional performance tracking

// Setting up the root element for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Optional: to measure app performance
reportWebVitals();
