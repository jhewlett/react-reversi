import React from 'react';

export default function(Component, store, getStateFromStore) {
   return React.createClass({
      getInitialState() {
         return getStateFromStore(store);
      },
      componentDidMount() {
         store.subscribe(this.onStateChange);
      },
      componentWillUnmount() {
         store.unsubscribe(this.onStateChange);
      },
      onStateChange(state) {
         this.setState(state);
      },
      render() {
         return <Component {...this.state} />
      }
   });
}
