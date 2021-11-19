/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import ApplicationNavigator from '@/navigation/ApplicationNavigation';
import {persistor, store} from '@/redux/store';
import React from 'react';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApplicationNavigator />
        <Toast visibilityTime={2000} />
      </PersistGate>
    </Provider>
  );
};

export default App;
