var React = require('react');
var GameActions = require('../actions/GameActions');

module.exports = React.createClass({
   render() {
      const styles = {
         cursor: this.props.disabled ? 'default' : 'pointer',
         width: 100,
         height: 40
      };

      return this.props.disabled
         ? <button style={styles} disabled>{this.props.children}</button>
         : <button style={styles} onClick={this.props.action}>{this.props.children}</button>;
   }
});
