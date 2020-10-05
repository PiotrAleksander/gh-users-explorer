import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

if (process.env.NODE_ENV === 'test') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
