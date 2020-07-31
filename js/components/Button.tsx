import * as React from 'react'

type ButtonProps = {
  children: React.ReactChild
  action: () => void
  disabled: boolean
}

export default function Button(props: ButtonProps) {
  const styles = {
    cursor: props.disabled ? 'default' : 'pointer',
    width: 100,
    height: 40
  }

  return props.disabled ? (
    <button style={styles} disabled>
      {props.children}
    </button>
  ) : (
    <button style={styles} onClick={props.action}>
      {props.children}
    </button>
  )
}
