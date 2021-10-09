import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from "../saga/rootSaga";
import { history } from "../../shared/config/history";
import rootReducer from "../reducer/rootReducer";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
