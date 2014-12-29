'use strict';

var Player = require('./Player');
var Board = require('./Board');
var EventEmitter = require('events').EventEmitter;

var events = new EventEmitter();

var getInitialState = function() {
    return {
        currentPlayer: Player.One,
        player1Score: 2,
        player2Score: 2,
        board: new Board(),
        winnerMessage: ''
    };
};

var state = getInitialState();

function updateScores() {
    state.player1Score = getScoreForPlayer(Player.One);
    state.player2Score = getScoreForPlayer(Player.Two);

    notifyChange();
}

function makeMove(row, col) {
    var result = state.board.makeMove(row, col, state.currentPlayer);

    if (result) {
        updateScores();

        var gameEnded = checkEndOfGame();

        if (!gameEnded) {
            switchPlayer();
        }
    }
}

function switchPlayer() {
    state.currentPlayer = (state.currentPlayer === Player.One
        ? Player.Two
        : Player.One);

    notifyChange();
}

function getScoreForPlayer(player) {
    var score = 0;

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (state.board.getStatus(i, j) === player) {
                score += 1;
            }
        }
    }

    return score;
}

function updateMessage(message) {
    state.winnerMessage = message;
    notifyChange();
}

function checkEndOfGame() {
    if (state.player1Score === 0) {
        updateMessage("Player 2 wins!");
    } else if (state.player2Score === 0) {
        updateMessage("Player 1 wins!");
    } else if (state.player1Score + state.player2Score === 64) {
        if (state.player1Score === state.player2Score) {
            updateMessage("Tie!");
        } else if (state.player1Score > state.player2Score) {
            updateMessage("Player 1 wins!");
        } else {
            updateMessage("Player 2 wins!");
        }
    } else {
        return false;
    }

    return true;
}

function reset() {
    state = getInitialState();

    notifyChange();
}

function addChangeListener(fn) {
    events.addListener('change', fn);
}

function notifyChange() {
    events.emit('change');
}

module.exports = {
    getState: function() { return state; },
    addChangeListener: addChangeListener,
    makeMove: makeMove,
    switchPlayer: switchPlayer,
    reset: reset
};