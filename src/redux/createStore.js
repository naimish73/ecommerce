import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import logger from "redux-logger";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
export const middlewares = [thunk, logger, sagaMiddleware];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export default store;
