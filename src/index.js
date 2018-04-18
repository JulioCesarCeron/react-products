import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Apis from './Apis'
import '../node_modules/font-awesome/css/font-awesome.min.css';


ReactDOM.render(<App api={Apis} />, document.getElementById('root'));
registerServiceWorker();
