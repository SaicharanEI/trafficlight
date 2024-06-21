import { configureStore } from '@reduxjs/toolkit';
import trafficLightReducer from './trafficSlice';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

export const store = configureStore({
  reducer: {
    trafficLights: trafficLightReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
