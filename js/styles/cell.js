var Player = require('../lib/Player');

function getBackgroundImage(player) {
    if (player === Player.One) return 'url("img/red.png")';
    if (player === Player.Two) return 'url("img/blue.png")';

    return 'none';
}

module.exports = function(player) {
    return {
        backgroundImage: getBackgroundImage(player),
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '40',
        height: '40'
    };
};