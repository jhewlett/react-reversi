import React from 'react';

export default class Button {
   static propTypes = {
      children: React.PropTypes.string.isRequired,
      action: React.PropTypes.func.isRequired,
      disabled: React.PropTypes.bool.isRequired
   }
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
}
