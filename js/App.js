import React from 'react';
import Game from './components/Game';
import { getScore } from './lib/Board';
import game from './reducers/game';
import Dispatcher from './Dispatcher';
import createStateTree from './createStateTree';

const stateTree = createStateTree(game, Dispatcher);

const gameWithScore = stateTree.map(state => {
  const score = getScore(state.board);

  return {
    ...state,
    score
  };
});

gameWithScore.subscribe(state => {
  React.render(<Game {...state} />, document.getElementById('react-app'));
});
