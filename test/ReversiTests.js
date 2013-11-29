module("Board tests");

test("toggle switches the selected and anything inbetween", function() {
    var board = new Reversi.Board();

    board.toggle(2, 3, Reversi.BLACK);

    assertEquals(Reversi.BLACK, board.getStatus(2, 3));
    assertEquals(Reversi.BLACK, board.getStatus(3, 3));
});

test("toggling a cell that does not border another of the opposite color does nothing", function() {
    var board = new Reversi.Board();

    board.toggle(2, 3, Reversi.WHITE);

    assertEquals(Reversi.EMPTY, board.getStatus(2, 3));
});

test("toggling a cell that does not surround a row does nothing - below", function() {
    var board = new Reversi.Board();

    board.toggle(3, 2, Reversi.BLACK);
    board.toggle(2, 2, Reversi.WHITE);

    assertEquals(Reversi.EMPTY, board.getStatus(2, 2));
});

test("toggling a cell that does not surround a row does nothing - above", function() {
    var board = new Reversi.Board();

    board.toggle(4, 2, Reversi.WHITE);
    board.toggle(5, 2, Reversi.BLACK);

    assertEquals(Reversi.EMPTY, board.getStatus(5, 2));
});

test("toggling a cell that does not surround a row does nothing - left", function() {
    var board = new Reversi.Board();

    board.toggle(2, 4, Reversi.WHITE);
    board.toggle(2, 5, Reversi.BLACK);

    assertEquals(Reversi.EMPTY, board.getStatus(2, 5));
});

test("toggling a cell that does not surround a row does nothing - right", function() {
    var board = new Reversi.Board();

    board.toggle(2, 3, Reversi.BLACK);
    board.toggle(3, 2, Reversi.WHITE);

    assertEquals(Reversi.EMPTY, board.getStatus(3, 2));
});

test("can capture in all directions in one turn", function() {
    var board = new Reversi.Board();

    board.set(0, 2, Reversi.BLACK);
    board.set(1, 2, Reversi.WHITE);
    board.set(2, 0, Reversi.BLACK);
    board.set(2, 1, Reversi.WHITE);
    board.set(2, 3, Reversi.WHITE);
    board.set(2, 4, Reversi.BLACK);
    board.set(3, 2, Reversi.WHITE);
    board.set(4, 2, Reversi.BLACK);

    board.toggle(2, 2, Reversi.BLACK);

    assertEquals(Reversi.BLACK, board.getStatus(1, 2));
    assertEquals(Reversi.BLACK, board.getStatus(2, 1));
    assertEquals(Reversi.BLACK, board.getStatus(2, 3));
    assertEquals(Reversi.BLACK, board.getStatus(3, 2));

    assertEquals(Reversi.BLACK, board.getStatus(2, 2));
});

test("Cannot toggle an occupied cell", function() {
    var board = new Reversi.Board();

    board.toggle(2, 3, Reversi.BLACK);
    board.toggle(2, 3, Reversi.WHITE);

    assertEquals(Reversi.BLACK, board.getStatus(2, 3));
});

test("four squares are set at beginning of game, the rest are empty", function() {
    var board = new Reversi.Board();

    assertEquals(Reversi.WHITE, board.getStatus(3, 3));
    assertEquals(Reversi.WHITE, board.getStatus(4, 4));

    assertEquals(Reversi.BLACK, board.getStatus(3, 4));
    assertEquals(Reversi.BLACK, board.getStatus(4, 3));

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if ((i < 3 || i > 4) && (j < 3 || j > 4)) {
                assertEquals(Reversi.EMPTY, board.getStatus(i, j))
            }
        }
    }
});

//diaganol moves
//have a move that switches players
//detect when no moves available (or have option to pass)
//detect when game over