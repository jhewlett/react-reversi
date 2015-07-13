import React from 'react'
import { Connector, Provider } from 'redux/react'

function createConnectorWrapper(redux, select, DecoratedComponent) {
   return class ConnectorWrapper extends React.Component {
     render() {
       return (
          <Provider redux={redux}>
            {() => (
                <Connector select={select}>
                  {(props) => <DecoratedComponent {...props} />}
                </Connector>
             )
            }
          </Provider>
       )
     }
   }
}

export default function createConnector(redux) {
  function connectToStore(...storeNames) {
      function select(state) {
         return storeNames.reduce((allStoresState, storeName) => {
             return {
                ...allStoresState,
               [storeName]: state[storeName]
            }
         }, {})
      }

    return function decorateSource(DecoratedComponent) {
        return createConnectorWrapper(redux, select, DecoratedComponent)
      }
    }

  function connect(customSelect) {
    return function decorateSource(DecoratedComponent) {
      return createConnectorWrapper(redux, customSelect, DecoratedComponent)
    }
  }

  return {
     connect,
     connectToStore
 }
}
