var React = require('React');

module.exports = React.createClass({
    render: function() {
        var styles = {
            textAlign: 'center',
            fontSize: '14pt',
            fontWeight: 'bold',
            height: 22
        };

        return <p style={styles}>{this.props.message}</p>;
    }
});