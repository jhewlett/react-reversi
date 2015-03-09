import React from 'react'
import Player from '../lib/Player'
import cellStyle from '../styles/cell'
import extend from 'object-assign'

export default React.createClass({
    getInitialState() {
        return { playerHint: Player.None };
    },
    handleClick() {
        this.props.onCellClicked(this.props.row, this.props.col);
    },
    handleMouseOver() {
        if (this.props.board.canMakeMove(this.props.row, this.props.col, this.props.currentPlayer)) {
            this.setState({playerHint: this.props.currentPlayer});
        }
    },
    handleMouseOut() {
        this.setState({ playerHint: Player.None });
    },
    render() {
        const styles = buildStyles(this.props.owner, this.state.playerHint);

        return <td style={styles} onClick={this.handleClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}></td>;
    }
});

function buildStyles(owner, playerHint) {
    const cellAppearance = (owner !== Player.None)
        ? owner
        : playerHint;

    return extend({
        border: '1px solid black'
    }, cellStyle(cellAppearance));
}
