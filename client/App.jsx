import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import myStore from './src/reduxtoolkit/Store';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';

const App = () => {
  return (
    <Provider store={myStore}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
