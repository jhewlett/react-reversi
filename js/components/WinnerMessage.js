'use strict';

var React = require('React');

module.exports = React.createClass({
    render: function() {
        var styles = {
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 19,
            height: 22
        };

        return <p style={styles}>{this.props.message}</p>;
    }
});