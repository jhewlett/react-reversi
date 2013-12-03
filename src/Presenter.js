var Reversi = Reversi || {};

Reversi.Presenter = function(game) {
    function present() {
        wireUpPassButton();
        wireUpMouseEvents();

        drawBoard();
    }

    function wireUpPassButton() {
        var passBtn = document.getElementById('pass-button');
        passBtn.onclick = function() {
            game.switchPlayer();
            updatePlayerLabels();
        };
    }

    function wireUpMouseEvents() {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                wireUpCell(i, j);
            }
        }
    }

    function wireUpCell(i, j) {
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
    }

    function drawBoard() {
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
                }
            }
        }

        updatePlayerLabels();
        updateScore();
    }

    function updatePlayerLabels() {
        var player1 = document.getElementById('player1-label');
        var player2 = document.getElementById('player2-label');

        if (game.getCurrentPlayer() === Reversi.Cell.Player1) {
            player2.style.fontWeight = "normal";
            player1.style.fontWeight = "bold";
        } else {
            player1.style.fontWeight = "normal";
            player2.style.fontWeight = "bold";
        }
    }

    function updateScore() {
        var scoreBoardPlayer1 = document.getElementById('player1-score');
        var scoreBoardPlayer2 = document.getElementById('player2-score');

        var player1Score = game.getScore(Reversi.Cell.Player1);
        var player2Score = game.getScore(Reversi.Cell.Player2);

        scoreBoardPlayer1.innerHTML = player1Score;
        scoreBoardPlayer2.innerHTML = player2Score;

        checkEndOfGame(player1Score, player2Score);
    }

    var checkEndOfGame = function(player1Score, player2Score) {
        if (player1Score === 0) {
            alert('Player 2 wins!');
        } else if (player2Score === 0) {
            alert('Player 1 wins!');
        } else if (player1Score + player2Score === 64) {
            if (player1Score === player2Score) {
                alert('Tie!');
            } else if (player1Score > player2Score) {
                alert('Player 1 wins!');
            } else {
                alert('Player 2 wins!');
            }
        }
    };

    return {
        present: present
    };
};