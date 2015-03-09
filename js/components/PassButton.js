import React from 'react'
import extend from 'object-assign'
import buttonStyle from '../styles/button'

export default React.createClass({
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
