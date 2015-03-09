import React from 'react'
import Row from './Row'

export default React.createClass({
    render() {
        const styles = {
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: '#EEEEEE',
            border: '1px solid black'
        };

        return (
            <table style={styles}>
                {[0,1,2,3,4,5,6,7].map(r =>
                    <Row row={r} board={this.props.board} currentPlayer={this.props.currentPlayer} onCellClicked={this.props.onCellClicked} key={r}/>
                )}
            </table>
        );
    }
});
