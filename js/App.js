import React from 'react';
import Game from './components/Game';
import fluce from './fluce';
import GameStore from './stores/GameStore';

fluce.addStore('GameStore', GameStore);

fluce.addActionCreator('switchPlayer', fluce => {
  return payload => fluce.dispatch('switchPlayer', payload);
});

fluce.addActionCreator('makeMove', fluce => {
  return payload => fluce.dispatch('makeMove', payload);
});

fluce.addActionCreator('checkOverlayHint', fluce => {
  return payload => fluce.dispatch('checkOverlayHint', payload);
});

fluce.addActionCreator('removeHint', fluce => {
  return payload => fluce.dispatch('removeHint', payload);
});

fluce.addActionCreator('undo', fluce => {
  return payload => fluce.dispatch('undo', payload);
});

fluce.addActionCreator('reset', fluce => {
  return payload => fluce.dispatch('reset', payload);
});

React.render(<Game />, document.getElementById('react-app'));
