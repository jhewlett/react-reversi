import React from 'react'
import { Connector, Provider } from 'redux/react'

export function toStores(...storeNames) {
  return state => {
     return storeNames.reduce((allStoresState, storeName) => {
       return {
         ...allStoresState,
         [storeName]: state[storeName]
       }
     }, {})
   }
}

export default function createConnector(redux) {
  return function connect(select) {
    return function decorateSource(DecoratedComponent) {
      return class ConnectorWrapper extends React.Component {
        render() {
          return (
            <Provider redux={redux}>
              {() => (
                <Connector select={select}>
                  {(props) => <DecoratedComponent {...props} />}
                </Connector>)
              }
            </Provider>
          )
        }
      }
    }
  }
}