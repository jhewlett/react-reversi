var React = require('react');
var Cell = require('./Cell');
var Board = require('../lib/Board.js');

module.exports = React.createClass({
    render() {
        return (
            <tr>
                {[0,1,2,3,4,5,6,7].map(c =>
                    <Cell row={this.props.row} owner={Board.getStatus(this.props.board, this.props.row, c)} playerHint={this.props.playerHint}
                        currentPlayer={this.props.currentPlayer} col={c} key={c} />
                )}
            </tr>
          );
      }
});
