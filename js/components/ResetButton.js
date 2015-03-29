var React = require('react');
var extend = require('object-assign');
var buttonStyle = require('../styles/button');

var GameActions = require('../actions/GameActions');

module.exports = React.createClass({
   render() {
      const enabled = this.props.boardHistory.size > 1

      const styles = extend({
         cursor: enabled ? 'pointer' : 'default'
      }, buttonStyle);

      return enabled
         ? <button style={styles} onClick={GameActions.reset}>Reset</button>
         : <button style={styles} disabled>Reset</button>;
   }
});
