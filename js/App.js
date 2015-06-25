import React from 'react';
import { createRedux } from 'redux';
import { Provider } from 'redux/react';
import game from './stores/game';
import Game from './components/Game';

const redux = createRedux({ game });

React.render(
   (<Provider redux={redux}>
      {() =>
         <Game />
      }
   </Provider>), document.getElementById('react-app'));
