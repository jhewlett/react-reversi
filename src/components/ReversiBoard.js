var React = require('React');
var Row = require('./Row');

var ReversiBoard = module.exports = React.createClass({
    displayName: "ReversiBoard",
    render: function() {
        return <table id="board">
            {[0,1,2,3,4,5,6,7].map(
                r => <Row row={r} board={this.props.board} currentPlayer={this.props.currentPlayer} onCellClicked={this.props.onCellClicked} key={r}/>
            )}
        </table>;
    }
});