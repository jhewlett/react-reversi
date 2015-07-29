import React from 'react';
import Game from './components/Game';
import gameSubject from './stores/game'
import { getScore } from './lib/Board'

const gameWithScore = gameSubject.map(state => {
  const score = getScore(state.board);

  return {
    ...state,
    score
  }
})

gameWithScore.subscribe(state => {
  React.render(<Game {...state} />, document.getElementById('react-app'));
})
