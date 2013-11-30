module("Board tests");

test("toggle switches the selected and anything inbetween", function() {
    var board = new Reversi.Board();

    board.toggle(2, 3, Reversi.Player1);

    assertEquals(Reversi.Player1, board.getStatus(2, 3));
    assertEquals(Reversi.Player1, board.getStatus(3, 3));
});

test("toggling a cell that does not border another of the opposite color does nothing", function() {
    var board = new Reversi.Board();

    board.toggle(2, 3, Reversi.Player2);

    assertEquals(Reversi.Empty, board.getStatus(2, 3));
});

test("toggling a cell that does not surround a row does nothing", function() {
    var board = new Reversi.Board();

    board.set(1, 1, Reversi.Player1);

    //act
    board.toggle(2, 1, Reversi.Player2);

    assertEquals(Reversi.Empty, board.getStatus(2, 1));
});

test("can capture in all directions in one turn", function() {
    var board = new Reversi.Board();

    board.set(0, 0, Reversi.Player1);
    board.set(0, 2, Reversi.Player1);
    board.set(0, 4, Reversi.Player1);
    board.set(4, 0, Reversi.Player1);
    board.set(4, 4, Reversi.Player1);

    board.set(1, 1, Reversi.Player2);
    board.set(3, 3, Reversi.Player2);
    board.set(3, 1, Reversi.Player2);
    board.set(1, 3, Reversi.Player2);

    board.set(1, 2, Reversi.Player2);
    board.set(2, 0, Reversi.Player1);
    board.set(2, 1, Reversi.Player2);
    board.set(2, 3, Reversi.Player2);
    board.set(2, 4, Reversi.Player1);
    board.set(3, 2, Reversi.Player2);
    board.set(4, 2, Reversi.Player1);

    board.toggle(2, 2, Reversi.Player1);

    assertEquals(Reversi.Player1, board.getStatus(1, 2));
    assertEquals(Reversi.Player1, board.getStatus(2, 1));
    assertEquals(Reversi.Player1, board.getStatus(2, 3));
    assertEquals(Reversi.Player1, board.getStatus(3, 2));

    assertEquals(Reversi.Player1, board.getStatus(1, 1));
    assertEquals(Reversi.Player1, board.getStatus(3, 1));
    assertEquals(Reversi.Player1, board.getStatus(1, 3));
    assertEquals(Reversi.Player1, board.getStatus(3, 3));

    assertEquals(Reversi.Player1, board.getStatus(2, 2));
});

test("Cannot toggle an occupied cell", function() {
    var board = new Reversi.Board();

    board.toggle(2, 3, Reversi.Player1);
    board.toggle(2, 3, Reversi.Player2);

    assertEquals(Reversi.Player1, board.getStatus(2, 3));
});

test("four squares are set at beginning of game, the rest are empty", function() {
    var board = new Reversi.Board();

    assertEquals(Reversi.Player2, board.getStatus(3, 3));
    assertEquals(Reversi.Player2, board.getStatus(4, 4));

    assertEquals(Reversi.Player1, board.getStatus(3, 4));
    assertEquals(Reversi.Player1, board.getStatus(4, 3));

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if ((i < 3 || i > 4) && (j < 3 || j > 4)) {
                assertEquals(Reversi.Empty, board.getStatus(i, j))
            }
        }
    }
});

//have a move that switches players
//detect when no moves available (or have option to pass)
//detect when game over