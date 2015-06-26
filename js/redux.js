import { createRedux } from 'redux';
import game from './stores/game';

const redux = createRedux({ game });

export default redux;
