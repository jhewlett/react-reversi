import fluce from '../fluce';

export function switchPlayer() {
   fluce.dispatch('switchPlayer', {});
}

export function makeMove(row, col) {
   fluce.dispatch('makeMove', { row, col });
}

export function checkOverlayHint(row, col) {
   fluce.dispatch('checkOverlayHint', { row, col });
}

export function removeHint(row, col) {
   fluce.dispatch('removeHint', { row, col });
}

export function undo() {
   fluce.dispatch('undo', {});
}

export function reset() {
   fluce.dispatch('reset', {});
}
