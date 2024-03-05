import React from 'react';
import {HomeScreen} from './src/screens';
import {Provider} from 'react-redux';
import myStore from './src/reduxtoolkit/Store';

const App = () => {
  return (
    <Provider store={myStore}>
      <HomeScreen />
    </Provider>
  );
};

export default App;
