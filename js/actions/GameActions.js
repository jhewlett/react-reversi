const GameActions = {
   switchPlayer: actionCreator('switchPlayer'),
   makeMove: actionCreator('makeMove'),
   checkOverlayHint: actionCreator('checkOverlayHint'),
   removeHint: actionCreator('removeHint'),
   undo: actionCreator('undo'),
   reset: actionCreator('reset')
};

function actionCreator(name) {
   return fluce => {
      return payload => fluce.dispatch(name, payload);
   };
}

export default function registerGameActions(fluce) {
   for (let key in GameActions) {
      fluce.addActionCreator(key, GameActions[key]);
   }
}
