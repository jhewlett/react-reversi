var React = require('react');
var extend = require('object-assign');
var buttonStyle = require('../styles/button');

module.exports = React.createClass({
    render() {
        const styles = extend({
            cursor: this.props.gameOver ? 'default' : 'pointer'
        }, buttonStyle);

        const passButton = this.props.gameOver
            ? <button style={styles} disabled>Pass</button>
            : <button style={styles} onClick={this.props.onPassClicked}>Pass</button>;

        return passButton;
    }
});
