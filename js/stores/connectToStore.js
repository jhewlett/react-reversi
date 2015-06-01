import React from 'react';
import fluce from '../fluce';

export default function(Component) {
   return React.createClass({
      getInitialState() {
         return fluce.stores.GameStore;
      },
      componentDidMount() {
         this.unsubscribe = fluce.subscribe(['GameStore'], this.onStateChange);
      },
      componentWillUnmount() {
         this.unsubscribe();
      },
      onStateChange() {
         console.log(fluce.stores.GameStore);
         this.setState(fluce.stores.GameStore);
      },
      render() {
         return <Component {...this.state} />
      }
   });
}
