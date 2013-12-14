module("Board tests");

test("makeMove switches the selected cells and anything in between", function() {
    var board = new Reversi.Board();

    var cellChangeCalls = [];
    radio('cellChanged').subscribe(function(i, j, color) {
        cellChangeCalls.push([i, j, color]);
    });

    var result = board.canMakeMove(2, 3, Reversi.Cell.Player1);
    board.makeMove(2, 3, Reversi.Cell.Player1);

    assertTrue(result);
    assertEquals(Reversi.Cell.Player1, board.getStatus(2, 3));
    assertEquals(Reversi.Cell.Player1, board.getStatus(3, 3));

    assertEquals(2, cellChangeCalls.length);

    assertEquals(2, cellChangeCalls[0][0]);
    assertEquals(3, cellChangeCalls[0][1]);
    assertEquals(Reversi.Cell.Player1, cellChangeCalls[0][2]);

    assertEquals(3, cellChangeCalls[1][0]);
    assertEquals(3, cellChangeCalls[1][1]);
    assertEquals(Reversi.Cell.Player1, cellChangeCalls[1][2]);
});

test("toggling a cell that does not border another of the opposite color does nothing", function() {
    var board = new Reversi.Board();

    var fired = false;
    radio('cellChanged').subscribe(function() {
        fired = true;
    });

    var result = board.canMakeMove(2, 3, Reversi.Cell.Player2);
    board.makeMove(2, 3, Reversi.Cell.Player2);

    assertFalse(result);
    assertFalse(fired);
    assertEquals(Reversi.Cell.Empty, board.getStatus(2, 3));
});

test("toggling a cell that does not surround a row does nothing", function() {
    var board = new Reversi.Board();

    board.setCell(1, 1, Reversi.Cell.Player1);

    //act
    var result = board.canMakeMove(2, 1, Reversi.Cell.Player2);
    board.makeMove(2, 1, Reversi.Cell.Player2);

    assertFalse(result);
    assertEquals(Reversi.Cell.Empty, board.getStatus(2, 1));
});

test("toggling a cell with an empty space on the end does nothing", function() {
    var board = new Reversi.Board();

    board.setCell(0, 0, Reversi.Cell.Player1);
    board.setCell(0, 2, Reversi.Cell.Player2);
    board.setCell(0, 3, Reversi.Cell.Player2);

    //act
    var result = board.canMakeMove(0, 4, Reversi.Cell.Player1);
    board.makeMove(0, 4, Reversi.Cell.Player1);

    assertFalse(result);
    assertEquals(Reversi.Cell.Empty, board.getStatus(0, 1));
    assertEquals(Reversi.Cell.Player2, board.getStatus(0, 2));
    assertEquals(Reversi.Cell.Player2, board.getStatus(0, 3));
    assertEquals(Reversi.Cell.Empty, board.getStatus(0, 4));
});

test("can capture in all directions in one turn", function() {
    var board = new Reversi.Board();

    board.setCell(0, 0, Reversi.Cell.Player1);
    board.setCell(0, 2, Reversi.Cell.Player1);
    board.setCell(0, 4, Reversi.Cell.Player1);
    board.setCell(4, 0, Reversi.Cell.Player1);
    board.setCell(4, 4, Reversi.Cell.Player1);

    board.setCell(1, 1, Reversi.Cell.Player2);
    board.setCell(3, 3, Reversi.Cell.Player2);
    board.setCell(3, 1, Reversi.Cell.Player2);
    board.setCell(1, 3, Reversi.Cell.Player2);

    board.setCell(1, 2, Reversi.Cell.Player2);
    board.setCell(2, 0, Reversi.Cell.Player1);
    board.setCell(2, 1, Reversi.Cell.Player2);
    board.setCell(2, 3, Reversi.Cell.Player2);
    board.setCell(2, 4, Reversi.Cell.Player1);
    board.setCell(3, 2, Reversi.Cell.Player2);
    board.setCell(4, 2, Reversi.Cell.Player1);

    var result = board.canMakeMove(2, 2, Reversi.Cell.Player1);
    board.makeMove(2, 2, Reversi.Cell.Player1);

    assertTrue(result);

    assertEquals(Reversi.Cell.Player1, board.getStatus(1, 2));
    assertEquals(Reversi.Cell.Player1, board.getStatus(2, 1));
    assertEquals(Reversi.Cell.Player1, board.getStatus(2, 3));
    assertEquals(Reversi.Cell.Player1, board.getStatus(3, 2));

    assertEquals(Reversi.Cell.Player1, board.getStatus(1, 1));
    assertEquals(Reversi.Cell.Player1, board.getStatus(3, 1));
    assertEquals(Reversi.Cell.Player1, board.getStatus(1, 3));
    assertEquals(Reversi.Cell.Player1, board.getStatus(3, 3));

    assertEquals(Reversi.Cell.Player1, board.getStatus(2, 2));
});

test("Cannot toggle an occupied cell", function() {
    var board = new Reversi.Board();

    board.setCell(2, 3, Reversi.Cell.Player1);

    //act
    var result = board.canMakeMove(2, 3, Reversi.Cell.Player2);
    board.makeMove(2, 3, Reversi.Cell.Player2);

    assertFalse(result);
    assertEquals(Reversi.Cell.Player1, board.getStatus(2, 3));
});

test("four squares are set at beginning of game, the rest are empty", function() {
    var board = new Reversi.Board();

    assertEquals(Reversi.Cell.Player1, board.getStatus(3, 4));
    assertEquals(Reversi.Cell.Player1, board.getStatus(4, 3));

    assertEquals(Reversi.Cell.Player2, board.getStatus(3, 3));
    assertEquals(Reversi.Cell.Player2, board.getStatus(4, 4));

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if ((i < 3 || i > 4) && (j < 3 || j > 4)) {
                assertEquals(Reversi.Cell.Empty, board.getStatus(i, j))
            }
        }
    }
});