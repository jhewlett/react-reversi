var React = require('React');
var Player = require('../Player');

module.exports = React.createClass({
    displayName: "Cell",
    getInitialState: function() {
        return {playerHint: Player.None};
    },
    handleClick: function() {
        this.props.onCellClicked(this.props.row, this.props.col);
    },
    handleMouseOver: function() {
        if (this.props.board.canMakeMove(this.props.row, this.props.col, this.props.currentPlayer)) {
            this.setState({playerHint: this.props.currentPlayer});
        }
    },
    handleMouseOut: function() {
        this.setState({playerHint: Player.None});
    },
    getBackgroundImage: function() {
        if (this.props.owner === Player.One || this.state.playerHint === Player.One) {
            return 'url("red.png")';
        } else if (this.props.owner === Player.Two || this.state.playerHint === Player.Two) {
            return 'url("blue.png")';
        }

        return 'none';
    },
    render: function() {
        var styles = {
            backgroundImage: this.getBackgroundImage(),
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        };

        return <td style={styles} onClick={this.handleClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}></td>;
    }
});