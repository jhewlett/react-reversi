module("Game");

test("makeMove captures the cells and fires 'endOfTurn' event", function() {
    var game = new Reversi.Game();

    var fired = false;
    radio('endOfTurn').subscribe(function() {
        fired = true;
    });

    game.makeMove(2, 3);

    assertEquals(Reversi.Cell.Player1, game.getStatus(2, 3));
    assertEquals(Reversi.Cell.Player1, game.getStatus(3, 3));
    assertEquals(Reversi.Cell.Player1, game.getStatus(4, 3));

    var score = game.getScore();

    assertEquals(4, score.Player1)
    assertEquals(1, score.Player2)

    assertTrue(fired);
});

test("makeMove with invalid move does not fire any events or switch players", function() {
    var game = new Reversi.Game();

    var firedEndOfTurn = false;
    radio('endOfTurn').subscribe(function() {
        firedEndOfTurn = true;
    });

    var switchedPlayers = false;
    radio('switchedPlayers').subscribe(function() {
        switchedPlayers = true;
    });

    game.makeMove(2, 4);

    assertEquals(Reversi.Cell.Empty, game.getStatus(2, 4));

    var score = game.getScore();

    assertEquals(2, score.Player1)
    assertEquals(2, score.Player2)

    assertFalse(firedEndOfTurn);
    assertFalse(switchedPlayers);
});

test("getScore", function() {
    var game = new Reversi.Game();

    game.makeMove(2, 3);

    var score = game.getScore();

    assertEquals(4, score.Player1)
    assertEquals(1, score.Player2)
});

test("checkEndOfGame fires 'endOfGame' event", function() {
    var game = new Reversi.Game();

    var winMessage = "";
    radio('endOfGame').subscribe(function(message) {
        winMessage = message;
    });

    var turnCount = 0;
    radio('endOfTurn').subscribe(function() {
        turnCount++;
    });

    var playerSwitchCount = 0;
    radio('switchedPlayers').subscribe(function() {
        playerSwitchCount++;
    });

    game.makeMove(2, 3);
    game.switchPlayer();
    game.makeMove(4, 5);

    assertEquals("Player 1 wins!", winMessage);
    assertEquals(2, turnCount);
    assertEquals(2, playerSwitchCount);
});

//detect when no moves available?