var React = require('react');

module.exports = React.createClass({
    render() {
        const styles = {
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 19,
            height: 22
        };

        return <p style={styles}>{this.props.message}</p>;
    }
});
