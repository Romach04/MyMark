import React, { useContext } from "react";
import {authRoutes, publicRoutes} from '../routes'
import {Routes, Route, Navigate} from 'react-router-dom';
import {REGISTRATION_ROUTER, SPORT_ROUTER } from "../utils/const";
import { Context } from "../index";

const AppRouter = () => {
    const {user} = useContext(Context);
    //ff

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
             <Route path='*' element={<Navigate to={SPORT_ROUTER}/>} />
        </Routes>
    );
}

export default AppRouter;
