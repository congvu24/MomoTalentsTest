import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';

// import * as modules from '@/Services/modules';
import auth from './reducer/auth.slice';
import photo from './reducer/photos.slice';

const reducers = combineReducers({
  auth,
  photo,
  //   ...Object.values(modules).reduce(
  //     (acc, module) => ({
  //       ...acc,
  //       [module.reducerPath]: module.reducer,
  //     }),
  //     {},
  //   ),
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  //   whitelist: ['post'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export {store, persistor};
