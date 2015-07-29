import stateTree from './stateTree';
import createConnector from './createConnector';
import { getScore } from './lib/Board';

const gameWithScore = stateTree.map(state => {
  const score = getScore(state.board);

  return {
    ...state,
    score
  };
});

export default createConnector(gameWithScore);
