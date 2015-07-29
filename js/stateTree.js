import game from './reducers/game';
import Dispatcher from './Dispatcher';
import createStateTree from './createStateTree';

export default createStateTree(game, Dispatcher);
