import { combineReducers } from 'redux';
import authReducer from "./authReducer";
import { connectRouter } from "connected-react-router";
import { history } from "../../shared/config/history";

const rootReducer = combineReducers({
    router: connectRouter(history),
    auth: authReducer,
});

export default rootReducer;
