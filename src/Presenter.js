var Reversi = Reversi || {};

Reversi.Presenter = function(game) {
    var _passButton = document.getElementById('pass-button');
    var _resetButton = document.getElementById('reset-button');

    var _player1Label = document.getElementById('player1-label');
    var _player2Label = document.getElementById('player2-label');

    var _player1ScoreHolder = document.getElementById('player1-score');
    var _player2ScoreHolder = document.getElementById('player2-score');

    var _winnerMessage = document.getElementById('winner-message');

    var present = function() {
        wireUpPassButton();
        wireUpResetButton();
        wireUpMouseEvents();

        radio('endOfTurn').subscribe(updateScore);
        radio('cellChanged').subscribe(drawCell);
        radio('endOfGame').subscribe(endOfGame);
        radio('switchedPlayers').subscribe(updatePlayerLabels);

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
            endOfTurn();
            _winnerMessage.style.visibility = "hidden";
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
                game.makeMove(iCopy, jCopy);
            };
        }(i, j));

        element.onmouseover = (function (iCopy, jCopy, elementCopy) {
            return function(){
                if (game.canMakeMove(iCopy, jCopy)) {
                    elementCopy.classList.add(game.getCurrentPlayer() === Reversi.Player.One
                        ? 'player1'
                        : 'player2');
                }
            };
        }(i, j, element));

        element.onmouseout = (function (iCopy, jCopy, elementCopy) {
            return function(){
                if (game.getStatus(iCopy, jCopy) === Reversi.Player.None) {
                    elementCopy.classList.remove('player1');
                    elementCopy.classList.remove('player2');
                }
            };
        }(i, j, element));
    };

    var drawBoard = function() {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                var status = game.getStatus(i, j);

                drawCell(i, j, status);
            }
        }
    };

    var drawCell = function(i, j, status) {
        var id = i.toString() + j.toString();
        var element = document.getElementById(id);

        if (status === Reversi.Player.One) {
            element.classList.remove('player2');
            element.classList.add('player1');
        } else if (status === Reversi.Player.Two) {
            element.classList.remove('player1');
            element.classList.add('player2');
        } else {
            element.classList.remove('player1');
            element.classList.remove('player2');
        }
    };

    var endOfTurn = function() {
        updateScore();
        updatePlayerLabels();
    };

    var updatePlayerLabels = function() {
        if (game.getCurrentPlayer() === Reversi.Player.One) {
            _player2Label.style.fontWeight = "normal";
            _player1Label.style.fontWeight = "bold";
        } else {
            _player1Label.style.fontWeight = "normal";
            _player2Label.style.fontWeight = "bold";
        }
    };

    var updateScore = function() {
        var score = game.getScore();

        _player1ScoreHolder.innerHTML = score.Player1;
        _player2ScoreHolder.innerHTML = score.Player2;
    };

    var endOfGame = function(message) {
        _winnerMessage.innerHTML = message;
        _winnerMessage.style.visibility = "visible";

        _passButton.disabled = true;
    };

    return {
        present: present
    };
};