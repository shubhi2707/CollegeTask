/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native'
import MainPage from './src/screens/MainPage';
import {Provider} from 'react-redux';
import { createStore,applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './src/reducers/rootReducer'
import  mySaga  from './src/sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(mySaga)


const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <StatusBar hidden={false} barStyle="dark-content" backgroundColor="transparent" translucent/>
      <MainPage />
    </Provider>
  );
};

export default App;
