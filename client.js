import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

const container = document.getElementById('root');

ReactDOM.render(<Router routes={routes} history={browserHistory} />, container);
