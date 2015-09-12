import React from 'react';

export default function Button(props) {
  const styles = {
    cursor: props.disabled ? 'default' : 'pointer',
    width: 100,
    height: 40
  };

  return props.disabled
    ? <button style={styles} disabled>{props.children}</button>
    : <button style={styles} onClick={props.action}>{props.children}</button>;
}

Button.propTypes = {
  children: React.PropTypes.string.isRequired,
  action: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool.isRequired
};
