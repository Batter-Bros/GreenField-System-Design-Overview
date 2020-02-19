import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import productReducer from './src/reducers/ProductReducer';

import Overview from './src/components/Overview.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Overview store={store} />
      </div>
    )
  }
}

let store = createStore(
  productReducer,
  applyMiddleware( thunk, logger )
);

ReactDOM.render(
  <Provider store = { store }>
    <App/>
  </Provider>,
  document.getElementById('app')
)
