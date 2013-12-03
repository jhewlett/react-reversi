var Reversi = Reversi || {};

Reversi.Presenter = function(game) {
    var _passButton = document.getElementById('pass-button');
    var _resetButton = document.getElementById('reset-button');

    var _player1Label = document.getElementById('player1-label');
    var _player2Label = document.getElementById('player2-label');

    var _player1ScoreHolder = document.getElementById('player1-score');
    var _player2ScoreHolder = document.getElementById('player2-score');

    var present = function() {
        wireUpPassButton();
        wireUpResetButton();
        wireUpMouseEvents();

        drawBoard();
    };

    var wireUpPassButton = function() {
        _passButton.onclick = function() {
            game.switchPlayer();
            updatePlayerLabels();
        };
    };

    var wireUpResetButton = function() {
        _resetButton.onclick = function() {
            game.reset();
            drawBoard();
            _passButton.disabled = false;
        };
    };

    var wireUpMouseEvents = function() {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                wireUpCell(i, j);
            }
        }
    };

    var wireUpCell = function(i, j) {
        var id = i.toString() + j.toString();
        var element = document.getElementById(id);

        element.onclick = (function (iCopy, jCopy) {
            return function(){
                if (game.makeMove(iCopy, jCopy)) {
                    drawBoard();
                }
            };
        }(i, j));

        element.onmouseover = (function (iCopy, jCopy, elementCopy) {
            return function(){
                if (game.canMakeMove(iCopy, jCopy)) {
                    elementCopy.classList.add(game.getCurrentPlayer() === Reversi.Cell.Player1
                        ? 'player1'
                        : 'player2');
                }
            };
        }(i, j, element));

        element.onmouseout = (function (iCopy, jCopy, elementCopy) {
            return function(){
                if (game.getStatus(iCopy, jCopy) === Reversi.Cell.Empty) {
                    elementCopy.classList.remove('player1');
                    elementCopy.classList.remove('player2');
                }
            };
        }(i, j, element));
    };

    var drawBoard = function() {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                var id = i.toString() + j.toString();
                var element = document.getElementById(id);

                var status = game.getStatus(i, j);

                if (status === Reversi.Cell.Player1) {
                    element.classList.remove('player2');
                    element.classList.add('player1');
                } else if (status === Reversi.Cell.Player2) {
                    element.classList.remove('player1');
                    element.classList.add('player2');
                } else {
                    element.classList.remove('player1');
                    element.classList.remove('player2');
                }
            }
        }

        updatePlayerLabels();
        updateScore();
    };

    var updatePlayerLabels = function() {
        if (game.getCurrentPlayer() === Reversi.Cell.Player1) {
            _player2Label.style.fontWeight = "normal";
            _player1Label.style.fontWeight = "bold";
        } else {
            _player1Label.style.fontWeight = "normal";
            _player2Label.style.fontWeight = "bold";
        }
    };

    var updateScore = function() {
        var player1Score = game.getScore(Reversi.Cell.Player1);
        var player2Score = game.getScore(Reversi.Cell.Player2);

        _player1ScoreHolder.innerHTML = player1Score;
        _player2ScoreHolder.innerHTML = player2Score;

        checkEndOfGame(player1Score, player2Score);
    };

    var checkEndOfGame = function(player1Score, player2Score) {
        if (player1Score === 0) {
            endGame('Player 2 wins!');
        } else if (player2Score === 0) {
            endGame('Player 1 wins!');
        } else if (player1Score + player2Score === 64) {
            if (player1Score === player2Score) {
                endGame('Tie!');
            } else if (player1Score > player2Score) {
                endGame('Player 1 wins!');
            } else {
                endGame('Player 2 wins!');
            }
        }
    };

    var endGame = function(message) {
        alert(message);

        var passButton = document.getElementById('pass-button');
        passButton.disabled = true;
    };

    return {
        present: present
    };
};