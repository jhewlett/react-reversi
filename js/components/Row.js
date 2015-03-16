var React = require('react');
var Cell = require('./Cell');

module.exports = React.createClass({
    render() {
        return (
            <tr>
                {[0,1,2,3,4,5,6,7].map(c =>
                    <Cell row={this.props.row} owner={this.props.board.getStatus(this.props.row, c)} board={this.props.board}
                        currentPlayer={this.props.currentPlayer} col={c} key={c} />
                )}
            </tr>
          );
      }
});
