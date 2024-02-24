// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();










// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux'; // Import Provider from react-redux
// import store from './store/store'; // Import the Redux store
// import './index.css';
// import App from './App'; // Adjusted import path for the App component
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <Provider store={store}> {/* Wrap the App component with Provider and pass the Redux store */}
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </Provider>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();






// index.js
// index.js

// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../src/store/configureStore'; // Import your store configuration
import App from './App';

const store = configureStore(); // Create the Redux store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')


);

