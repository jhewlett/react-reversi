var React = require('React');

module.exports = React.createClass({
    render: function() {
        var styles = {
            width: 100,
            height: 40,
            cursor: this.props.gameOver ? 'default' : 'pointer'
        };

        var passButton = this.props.gameOver
            ? <button style={styles} disabled>Pass</button>
            : <button style={styles} onClick={this.props.onPassClicked}>Pass</button>;

        return passButton;
    }
});