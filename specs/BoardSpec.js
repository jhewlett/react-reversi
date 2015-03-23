var Board =  require('../js/lib/Board');
var getStatus = Board.getStatus;
var canMakeMove = Board.canMakeMove;
var makeMove = Board.makeMove;
var setCell = Board.setCell;

var Player = require('../js/lib/Player');
var board = require('../js/lib/newGameBoard');

describe('Board', function() {
    it('should initialize the board', function() {
        expect(getStatus(board, 3, 4)).toEqual(Player.One);
        expect(getStatus(board, 4, 3)).toEqual(Player.One);

        expect(getStatus(board, 3, 3)).toEqual(Player.Two);
        expect(getStatus(board, 4, 4)).toEqual(Player.Two);

        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if ((i < 3 || i > 4) && (j < 3 || j > 4)) {
                    expect(getStatus(board, i, j)).toEqual(Player.None);
                }
            }
        }
    });

    describe('canMakeMove', function() {
        it('should return true for valid move', function() {
            expect(canMakeMove(board, 2, 3, Player.One)).toEqual(true);
        });

        it('should return false for invalid move', function() {
            expect(canMakeMove(board, 2, 3, Player.Two)).toEqual(false);
        });
    });

    describe('makeMove', function() {
        describe('valid position with right player', function() {
            var result;
            beforeEach(function() {
                result = makeMove(board, 2, 3, Player.One);
            });

            it('should toggle the selected cell', function() {
                expect(getStatus(result.board, 2, 3)).toEqual(Player.One);
            });

            it('should toggle the cells in between', function() {
                expect(getStatus(result.board, 3, 3)).toEqual(Player.One);
            });

            it('should return true', function() {
                expect(result.success).toEqual(true);
            });
        });

        describe('valid position with wrong player', function() {
            var result;
            beforeEach(function() {
                result = makeMove(board, 2, 3, Player.Two);
            });

            it('should NOT toggle the selected cell', function() {
                expect(getStatus(result.board, 2, 3)).toEqual(Player.None);
            });

            it('should return false', function() {
                expect(result.success).toEqual(false);
            });
        });

        describe('toggling a cell that does not surround a row', function() {
            var result;
            beforeEach(function() {
                var board2 = setCell(board, 1, 1, Player.One);

                result = makeMove(board2, 2, 1, Player.Two)
            });

            it('should NOT toggle the selected cell', function() {
                expect(getStatus(result.board, 2, 1)).toEqual(Player.None);
            });

            it('should return false', function() {
                expect(result.success).toEqual(false);
            });
        });

        describe('toggling a cell with an empty space on the end', function() {
            var result;
            beforeEach(function() {
                var board2 = setCell(board, 0, 0, Player.One);
                board2 = setCell(board2, 0, 2, Player.Two);
                board2 = setCell(board2, 0, 3, Player.Two);

                result = makeMove(board2, 0, 4, Player.One);
            });

            it('should return false', function() {
                expect(result.success).toEqual(false);
            });

            it('should NOT toggle any cells', function() {
                expect(getStatus(result.board, 0, 1)).toEqual(Player.None);
                expect(getStatus(result.board, 0, 2)).toEqual(Player.Two);
                expect(getStatus(result.board, 0, 3)).toEqual(Player.Two);
                expect(getStatus(result.board, 0, 4)).toEqual(Player.None);
            });
        });

        describe('can capture in all directions in one turn', function() {
            var result;
            beforeEach(function() {
                var board2 = setCell(board, 0, 0, Player.One);
                board2 = setCell(board2, 0, 2, Player.One);
                board2 = setCell(board2, 0, 4, Player.One);
                board2 = setCell(board2, 4, 0, Player.One);
                board2 = setCell(board2, 4, 4, Player.One);

                board2 = setCell(board2, 1, 1, Player.Two);
                board2 = setCell(board2, 3, 3, Player.Two);
                board2 = setCell(board2, 3, 1, Player.Two);
                board2 = setCell(board2, 1, 3, Player.Two);

                board2 = setCell(board2, 1, 2, Player.Two);
                board2 = setCell(board2, 2, 0, Player.One);
                board2 = setCell(board2, 2, 1, Player.Two);
                board2 = setCell(board2, 2, 3, Player.Two);
                board2 = setCell(board2, 2, 4, Player.One);
                board2 = setCell(board2, 3, 2, Player.Two);
                board2 = setCell(board2, 4, 2, Player.One);

                result = makeMove(board2, 2, 2, Player.One);
            });

            it('should return true', function() {
                expect(result.success).toEqual(true);
            });

            it('should capture all the correct cells', function() {
                expect(getStatus(result.board, 1, 2)).toEqual(Player.One);
                expect(getStatus(result.board, 2, 1)).toEqual(Player.One);
                expect(getStatus(result.board, 2, 3)).toEqual(Player.One);
                expect(getStatus(result.board, 3, 2)).toEqual(Player.One);
                expect(getStatus(result.board, 1, 1)).toEqual(Player.One);
                expect(getStatus(result.board, 3, 1)).toEqual(Player.One);
                expect(getStatus(result.board, 1, 3)).toEqual(Player.One);
                expect(getStatus(result.board, 3, 3)).toEqual(Player.One);
                expect(getStatus(result.board, 2, 2)).toEqual(Player.One);
            });
        });

        describe('When trying to toggle an occupied cell', function() {
            var result;
            beforeEach(function() {
                var board2 = setCell(board, 2, 3, Player.One);

                result = makeMove(board2, 2, 3, Player.Two);
            });

            it('should not toggle the cell', function() {
                expect(result.success).toEqual(false);
                expect(getStatus(result.board, 2, 3)).toEqual(Player.One);
            });
        });
    });
});
