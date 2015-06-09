import createFluce from 'fluce/create-fluce';
import GameStore from './stores/GameStore';

const fluce = createFluce();

fluce.addStore('GameStore', GameStore);

export default fluce;
