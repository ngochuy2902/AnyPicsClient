import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import { HomePage } from "./page/HomePage";
import { PrivateRoute } from "./component/common/PrivateRoute";
import { Dashboard } from "./page/Dashboard";

function App() {
    return (
        <div>
            <Switch>
                <PrivateRoute exact path='/'>
                    <HomePage/>
                </PrivateRoute>
                <PrivateRoute exact path='/dashboard'>
                    <Dashboard/>
                </PrivateRoute>
                <Route path='/login'>
                    <LoginPage/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
