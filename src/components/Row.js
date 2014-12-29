var React = require('React');
var Cell = require('./Cell');

module.exports = React.createClass({
    render: function() {
        var cells = [0,1,2,3,4,5,6,7].map(c =>
            <Cell row={this.props.row} owner={this.props.board.getStatus(this.props.row, c)} board={this.props.board} currentPlayer={this.props.currentPlayer} col={c} onCellClicked={this.props.onCellClicked} key={c} />
        );

        return <tr>{cells}</tr>
    }
});