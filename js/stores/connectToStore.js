import React from 'react';

export default function(Component, store, getStateFromStore) {
   return React.createClass({
      getInitialState() {
         return getStateFromStore(store);
      },
      componentDidMount() {
         this.unsubscribe = store.listen(this.onStateChange);
      },
      componentWillUnmount() {
         this.unsubscribe();
      },
      onStateChange(state) {
         this.setState(state);
      },
      render() {
         return <Component {...this.state} />
      }
   });
}
