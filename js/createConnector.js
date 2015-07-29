import React from 'react';

export default function createConnector(stateTree) {
  return function connect(selector) {
    return function decorateSource(WrappedComponent) {
      return class Wrapper extends React.Component {
        componentWillMount() {
          stateTree.subscribe(state => {
            this.setState(selector(state));
          });
        }
        render() {
          return <WrappedComponent {...this.props} {...this.state} />
        }
      }
    }
  }
}
