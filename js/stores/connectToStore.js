import React from 'react';
import fluce from '../fluce';

export default function(Component, storeName) {
   return React.createClass({
      getInitialState() {
         return fluce.stores[storeName];
      },
      componentDidMount() {
         this.unsubscribe = fluce.subscribe([storeName], this.onStateChange);
      },
      componentWillUnmount() {
         this.unsubscribe();
      },
      onStateChange() {
         this.setState(fluce.stores[storeName]);
      },
      render() {
         return <Component {...this.state} />
      }
   });
}
