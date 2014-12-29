var React = require('React');

module.exports = React.createClass({
    render: function() {
        return <p id="winner-message">{this.props.message}</p>;
    }
});