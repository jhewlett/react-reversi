import createFluce from 'fluce/create-fluce';
import registerGameActions from './actions/GameActions';
import GameStore from './stores/GameStore';

const fluce = createFluce();

fluce.addStore('GameStore', GameStore);
registerGameActions(fluce);

export default fluce;
