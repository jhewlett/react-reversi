import React from 'react';
import { Provider } from 'react-redux';

import store from './store'
import Game from './components/Game';

const app = (
   <Provider store={store}>
      { () => <Game /> }
   </Provider>
)

React.render(app, document.getElementById('react-app'));
