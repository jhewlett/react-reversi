var React = require('React');
var extend = require('object-assign');
var buttonStyle = require('../styles/button');

module.exports = React.createClass({
    render: function() {
        var styles = extend({
            cursor: this.props.gameOver ? 'default' : 'pointer'
        }, buttonStyle);

        var passButton = this.props.gameOver
            ? <button style={styles} disabled>Pass</button>
            : <button style={styles} onClick={this.props.onPassClicked}>Pass</button>;

        return passButton;
    }
});