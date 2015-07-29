import React from 'react';
import Game from './components/Game';
import gameSubject from './stores/game'

gameSubject.subscribe(state => {
  React.render(<Game {...state} />, document.getElementById('react-app'));
})
