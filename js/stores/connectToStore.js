import React from 'react';
import { subscribe, getState } from '../redux';

export default function(Component, storeName) {
   return class extends React.Component {
      constructor() {
         super();
         this.state = getState()[storeName];
      }
      componentDidMount() {
         this.unsubscribe = subscribe(this.onStateChange.bind(this));
      }
      componentWillUnmount() {
         this.unsubscribe();
      }
      onStateChange() {
         this.setState(getState()[storeName]);
      }
      render() {
         return <Component {...this.state} />
      }
   }
}
