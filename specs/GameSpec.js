var Game = require('../js/lib/Game');
var sinon = require('sinon');
var Player = require('../js/lib/Player');

describe('Game', function() {
    it('should initialize the state', function() {
        var state = Game.getState();

        expect(state.currentPlayer).toEqual(Player.One);
        expect(state.player1Score).toEqual(2);
        expect(state.player2Score).toEqual(2);
        expect(state.winnerMessage).toEqual('');
    });

    describe('makeMove', function() {
        describe('invalid move', function() {
            beforeEach(function() {
                Game.makeMove(2, 4);
            });

            it('should NOT update the player scores', function() {
                var state = Game.getState();

                expect(state.player1Score).toEqual(2);
                expect(state.player2Score).toEqual(2);
            });

            it('should switch players', function() {
                expect(Game.getState().currentPlayer).toEqual(Player.One);
            });
        });

        describe('valid move', function() {
            beforeEach(function() {
                Game.makeMove(2, 3);
            });

            it('should update the player scores', function() {
                var state = Game.getState();

                expect(state.player1Score).toEqual(4);
                expect(state.player2Score).toEqual(1);
            });

            it('should switch players', function() {
                expect(Game.getState().currentPlayer).toEqual(Player.Two);
            });
        });
    });

    describe('switchPlayer', function() {
        beforeEach(function() {
            Game.reset();
            Game.switchPlayer();
        });

        it('should switch the player', function() {
            expect(Game.getState().currentPlayer).toEqual(Player.Two);
        });
    });

    describe('end of game', function() {
        beforeEach(function() {
            Game.reset();
            Game.makeMove(2, 3);
            Game.switchPlayer();
            Game.makeMove(4, 5);
        });

        it('should NOT switch players', function() {
            expect(Game.getState().currentPlayer).toEqual(Player.One);
        });

        it('should set winner message', function() {
            expect(Game.getState().winnerMessage).toEqual('Player 1 wins!');
        });
    });
});