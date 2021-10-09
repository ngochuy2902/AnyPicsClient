import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAppSelector } from "../../redux/store/hooks";
import { selectIsAdmin, selectIsLoggedIn } from "../../redux/reducer/authReducer";
import { ROUTER } from "../../shared/constant/routes";

export function PrivateRoute(props: RouteProps) {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const isAdmin = useAppSelector(selectIsAdmin);
    if (!isLoggedIn) return <Redirect to={ROUTER.Login}/>
    if (!isAdmin && props===ROUTER.Dashboard) return <Redirect to={ROUTER.Home}/>
    return (
        <div>
            <Route {...props} />
        </div>
    );
}
