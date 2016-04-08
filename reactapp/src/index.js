import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './containers/App';
import configureStore from './store'
import { selectSet, fetchSetIfNeeded} from './actions'

const store = configureStore()
store.dispatch(selectSet(store.getState().getIn(['sets', '0'])))
store.dispatch(fetchSetIfNeeded(store.getState().getIn(['sets', '0'])))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root')
)
