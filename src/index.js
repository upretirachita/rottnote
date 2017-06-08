import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NoticeBoard from './notes';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<NoticeBoard />, document.getElementById('root'));
registerServiceWorker();
