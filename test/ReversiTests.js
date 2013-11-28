module("Reversi tests");

test("toggle switches the selected and anything all inbetween", function() {
    var reversi = new Game.Reversi();

    reversi.toggle(2, 3, Game.BLACK);

    assertEquals(Game.BLACK, reversi.getStatus(2, 3));
    //assertEquals(Game.BLACK, reversi.getStatus(2, 3));
});

test("toggle test 2", function() {
    var reversi = new Game.Reversi();

    reversi.toggle(4, 2, Game.WHITE);

    assertEquals(Game.WHITE, reversi.getStatus(4, 2));
    //assertEquals(Game.WHITE, reversi.getStatus(4, 3));
});

test("toggling a cell that does not border another of the opposite color does nothing", function() {
    var reversi = new Game.Reversi();

    reversi.toggle(2, 3, Game.WHITE);

    assertEquals(Game.EMPTY, reversi.getStatus(2, 3));
});

test("Cannot toggle an occupied cell", function() {
    var reversi = new Game.Reversi();

    reversi.toggle(2, 3, Game.BLACK);
    reversi.toggle(2, 3, Game.WHITE);

    assertEquals(Game.BLACK, reversi.getStatus(2, 3));
});

test("four squares are set at beginning of game", function() {
    var reversi = new Game.Reversi();

    assertEquals(Game.WHITE, reversi.getStatus(3, 3));
    assertEquals(Game.WHITE, reversi.getStatus(4, 4));

    assertEquals(Game.BLACK, reversi.getStatus(3, 4));
    assertEquals(Game.BLACK, reversi.getStatus(4, 3));

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if ((i < 3 || i > 4) && (j < 3 || j > 4)) {
                assertEquals(Game.EMPTY, reversi.getStatus(i, j))
            }
        }
    }
});