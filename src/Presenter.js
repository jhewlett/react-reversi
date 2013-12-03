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
        var player1Score = document.getElementById('player1-score');
        var player2Score = document.getElementById('player2-score');

        player1Score.innerHTML = game.getScore(Reversi.Cell.Player1);
        player2Score.innerHTML = game.getScore(Reversi.Cell.Player2);
    }

    return {
        present: present
    };
};