var Board = require('../js/lib/Board');
var Player = require('../js/lib/Player');

describe('Board', function() {
    var board;

    beforeEach(function() {
        board = new Board();
    });

    it('should initialize the board', function() {
        expect(board.getStatus(3, 4)).toEqual(Player.One);
        expect(board.getStatus(4, 3)).toEqual(Player.One);

        expect(board.getStatus(3, 3)).toEqual(Player.Two);
        expect(board.getStatus(4, 4)).toEqual(Player.Two);

        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if ((i < 3 || i > 4) && (j < 3 || j > 4)) {
                    expect(board.getStatus(i, j)).toEqual(Player.None);
                }
            }
        }
    });

    describe('canMakeMove', function() {
        it('should return true for valid move', function() {
            expect(board.canMakeMove(2, 3, Player.One)).toEqual(true);
        });

        it('should return false for invalid move', function() {
            expect(board.canMakeMove(2, 3, Player.Two)).toEqual(false);
        });
    });

    describe('makeMove', function() {
        describe('valid position with right player', function() {
            var result;
            beforeEach(function() {
                result = board.makeMove(2, 3, Player.One);
            });

            it('should toggle the selected cell', function() {
                expect(board.getStatus(2, 3)).toEqual(Player.One);
            });

            it('should toggle the cells in between', function() {
                expect(board.getStatus(3, 3)).toEqual(Player.One);
            });

            it('should return true', function() {
                expect(result).toEqual(true);
            });
        });

        describe('valid position with wrong player', function() {
            var result;
            beforeEach(function() {
                result = board.makeMove(2, 3, Player.Two);
            });

            it('should NOT toggle the selected cell', function() {
                expect(board.getStatus(2, 3)).toEqual(Player.None);
            });

            it('should return false', function() {
                expect(result).toEqual(false);
            });
        });

        describe('toggling a cell that does not surround a row', function() {
            var result;
            beforeEach(function() {
                board.setCell(1, 1, Player.One);

                result = board.makeMove(2, 1, Player.Two)
            });

            it('should NOT toggle the selected cell', function() {
                expect(board.getStatus(2, 1)).toEqual(Player.None);
            });

            it('should return false', function() {
                expect(result).toEqual(false);
            });
        });

        describe('toggling a cell with an empty space on the end', function() {
            var result;
            beforeEach(function() {
                board.setCell(0, 0, Player.One);
                board.setCell(0, 2, Player.Two);
                board.setCell(0, 3, Player.Two);

                result = board.makeMove(0, 4, Player.One);
            });

            it('should return false', function() {
                expect(result).toEqual(false);
            });

            it('should NOT toggle any cells', function() {
                expect(board.getStatus(0, 1)).toEqual(Player.None);
                expect(board.getStatus(0, 2)).toEqual(Player.Two);
                expect(board.getStatus(0, 3)).toEqual(Player.Two);
                expect(board.getStatus(0, 4)).toEqual(Player.None);
            });
        });

        describe('can capture in all directions in one turn', function() {
            var result;
            beforeEach(function() {
                board.setCell(0, 0, Player.One);
                board.setCell(0, 2, Player.One);
                board.setCell(0, 4, Player.One);
                board.setCell(4, 0, Player.One);
                board.setCell(4, 4, Player.One);

                board.setCell(1, 1, Player.Two);
                board.setCell(3, 3, Player.Two);
                board.setCell(3, 1, Player.Two);
                board.setCell(1, 3, Player.Two);

                board.setCell(1, 2, Player.Two);
                board.setCell(2, 0, Player.One);
                board.setCell(2, 1, Player.Two);
                board.setCell(2, 3, Player.Two);
                board.setCell(2, 4, Player.One);
                board.setCell(3, 2, Player.Two);
                board.setCell(4, 2, Player.One);

                result = board.makeMove(2, 2, Player.One);
            });

            it('should return true', function() {
                expect(result).toEqual(true);
            });

            it('should capture all the correct cells', function() {
                expect(board.getStatus(1, 2)).toEqual(Player.One);
                expect(board.getStatus(2, 1)).toEqual(Player.One);
                expect(board.getStatus(2, 3)).toEqual(Player.One);
                expect(board.getStatus(3, 2)).toEqual(Player.One);
                expect(board.getStatus(1, 1)).toEqual(Player.One);
                expect(board.getStatus(3, 1)).toEqual(Player.One);
                expect(board.getStatus(1, 3)).toEqual(Player.One);
                expect(board.getStatus(3, 3)).toEqual(Player.One);
                expect(board.getStatus(2, 2)).toEqual(Player.One);
            });
        });

        describe('When trying to toggle an occupied cell', function() {
            var result;
            beforeEach(function() {
                board.setCell(2, 3, Player.One);

                result = board.makeMove(2, 3, Player.Two);
            });

            it('should not toggle the cell', function() {
                expect(result).toEqual(false);
                expect(board.getStatus(2, 3)).toEqual(Player.One);
            });
        });
    });
});