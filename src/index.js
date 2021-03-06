import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Game from './components/game';
import mainReducer from './reducers';

import './index.css';

ReactDOM.render(
  <Provider store={createStore(mainReducer)}>
    <Game/>
  </Provider>,
  document.getElementById('root')
);
