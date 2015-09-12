import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';

import store from './store'
import Game from './components/Game';

const app = (
   <Provider store={store}>
      <Game />
   </Provider>
)

ReactDOM.render(app, document.getElementById('react-app'));
